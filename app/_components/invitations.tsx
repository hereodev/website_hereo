"use client";
import Link from "next/link"
import { useEffect, useState } from "react";
import slugify from "slugify";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export default function Invitations({welcome=false}: {welcome?: boolean}) {
  const links = [
    { 
      name: 'Français', 
      url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-francais.pdf',
      welcome: 'Bienvenu*e',
      invitation: 'Une invitation'
    },
    { 
      name: 'English', 
      url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-english.pdf',
      welcome: 'Welcome',
      invitation: 'An invitation'
    },
    { 
      name: 'Hausa', 
      url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-hausa.pdf',
      welcome: 'Sannu da zuwa',
      invitation: 'Gayyata'
    },
    { 
      name: 'IsiZulu', 
      url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-isizulu.pdf',
      welcome: 'Wamukelekile',
      invitation: 'Isimemo'
    },
    { 
      name: 'Lgbo', 
      url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-lgbo.pdf',
      welcome: 'Ndewo',
      invitation: 'Ka ditsela tse ding'
    },
    { 
      name: 'Sesotho', 
      url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-sesotho.pdf',
      welcome: 'Amohela',
      invitation: 'Memo'
    },
    { 
      name: 'Swahili', 
      url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-swahili.pdf',
      welcome: 'Karibu',
      invitation: 'Mwaliko'
    },
    { 
      name: 'Yoruba', 
      url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-yoruba.pdf',
      welcome: 'Kaabo',
      invitation: 'Isiniwepe'
    }
  ];
  const shuffledLinks = shuffleArray([...links]); // Create a shuffled copy of the links array

  // const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentWelcomeIndex((currentWelcomeIndex + 1) % links.length);
  //   }, 1600);

  //   return () => clearInterval(interval);
  // }, [currentWelcomeIndex]);

      return (
        <div className="w-full flex flex-col items-center">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}>open modal</button> */}
          {/* {
            welcome && (
              <div className="z-20 text-3xl font-semibold mb-6">{links[currentWelcomeIndex].welcome}</div>
            )
          } */}
          <div className="marquee">
          {/* This text will move from left to right indefinitely */}
            <div className="marquee-content">
              <div className="flex flex-row flex-nowrap gap-4 z-20">
                {[...shuffledLinks, ...shuffledLinks].map((link, index) => (
                  <div key={link.name} 
                  onClick={() => (document.getElementById(slugify(link.invitation)) as HTMLDialogElement)?.showModal()} 
                  className=" py-2 rounded-sm text-2xl flex flex-col flex-nowrap items-center hover:cursor-pointer hover:text-primary">
                    <p className="font-semibold">{link.welcome}</p>
                    <p className="font-medium">{link.invitation}</p>
                    {/* <Link key={index} href={link.url} className="hover:underline hover:cursor-pointer">{link.invitation}</Link> */}
                    <InvitationModal key={link.name} slug={slugify(link.invitation)} title={link.invitation} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
}

function InvitationModal({slug, title, content}: {slug: string, title: string, content?: string}) {

  return (
    <dialog id={slug} className="modal">
  <div className="modal-box w-[90vw] max-w-[90vw] h-[80vh]">
    <h3 className="font-bold text-lg">{title}</h3>
    <div className=" max-w-[80vw] break-words whitespace-normal">
      <p className="py-4 text-sm">« Des fantasmes qui ne nous représentent pas, mais représentent l&apos;imaginaire blanc. Ils constituent certains aspects du moi blanc, re-projetés sur nous comme s&apos;ils étaient des images de nous-mêmes, objectives et dignes de foi. Cela dit, ils ne sont pas notre problème à nous. » — Grada Kilomba </p>
      <p className="py-4 text-sm">Chères et amies et collègues, Lorsqu&apos;on leur a demandé d&apos;interpréter le « brief » pour le projet d&apos;architecture Saison Africa 2020, les membres du collectif de commissaires et d&apos;architectes saay/ yaas ont été inspirées par des stratégies qui reconnaissaient pleinement les formes d&apos;expression, de résilience et de contenu créatif venues d&apos;Afrique ou des diasporas africaines2,tout en fournissant un contrepoids aux idées préconçues, aux perceptions figées et aux notions homogénéisantes si communes lorsqu&apos;il s&apos;agit de l&apos;Afrique… « pour expliquer à ceux qui ont le privilège de ne pas savoir »3. considérait l&apos;exposition « classique » d&apos;architecture comme un format trop statique, offrant des possibilités critiques aussi limitées que limitatives : la plateforme en ligne her(e), otherwise est née de ce constat.</p>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

  )
}