import { type Locale } from "@/i18n-config"
import LocaleSwitcher from "../_components/locale-switcher"

export default async function Page({ params: { lang } } : { params: { lang: Locale } }) {
    return (
        <main className="flex flex-col items-center justify-between p-24">
        <h1>Page in Lang</h1>
        <p>Lang: {lang}</p>
        </main>
    )
}