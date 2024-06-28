import Invitations from "@/app/_components/invitations";
import { FiTriangle } from "react-icons/fi";

export default function About() {
    return (
        <main>
            <div className="flex flex-col gap-2">
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
            </div>
            <div className="divider my-4 mt-8">
                <FiTriangle className="h-8 w-8"></FiTriangle>
            </div>
            <Invitations welcome />
            <div className="divider my-4 mb-8">
                <FiTriangle className="h-8 w-8" style={{transform: "rotate(180deg)"}}></FiTriangle>
            </div>
            <details className="collapse collapse-arrow bg-base-200">
  <summary className="collapse-title text-xl font-bold text-primary">Who are we</summary>
  <div className="collapse-content">
            <p><b>Patti Anahory</b> Cabo Verde, São Tomé, New York | architecte, professeure, commissaire, commentatrice, critique, observer, designer, mère, collaboratrice</p>
            <p><b>Anna Abengowe</b> Nigéria, Angleterre | architecte, designer, professeure, maker, voyageure, curious, voice‑finder, joker, tante</p>
            <p><b>Mawena Yehouessi</b> Bénin, Togo, Sénégal, France | chercheuse, praticienne, curatrice, écrivaine/ traductrice, collusionist, avatar, amante, sœur et enfant</p>
  </div>
</details>

        </main>
    )
}