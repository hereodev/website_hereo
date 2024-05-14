import { auth } from "@/auth"
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { UserWithRole } from "@/global";

export default async function Nav({ lang } : { lang: string}) {
    const session = await auth();
    // make a fetch to /api/auth/csrf endpoint

    const links = [
        { href: '/', label: 'Home', labelFr:'Maison', public: true },
        { href: '/protected', label: 'protected route', labelFr:'Protégé', public: true },
    ]

    return (
        <nav className="flex justify-between items-center p-4">
            <div className="flex gap-4 items-center text-2xl font-semibold uppercase text-white">
                <Link href={"/"}>:Her(e), Otherwise</Link>
            </div>
            <div className="flex gap-4 items-center">
                {
                    links.filter((l:any)=> {
                        if (session) {
                            return true
                        } else {
                            return l.public
                        }
                    }).map(({ href, label, labelFr }) => (
                        <Link key={href} className="" href={href}>{lang=="fr"?labelFr:label}</Link>
                    ))
                }
                {
                    session?.user && (session.user as UserWithRole).role == "ADMIN" ?
                    <Link className="" href={"/saay"}>SAAY</Link>
                    :
                    "not admin"
                }
            </div>
            <div className="flex gap-4 items-center">
                <LocaleSwitcher lang={lang as Locale} />
                {session?.user && 
                // <p>{session.user?.name}</p>
                <Link href={"/indx/" + session.user.id}>
                    <div className="avatar placeholder">
                        <div className="bg-info text-neutral-content rounded-full w-8">
                        <span className="text-xs">
                            {session.user.name && (session.user.name.match(/[A-Z]/g) || []).slice(0, 2).join('')}
                        </span>
                        </div>
                    </div>
                </Link>
                }
                {session ? 
                    <a className="" href="/api/auth/signout">sign out</a> : 
                    <a className="" href="/api/auth/signin">sign in</a>
                }
            </div>

        </nav>
    )
}