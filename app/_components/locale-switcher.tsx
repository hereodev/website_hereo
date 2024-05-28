"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";

export default function LocaleSwitcher({ lang } : { lang?: Locale }) {
    const pathName = usePathname();
    const redirectedPathName = (locale: Locale) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    };
    
    return (
        <div>
            {lang && <div>Current locale: {lang}</div>}
            <ul className="flex flex-row gap-2">
                {i18n.locales.map((locale) => {
                    return (
                        <li key={locale}>
                            <Link className={locale == lang ? "underline" : ""} href={redirectedPathName(locale)}>{locale.toUpperCase()}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}