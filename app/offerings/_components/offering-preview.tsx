import { ExtendedArt } from "@/global";
import { Art, SubCategory, Media } from "@prisma/client";
import Link from "next/link";

interface OfferingPreviewProps {
    // art: Art & { associated_media?: any[], SubCategory?: SubCategory };
    art: ExtendedArt;
}


const OfferingPreview: React.FC<OfferingPreviewProps> = ({ art }) => {
    const pictures = art.associated_media?.filter((media) => media.Media.type.split("/")[0] == "image") || [];

    const catColors = {
        STRATEGIES: "tag-purple",
        LOCALITIES: "tag-blue",
        REALMS: "tag-green",
        SCALES: "tag-red",
    }

    var borderColor = "border-" 
    if(art.SubCategories && art.SubCategories.length > 0 && art.SubCategories[0].SubCategory.Category) {
        borderColor+= (catColors[art.SubCategories[0].SubCategory.Category.name.toUpperCase() as keyof typeof catColors] || "base-content");
    } else {
        borderColor+= "base-content";
    }
    // borderColor+= (catColors[art.SubCategories[0].SubCategory.name.toUpperCase() as keyof typeof catColors] || "base-content");
    return (
        // <div className={`max-w-64 max-h-64 border ${borderColor}`}>
        //     {borderColor}
        //     {/* <p>{art.SubCategory && art.SubCategory.name} {art.SubCategory && art.SubCategory.Category?.name}</p> */}
        //     <pre className="max-w-64 max-h-60 overflow-scroll text-xs">{JSON.stringify(art.SubCategories, null, 2)}</pre>
        // </div>
        <Link href={`/offerings/${art.slug}`} 
        className="overlapper group group-hover:cursor-pointer">
            <div className="avatar group-hover:brightness-125 group-hover:filter group-hover:saturate-150">
                <div className={`w-64 h-64 rounded-full border border-primary`} >
                {/* <div className={`w-64 h-64 rounded-full border `} style={{borderColor: borderColor.replace("border", "var(--color")+")" }}> */}
                {/* <div className={`w-64 h-64 rounded-full border border-primary`}> */}
                    {
                        pictures.length >0 &&
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                            src={pictures[0].Media.url} 
                            alt={art.title} 
                        />
                    }
                </div>
            </div>
            <div className={`avatar placeholder ${pictures.length>0 && "opacity-0 group-hover:opacity-100"}`}>
                <div className="w-64 h-64 rounded-full text-3xl text-base-content group-hover:text-black text-center p-10">
                    {art.title.length > 46 ? art.title.slice(0, 46) + "..." : art.title}
                </div>
            </div>
        </Link>
    );
};

export default OfferingPreview;

