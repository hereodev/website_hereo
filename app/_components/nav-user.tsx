import { auth } from "@/auth"
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import prisma from "@/prisma";
import { UserWithRole } from "@/global";
import { signOut } from "@/auth";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";


export default async function NavUser({ lang } : { lang: string}) {
    const session = await auth();
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

    )
}