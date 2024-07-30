import { Art } from "@prisma/client";
import Link from "next/link";

interface OfferingPreviewProps {
    art: Art & { associated_media?: any[], SubCategory?: any[] };
}

const OfferingPreview: React.FC<OfferingPreviewProps> = ({ art }) => {

    const pictures = art.associated_media?.filter((media) => media.Media.type.split("/")[0] == "image") || [];
    return (
        <Link href={`/offerings/${art.slug}`} 
        className="overlapper group group-hover:cursor-pointer">
            {/* {
                art.associated_media && art.associated_media.length > 0 && */}
                <div className="avatar group-hover:opacity-30">
                    <div className={`w-64 h-64 rounded-full ${pictures.length==0 && "border border-base-content"}`}>
                        {/* <pre className="max-w-64 max-h-32 overflow-scroll text-xs">{JSON.stringify(art.associated_media?.map((media)=>media.Media.type.split("/")[0]), null, 2)}</pre> */}
                        {/* <pre className="max-w-64 max-h-32 overflow-scroll text-xs">{JSON.stringify(pictures, null, 2)}</pre> */}
                        {
                            pictures.length >0 &&
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                                src={pictures[0].Media.url} 
                                alt={art.title} 
                                // className="w-full h-full rounded-xl object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" 
                            />
                            // :
                            // // eslint-disable-next-line @next/next/no-img-element
                            // <img 
                            //     src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                            //     alt="Placeholder missing picture" 
                            //     // className="w-full h-full rounded-xl object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                            // />
                        }
                    </div>
                </div>
                <div className={`avatar placeholder ${pictures.length>0 && "opacity-0 group-hover:opacity-100"}`}>
                    <div className="w-64 h-64 rounded-full text-3xl text-base-content text-center p-10">
                        <span className="truncate text-wrap">{art.title}</span>
                    </div>
                </div>
                {/* <div className="avatar placeholder">
                    <div className="w-64 h-64 rounded-full text-4xl text-red-500 text-center p-6">
                        {art.title}
                    </div>
                </div> */}
                {/* <div className="avatar placeholder">
                    <div className="w-64 h-64 rounded-full text-4xl text-center overflow-hidden">
                        <div className="text-4xl truncate">
                            {art.title}
                        </div>
                    </div>
                </div> */}

            {/* } */}
            {/* <div className="p-3"> */}
                {/* <h3 className="text-lg hover:underline">
                    <Link href={`/offerings/${art.slug}`}>{art.title}</Link>
                </h3> */}
                {/* <p className="text-lg">{art.subtitle}</p> */}
            {/* </div> */}
            {/* <img src={art.associated_media} alt={art.title} className="w-full h-full object-cover" /> */}
        </Link>
    );
};

export default OfferingPreview;

