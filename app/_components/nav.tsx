import { auth } from "@/auth"
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { UserWithRole } from "@/global";
import prisma from "@/prisma";

export default async function Nav({ lang } : { lang: string}) {
    const session = await auth();
    // make a fetch to /api/auth/csrf endpoint

    const links = [
        // { href: '/', label: 'Home', labelFr:'Maison', public: true },
        { href: '/offerings', label: 'Offerings', labelFr:'Contributions', public: true },
        { href: '/the-acts', label: 'The Acts', labelFr:'Rencontres', public: true },
        // { href: '/protected', label: 'protected route', labelFr:'Protégé', public: true },
    ]

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

        </nav>
    )
}