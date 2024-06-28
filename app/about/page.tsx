import Invitations from "@/app/_components/invitations";
import { FiTriangle } from "react-icons/fi";

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
            <p>[VIDEO/PORTRAITS]</p>
            <p><b>Anna Abengowe</b> Nigéria, Angleterre | architecte, designer, professeure, maker, voyageure, curious, voice‑finder, joker, tante</p>
            <p><b>Patti Anahory</b> Cabo Verde, São Tomé, New York | architecte, professeure, commissaire, commentatrice, critique, observer, designer, mère, collaboratrice</p>
            <p><b>Mawena Yehouessi</b> Bénin, Togo, Sénégal, France | chercheuse, praticienne, curatrice, écrivaine/ traductrice, collusionist, avatar, amante, sœur et enfant</p>

        </main>
    )
}