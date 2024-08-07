import Invitations from "@/app/_components/invitations";
import Link from "next/link";
import { FiTriangle } from "react-icons/fi";
import VideoPlayer from "../_components/video-player";
import Image from "next/image";

export default function About() {
    return (
        <main>
            <div className="flex flex-col gap-2">
                <p>This platform responds to the urgent need to gather an open, interactive and expanding community of black women engaged in the broadest possible range of self-determined acts and operations within the discipline, discourse and practice of architecture, the urban and the spatial.</p>
            </div>
            <div className="divider my-4 mt-8">
                <FiTriangle className="h-8 w-8"></FiTriangle>
            </div>
            <Invitations welcome />
            <div className="divider my-4 mb-8">
                <FiTriangle className="h-8 w-8" style={{transform: "rotate(180deg)"}}></FiTriangle>
            </div>
            <h2>Who are we</h2>
            <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
            <VideoPlayer videoSrc="https://hereotherwise.b-cdn.net/assets_website/SAAY-YAAS_plain.mp4" />
            </div>
            <p><b>Anna Abengowe</b> Nigéria, Angleterre | architecte, designer, professeure, maker, voyageure, curious, voice‑finder, joker, tante</p>
            <p><b>Patti Anahory</b> Cabo Verde, São Tomé, New York | architecte, professeure, commissaire, commentatrice, critique, observer, designer, mère, collaboratrice</p>
            <p><b>Mawena Yehouessi</b> Bénin, Togo, Sénégal, France | chercheuse, praticienne, curatrice, écrivaine/ traductrice, collusionist, avatar, amante, sœur et enfant</p>

            <h2>Our Sponsors</h2>
            <div className="flex flex-col md:flex-row md:flex-wrap justify-around items-center">
                <p>
                    <Link href="http://www.grahamfoundation.org/">
                    <Image src="https://hereotherwise.b-cdn.net/assets_website/Graham-Foundation-Grants.jpg" className="invert" alt="Graham Foundation" width={200} height={200} />
                    </Link>
                </p>
                <p>
                    <Link href="https://www.arcenreve.eu/">
                        {/* Arc en rêve Centre d&apos;architecture */}
                        <Image src="https://hereotherwise.b-cdn.net/assets_website/arcenreve-logo-2022.png" className="brightness-200" alt="Arc en rêve Centre d'architecture" width={200} height={200} />
                    </Link>
                </p>
                {/* <p><Link href="http://www.grahamfoundation.org/">Graham Foundation</Link></p>
                <p><Link href="https://www.arcenreve.eu/">Arc en rêve Centre d&apos;architecture</Link></p> */}
            </div>
        </main>
    )
}