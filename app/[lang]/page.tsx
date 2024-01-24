import { type Locale } from "@/i18n-config"
import LocaleSwitcher from "../_components/locale-switcher"

export default async function Page({ params: { lang } } : { params: { lang: Locale } }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <LocaleSwitcher lang={lang} />
        <div className="flex gap-4">
        <a className="link-hover badge" href="/api/auth/signin">sign in</a>
      <a className="link-hover badge" href="/protected">protected route</a>
        </div>
        <h1>Page in Lang</h1>
            <p>Lang: {lang}</p>
        </main>
    )
}