import Link from "next/link";



export default function Navbar({ lang } : { lang: string}) {

    return (
        <nav 
            className="navbar bg-base-100 bg-opacity-90 fixed top-0 left-0 z-50 h-[--height-navbar] min-h-[--height-navbar] max-h-[--height-navbar] flex items-center px-2"
        >
            <Link href={"/"} className=" font-bold text-3xl">:Her(e), Otherwise</Link>

        </nav>
    )
}