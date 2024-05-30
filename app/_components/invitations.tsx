"use client";
import Link from "next/link"
import { useEffect, useState } from "react";

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
  const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0);
  // const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(Math.round(Math.random() * links.length));
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWelcomeIndex((currentWelcomeIndex + 1) % links.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [currentWelcomeIndex]);

      return (
        <div className="w-full flex flex-col items-center">
          {
            welcome && (
              <div className="z-20 text-3xl font-semibold mb-6">{links[currentWelcomeIndex].welcome}</div>
            )
          }
          <div className="marquee">
          {/* This text will move from left to right indefinitely */}
            <div className="marquee-content">
              <div className="flex flex-row flex-nowrap gap-4 z-20 text-xl">
                {links.map((link, index) => (
                  <Link key={index} href={link.url} className="hover:underline hover:cursor-pointer">{link.invitation}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
}