 
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { i18n } from '@/i18n-config';

function handleLocale(request: NextRequest) {
    const locales = i18n.locales
    const defaultLocale = i18n.defaultLocale

    const allLocales=["af-ZA","am-ET","ar-AE","ar-BH","ar-DZ","ar-EG","ar-IQ","ar-JO","ar-KW","ar-LB","ar-LY","ar-MA","arn-CL","ar-OM","ar-QA","ar-SA","ar-SD","ar-SY","ar-TN","ar-YE","as-IN","az-az","az-Cyrl-AZ","az-Latn-AZ","ba-RU","be-BY","bg-BG","bn-BD","bn-IN","bo-CN","br-FR","bs-Cyrl-BA","bs-Latn-BA","ca-ES","co-FR","cs-CZ","cy-GB","da-DK","de-AT","de-CH","de-DE","de-LI","de-LU","dsb-DE","dv-MV","el-CY","el-GR","en-029","en-AU","en-BZ","en-CA","en-cb","en-GB","en-IE","en-IN","en-JM","en-MT","en-MY","en-NZ","en-PH","en-SG","en-TT","en-US","en-ZA","en-ZW","es-AR","es-BO","es-CL","es-CO","es-CR","es-DO","es-EC","es-ES","es-GT","es-HN","es-MX","es-NI","es-PA","es-PE","es-PR","es-PY","es-SV","es-US","es-UY","es-VE","et-EE","eu-ES","fa-IR","fi-FI","fil-PH","fo-FO","fr-BE","fr-CA","fr-CH","fr-FR","fr-LU","fr-MC","fy-NL","ga-IE","gd-GB","gd-ie","gl-ES","gsw-FR","gu-IN","ha-Latn-NG","he-IL","hi-IN","hr-BA","hr-HR","hsb-DE","hu-HU","hy-AM","id-ID","ig-NG","ii-CN","in-ID","is-IS","it-CH","it-IT","iu-Cans-CA","iu-Latn-CA","iw-IL","ja-JP","ka-GE","kk-KZ","kl-GL","km-KH","kn-IN","kok-IN","ko-KR","ky-KG","lb-LU","lo-LA","lt-LT","lv-LV","mi-NZ","mk-MK","ml-IN","mn-MN","mn-Mong-CN","moh-CA","mr-IN","ms-BN","ms-MY","mt-MT","nb-NO","ne-NP","nl-BE","nl-NL","nn-NO","no-no","nso-ZA","oc-FR","or-IN","pa-IN","pl-PL","prs-AF","ps-AF","pt-BR","pt-PT","qut-GT","quz-BO","quz-EC","quz-PE","rm-CH","ro-mo","ro-RO","ru-mo","ru-RU","rw-RW","sah-RU","sa-IN","se-FI","se-NO","se-SE","si-LK","sk-SK","sl-SI","sma-NO","sma-SE","smj-NO","smj-SE","smn-FI","sms-FI","sq-AL","sr-BA","sr-CS","sr-Cyrl-BA","sr-Cyrl-CS","sr-Cyrl-ME","sr-Cyrl-RS","sr-Latn-BA","sr-Latn-CS","sr-Latn-ME","sr-Latn-RS","sr-ME","sr-RS","sr-sp","sv-FI","sv-SE","sw-KE","syr-SY","ta-IN","te-IN","tg-Cyrl-TJ","th-TH","tk-TM","tlh-QS","tn-ZA","tr-TR","tt-RU","tzm-Latn-DZ","ug-CN","uk-UA","ur-PK","uz-Cyrl-UZ","uz-Latn-UZ","uz-uz","vi-VN","wo-SN","xh-ZA","yo-NG","zh-CN","zh-HK","zh-MO","zh-SG","zh-TW","zu-ZA"]
    const { headers } = request
    const { pathname } = request.nextUrl
    
    const pathnameHasSupportedLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}` || pathname.startsWith(`/${locale.split('-')[0]}/`) || pathname === `/${locale.split('-')[0]}`
    )
    if(pathnameHasSupportedLocale) return null

    const pathnameHasLocale = allLocales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}` || pathname.startsWith(`/${locale.split('-')[0]}/`) || pathname === `/${locale.split('-')[0]}`
    )
    if(pathnameHasLocale) {
        // If there is a locale,
        // 1. If supported, do nothing
        // 2. If not supported, redirect to the default locale
        const requestedLocale = pathname.split('/')[1]
        // console.log("requestedLocale: ", requestedLocale)
        // console.log("match", [requestedLocale], locales, defaultLocale)
        const supportedLocale = match([requestedLocale], locales, defaultLocale)
        // console.log("supportedLocale: ", supportedLocale)
        request.nextUrl.pathname = pathname.replace(requestedLocale, supportedLocale)
    } else {
        // If there is no locale, 
        // 1. get the preferred locale from the headers
        // 2. If supported (localematcher), redirect to the preferred locale
        // 3. If not supported, redirect to the default locale
        const acceptLanguage = headers.get('accept-language');
        if (acceptLanguage) {
            const languages = new Negotiator({ headers: {'accept-language': acceptLanguage} }).languages()
            const locale = match(languages, locales, defaultLocale)
            // e.g. incoming request is /products => The new URL is now /en-US/products
            request.nextUrl.pathname = `/${locale}${pathname}`
        } else {
            request.nextUrl.pathname = `/${defaultLocale}${pathname}`
        }
    }

    return request.nextUrl
    
}


export function middleware(request: NextRequest) {

    const urlToRedirectTo = handleLocale(request)
    if(urlToRedirectTo) {
        return Response.redirect(urlToRedirectTo)
    } else {
        return
    }
}
    
export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}
