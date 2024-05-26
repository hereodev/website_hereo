"use client";
import { auth, signOut } from "@/auth"
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { UserWithRole } from "@/global";
import prisma from "@/prisma";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiLogIn, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import NavUser from "./nav-user";

export default function Nav({ lang } : { lang: string}) {
    const { data: session, update } = useSession()
    // make a fetch to /api/auth/csrf endpoint
    let name = ""
    // if(session?.user) {
    //     const user = await prisma.user.findUnique({
    //         where: {
    //             id: (session.user as UserWithRole).id
    //         }
    //     })
    //     name = user?.name || ""
    // }


    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        // { href: '/', label: 'Home', labelFr:'Maison', public: true },
        { href: '/offerings', label: 'Offerings', labelFr:'Contributions', public: true },
        { href: '/the-acts', label: 'The Acts', labelFr:'Rencontres', public: true },
        // { href: '/protected', label: 'protected route', labelFr:'Protégé', public: true },
    ]
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuOpen(event.target.checked);
    };

    return (
        // <>
        //     <nav className="flex justify-between items-center p-4 sm:gap-4 z-50">
        //         <div className="flex gap-4 items-center text-2xl font-semibold uppercase text-white">
        //             <Link href={"/"}>:Her(e), Otherwise</Link>
        //         </div>
        //         <div className="flex gap-4 grow items-center">
        //             {
        //                 links.filter((l:any)=> {
        //                     if (session) {
        //                         return true
        //                     } else {
        //                         return l.public
        //                     }
        //                 }).map(({ href, label, labelFr }) => (
        //                     <Link key={href} className="hover:font-bold hover:cursor-pointer" href={href}>{lang=="fr"?labelFr:label}</Link>
        //                 ))
        //             }
        //             {
        //                 session?.user && ((session.user as UserWithRole).role == "ADMIN" || (session.user as UserWithRole).role == "SUPERADMIN") &&
        //                 <Link className="" href={"/saay"}>SAAY</Link>
        //             }
        //         </div>
        //     </nav>
        //     <nav className="navbar bg-base-100">
        //         <div className="flex-none">
        //             <button className="btn btn-square btn-ghost">
        //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        //             </button>
        //         </div>
        //         <div className="flex-1">
        //             <a className="btn btn-ghost text-xl">daisyUI</a>
        //         </div>
        //         <div className="flex-none">
        //             <button className="btn btn-square btn-ghost">
        //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        //             </button>
        //         </div>
        //     </nav>
        // </>
        <div className="navbar bg-base-100 bg-opacity-90 fixed top-0 left-0 z-50">
        <Link href="/" className="flex-1 z-50 text-xl font-semibold ">
            {/* <h1 className="sr-only">Her(e) Otherwise</h1>
            <img src="https://smallcreative.b-cdn.net/Site_Web/z_ASSETS/Small_Creative_Logo_cvvyw9.png" alt="logo" 
                className="object-contain max-w-48" 
            /> */}
            <div className="flex gap-4 items-center text-2xl font-semibold uppercase text-white">
                <Link href={"/"}>:Her(e), Otherwise</Link>
            </div>

        </Link>
        <div className="md:flex flex-row gap-4 hidden">
            {/* <span className=""><Link href="/projects" scroll={true}>{router.locale?.includes("fr") ? "Projets" : "Projects"}</Link></span> */}
            {/* <span className=""><Link href="/small-stories">Small Stories</Link></span> */}
            {/* <span className=""><Link href="/about">{router.locale?.includes("fr") ? "À propos" : "About Us"}</Link></span> */}
                         {
                         links.filter((l:any)=> {
                             if (session) {
                                 return true
                             } else {
                                 return l.public
                             }
                         }).map(({ href, label, labelFr }) => (
                             <Link key={href} className="hover:font-bold hover:cursor-pointer" href={href}>{lang=="fr"?labelFr:label}</Link>
                         ))
                     }
                     {
                         session?.user && ((session.user as UserWithRole).role == "ADMIN" || (session.user as UserWithRole).role == "SUPERADMIN") &&
                         <Link className="" href={"/saay"}>SAAY</Link>
                     }

            <div className="divider divider-horizontal mx-0"></div>
            <span className="">
                <LocaleSwitcher />
            </span>
            <div className="divider divider-horizontal mx-0"></div>
            <span className="">
                {/* <NavUser lang={lang} /> */}
                {session?.user && 
        // <p>{session.user?.name}</p>
        <Link href={"/profile"}>
            <div className="avatar placeholder">
                <div className="bg-info text-neutral-content rounded-full w-8">
                <span className="text-xs">
                    {name ? (name.match(/[A-Z]/g) || []).slice(0, 2).join('') : 
                    <FiUser className="w-4 h-4 opacity-70" />
                    }
                </span>
                </div>
            </div>
        </Link>
        }

            </span>
            <span>
        {/* {session ? 
            <form
                action={async (formData) => {
                    await signOut()
                    window.location.reload()
                }}
            >
                <button type="submit" title="Sign Out">
                    <FiLogOut />
                </button>
            </form>
            :  */}
            <Link className="" href="/auth/signin" title="Sign In">
                <FiLogIn />
            </Link>
        {/* } */}

            </span>
            {/* <Link href="/contact"><span className="btn btn-outline">Contact</span></Link> */}
        </div>

        <label className="swap swap-rotate z-50 md:hidden md:w-0 md:p-0 md:h-0">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" checked={menuOpen} onChange={handleCheckboxChange} />
            {/* hamburger icon */}
            <FiMenu className="swap-off w-8 h-8" />
            {/* <FiMenu className="w-8 h-8 swap-off" onClick={() => setMenuOpen(true)} /> */}

            {/* close icon */}
            <FiX className="swap-on w-8 h-8" />
            {/* <FiX className="w-8 h-8 swap-on" onClick={() => setMenuOpen(false)} /> */}
        </label>
        {
            menuOpen &&
            <div className="h-screen w-screen fixed top-0 left-0 z-40 bg-base-100 bg-opacity-90 flex flex-col justify-center items-center overflow-hidden">
                <div className="flex flex-col gap-4">
                    {/* <span className=""><Link href="/projects" scroll={true}>{router.locale?.includes("fr") ? "Projets" : "Projects"}</Link></span>
                    <span className=""><Link href="/small-stories">Small Stories</Link></span>
                    <span className=""><Link href="/about">{router.locale?.includes("fr") ? "À propos" : "About Us"}</Link></span> */}
                                             {
                         links.filter((l:any)=> {
                             if (session) {
                                 return true
                             } else {
                                 return l.public
                             }
                         }).map(({ href, label, labelFr }) => (
                             <Link key={href} className="hover:font-bold hover:cursor-pointer" href={href}>{lang=="fr"?labelFr:label}</Link>
                         ))
                     }
                     {
                         session?.user && ((session.user as UserWithRole).role == "ADMIN" || (session.user as UserWithRole).role == "SUPERADMIN") &&
                         <Link className="" href={"/saay"}>SAAY</Link>
                     }

                    <div className="divider divider-vertical my-0"></div>
                    <span className="">
                        <LocaleSwitcher />
                    </span>
                    <div className="divider divider-vertical my-0"></div>
                    <div className="flex flex-row items-center gap-3">
                {/* <NavUser lang={lang} /> */}
                {session?.user && 
        // <p>{session.user?.name}</p>
        <Link href={"/profile"}>
            <div className="avatar placeholder">
                <div className="bg-info text-neutral-content rounded-full w-8">
                <span className="text-xs">
                    {name ? (name.match(/[A-Z]/g) || []).slice(0, 2).join('') : 
                    <FiUser className="w-4 h-4 opacity-70" />
                    }
                </span>
                </div>
            </div>
        </Link>
        }
        {/* {session ? 
            <form
                action={async (formData) => {
                    await signOut()
                    window.location.reload()
                }}
            >
                <button type="submit" title="Sign Out">
                    <FiLogOut />
                </button>
            </form>
            :  */}
            <Link className="" href="/auth/signin" title="Sign In">
                <FiLogIn />
            </Link>
        {/* } */}

            </div>

                </div>

            </div>
        }

    </div>

    )
}