import Link from "next/link"

export default function Invitations() {
    const links = [
        { name: 'Français', url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-francais.pdf' },
        { name: 'English', url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-english.pdf' },
        { name: 'Hausa', url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-hausa.pdf' },
        { name: 'IsiZulu', url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-isizulu.pdf' },
        { name: 'Lgbo', url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-lgbo.pdf' },
        { name: 'Sesotho', url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-sesotho.pdf' },
        { name: 'Swahili', url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-swahili.pdf' },
        { name: 'Yoruba', url: 'https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-yoruba.pdf' },
      ];
      
      return (
        <div className="marquee">
        {/* <p className="">This text will move from left to right indefinitely</p> */}
        <div className="marquee-content">
        <div className="flex flex-row flex-nowrap gap-4 z-20">
            Invitations:
            
          {links.map((link, index) => (
            <Link key={index} href={link.url} className="hover:underline hover:cursor-pointer">{link.name}</Link>
          ))}
        </div>
        </div>
        </div>
      );
    // return (
    //     <div>
    //         <Link href="https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-francais.pdf" className="hover:underline">Français</Link>
    //         <Link href="https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-english.pdf" className="hover:underline">English</Link>
    //         <Link href="https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-hausa.pdf" className="hover:underline">Hausa</Link>
    //         <Link href="https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-isizulu.pdf" className="hover:underline">IsiZulu</Link>
    //         <Link href="https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-lgbo.pdf" className="hover:underline">Lgbo</Link>
    //         <Link href="https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-sesotho.pdf" className="hover:underline">Sesotho</Link>
    //         <Link href="https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-swahili.pdf" className="hover:underline">Swahili</Link>
    //         <Link href="https://hereotherwise.b-cdn.net/assets_website/Invitations/invitation-yoruba.pdf" className="hover:underline">Yoruba</Link>
    //     </div>
    // )
}