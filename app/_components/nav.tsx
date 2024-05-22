import { auth } from "@/auth"
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { UserWithRole } from "@/global";
import { signOut } from "@/auth";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import prisma from "@/prisma";

export default async function Nav({ lang } : { lang: string}) {
    const session = await auth();
    // make a fetch to /api/auth/csrf endpoint

    const links = [
        // { href: '/', label: 'Home', labelFr:'Maison', public: true },
        { href: '/indx', label: 'Index', labelFr:'Index', public: true },
        // { href: '/protected', label: 'protected route', labelFr:'Protégé', public: true },
    ]

    let name = ""
    if(session?.user) {
        const user = await prisma.user.findUnique({
            where: {
                id: (session.user as UserWithRole).id
            }
        })
        name = user?.name || ""
    }

    return (
        <nav className="flex justify-between items-center p-4 sm:gap-4 z-50">
            <div className="flex gap-4 items-center text-2xl font-semibold uppercase text-white">
                <Link href={"/"}>:Her(e), Otherwise</Link>
            </div>
            <div className="flex gap-4 grow items-center">
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
            </div>
            <div className="flex gap-4 items-center">
                <LocaleSwitcher lang={lang as Locale} />
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
                {session ? 
                    <form
                        action={async (formData) => {
                            "use server"
                            await signOut()
                            window.location.reload()
                        }}
                    >
                        <button type="submit" title="Sign Out">
                            <FiLogOut />
                        </button>
                    </form>
                    : 
                    <Link className="" href="/auth/signin" title="Sign In">
                        <FiLogIn />
                    </Link>
                }
            </div>

        </nav>
    )
}