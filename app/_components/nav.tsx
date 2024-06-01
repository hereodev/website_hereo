"use client";
import { auth, signOut } from "@/auth"
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { UserWithRole } from "@/global";
import prisma from "@/prisma";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiLogIn, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import NavUser from "./nav-user";

export default function Nav({ lang } : { lang: string}) {
    const { data: session, update } = useSession()
    // make a fetch to /api/auth/csrf endpoint
    const [name, setName] = useState("");
    // if(session?.user) {
    //     const user = await prisma.user.findUnique({
    //         where: {
    //             id: (session.user as UserWithRole).id
    //         }
    //     })
    //     name = user?.name || ""
    // }


    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (session) {
            const user = async () => {
                const user = await prisma.user.findUnique({
                    where: {
                        id: (session.user as UserWithRole).id
                    }
                })
                user && setName(user.name || "");
            }

        }
    }, [session])

    // useEffect(() => {
    //     setMenuOpen(false)
    // }, []);

    const links = [
        // { href: '/', label: 'Home', labelFr:'Maison', public: true },
        { href: '/offerings', label: 'Offerings', labelFr:'Recueil', public: true },
        { href: '/the-acts', label: 'Encounters', labelFr:'Rencontres', public: true },
        { href: '/saay_yaas', label: 'About', labelFr:'A propos', public: true },
        // { href: '/protected', label: 'protected route', labelFr:'Protégé', public: true },
    ]
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuOpen(event.target.checked);
    };

    return (
        <div className="navbar bg-base-100 bg-opacity-90 fixed top-0 left-0 z-50">
        <Link href="/" className="flex-1 z-50 font-semibold uppercase text-2xl">
            {/* <h1 className="sr-only">Her(e) Otherwise</h1> */}
            {/* <div className="flex gap-4 w-full items-center text-2xl font-semibold uppercase text-white"> */}
                :Her(e), Otherwise
            {/* </div> */}
        </Link>
        <div className="md:flex flex-row gap-4 hidden">
            {
                links.filter((l:any)=> {
                    if (session) {
                        return true
                    } else {
                        return l.public
                    }
                }).map(({ href, label, labelFr }) => (
                    <Link key={href} className="hover:font-bold hover:cursor-pointer" href={`/${lang}${href}`}>{lang=="fr"?labelFr:label}</Link>
                ))
            }
            {
                session?.user && ((session.user as UserWithRole).role == "ADMIN" || (session.user as UserWithRole).role == "SUPERADMIN") &&
                <Link className="" href={"/admin_saay_yaas"}>Admin</Link>
            }

            <div className="divider divider-horizontal mx-0"></div>
            {/* <span className="">
                <LocaleSwitcher />
            </span> */}
            {/* <div className="divider divider-horizontal mx-0"></div> */}
            <span className="">
                {session?.user && 
                <Link href={"/profile"}>
                    <div className="avatar placeholder" title="Profile">
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
        {session?.user ? 
                // action={async (formData) => {
                //     await signOut()
                //     window.location.reload()
                // }}
            // <Link className="btn btn-sm btn-primary btn-outline" href="/auth/signin" title="Sign In">
            //     <FiLogOut />
            //     Log Out
            // </Link>
            <></>
            : 
            <Link className="btn btn-sm btn-primary btn-outline" href="/auth/signin" title="Sign In">
                <FiLogIn />
                Login
            </Link>
        }

            </span>
        </div>

        <label className="swap swap-rotate z-50 md:hidden md:w-0 md:p-0 md:h-0">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" checked={menuOpen} onChange={handleCheckboxChange} />
            {/* hamburger icon */}
            <FiMenu className="swap-off w-8 h-8" />
            {/* close icon */}
            <FiX className="swap-on w-8 h-8" />
        </label>
        {
            menuOpen &&
            <div className="h-screen w-screen fixed top-0 left-0 z-40 bg-base-100 bg-opacity-90 flex flex-col justify-center items-center overflow-hidden">
                <div className="flex flex-col gap-4">
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
                        <Link className="" href={"/admin_saay_yaas"}>Admin</Link>
                    }

                    <div className="divider divider-vertical my-0"></div>
                    {/* <span className="">
                        <LocaleSwitcher />
                    </span> */}
                    {/* <div className="divider divider-vertical my-0"></div> */}
                    <div className="flex flex-row items-center gap-3">
                {/* <NavUser lang={lang} /> */}
                {session?.user && 

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
        {session?.user ? 
                // action={async (formData) => {
                //     await signOut()
                //     window.location.reload()
                // }}
            // <Link className="btn btn-sm btn-primary btn-outline" href="/auth/signin" title="Sign In">
            //     <FiLogOut />
            //     Log Out
            // </Link> /////
            //     <form
            //     action={async (formData) => {
            //         await signOut()
            //         window.location.reload()
            //     }}
            // >
            //     <button type="submit" title="Sign Out">
            //         <FiLogOut />
            //     </button>
            // </form>
            <></>
            : 
            <Link className="btn btn-sm btn-primary btn-outline" href="/auth/signin" title="Sign In">
                <FiLogIn />
                Login
            </Link>
        }

            </div>

                </div>

            </div>
        }

    </div>

    )
}