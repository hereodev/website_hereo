import { Art } from "@prisma/client";
import Link from "next/link";

interface OfferingPreviewProps {
    art: Art & { associated_media?: any[] };
}

const OfferingPreview: React.FC<OfferingPreviewProps> = ({ art }) => {
    return (
        <div key={art.id} className="border-base-content rounded-3xl min-h-24 overlapper group hover:cursor-pointer">
            {
                art.associated_media && art.associated_media.length > 0 &&
                <div className="avatar">
  <div className="w-64 h-64 rounded-full">
                <img 
                    src={art.associated_media[0].Media.url} 
                    alt={art.title} 
                    // className="w-full h-full rounded-xl object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" 
                />
                  </div>
</div>
            }
            <div className="p-3">
                {/* <h3 className="text-lg hover:underline">
                    <Link href={`/offerings/${art.slug}`}>{art.title}</Link>
                </h3> */}
                {/* <p className="text-lg">{art.subtitle}</p> */}
            </div>
            {/* <img src={art.associated_media} alt={art.title} className="w-full h-full object-cover" /> */}
        </div>
    );
};

export default OfferingPreview;

