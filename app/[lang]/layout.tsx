import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "@/app/globals.css";
import { i18n, type Locale } from "@/i18n-config";
import Nav from "../_components/nav";
// import Navbar from "../_components/navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
const displayFont = Raleway({ weight: ['400', '700'], subsets: ["latin"] });

export const metadata: Metadata = {
    title: ":Her(e) Otherwise" + " | " + process.env.NODE_ENV,
    description: "Welcome to Her(e) Otherwise, a digital space for art, writing, and community.",
    icons: {
        icon: '/favicon.ico', // /public path
    },
};

export async function generateStaticParams() {
    // Generate static pages for each language
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
    children, params
}: Readonly<{
    children: React.ReactNode;
    params: { lang: Locale };
}>) {
    return (
        <html lang={params.lang || "en-US"}>
            <Providers>
                <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                </head>
                
                <body className={`${displayFont.className} flex flex-col min-h-screen mx-4 mb-6`}>
                    <Nav lang={params.lang} />
                    {/* <Navbar lang={params.lang} /> */}
                    <div className="h-[--height-navbar]"></div>
                    {children}
                </body>
            </Providers>
        </html>
    );
}
    