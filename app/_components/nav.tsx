import { auth } from "@/auth"
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n-config";
import Link from "next/link";

export default async function Nav({ lang } : { lang: string}) {
    const session = await auth();
    // make a fetch to /api/auth/csrf endpoint

    const links = [
        { href: '/', label: 'Home', labelFr:'Maison', public: true },
        { href: '/protected', label: 'protected route', labelFr:'Protégé', public: true },
        { href: '/admin', label: 'admin', labelFr:'Admin', public: false },
    ]

    return (
        <nav className="flex justify-between items-center p-4">
            <div className="flex gap-4 items-center">
                {
                    links.filter((l:any)=> {
                        if (session) {
                            return true
                        } else {
                            return l.public
                        }
                    }).map(({ href, label, labelFr }) => (
                        <Link key={href} className="link-hover badge" href={href}>{lang=="fr"?labelFr:label}</Link>
                    ))
                }
            </div>
            <div className="flex gap-4 items-center">
                <LocaleSwitcher lang={lang as Locale} />
                {session?.user && 
                // <p>{session.user?.name}</p>
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                    <span className="text-xs">
                        {session.user.name && (session.user.name.match(/[A-Z]/g) || []).slice(0, 2).join('')}
                    </span>
                    </div>
                </div>
                }
                {session ? 
                    <a className="link-hover badge" href="/api/auth/signout">sign out</a> : 
                    <a className="link-hover badge" href="/api/auth/signin">sign in</a>
                }
            </div>

        </nav>
    )
}