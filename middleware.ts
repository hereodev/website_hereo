 
let locales = ['en', 'en-US', 'fr', 'fr-FR', 'nl']
 
 // Get the preferred locale, similar to the above or using a library
function getLocale(request: any) { 
    return "fr"
}

export function middleware(request: any) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    
    if (pathnameHasLocale) return
    
    let locale:string;
    // Redirect if there is no locale
    try {
        locale = getLocale(request)
    } catch (error) {
        locale = locales[0]
    }
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return Response.redirect(request.nextUrl)
}
    
export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}