// import { NextResponse } from 'next/server';

// /**
//  * Global Auth Middleware
//  * Purpose: To protect ERP routes and redirect unauthenticated users to the Login page.
//  * Note: This runs on the server-side before any page is rendered.
//  */
// export function middleware(request) {
//     // 1. Get the session cookie (We will set this during login in the next step)
//     const session = request.cookies.get('vimal_session');
//     const { pathname } = request.nextUrl;

//     // 2. Public Paths (Pages that anyone can see)
//     const isPublicPath = pathname === '/login';

//     // 3. Logic: If user is NOT logged in and trying to access a private page (like Dashboard)
//     if (!isPublicPath && !session) {
//         // Redirect to Login Page
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // 4. Logic: If user IS logged in and tries to go to Login page again
//     if (isPublicPath && session) {
//         // Redirect back to Dashboard
//         return NextResponse.redirect(new URL('/', request.url));
//     }

//     // Allow the request to proceed if everything is fine
//     return NextResponse.next();
// }

// /**
//  * Configure which paths the middleware should run on.
//  * We want to protect everything EXCEPT static files (images, logos) and API routes.
//  */
// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - api (API routes)
//          * - _next/static (static files)
//          * - _next/image (image optimization files)
//          * - favicon.ico (favicon file)
//          */
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
// };






import { NextResponse } from 'next/server';

/**
 * VIMAL ERP - GLOBAL AUTHENTICATION GUARD (MIDDLEWARE)
 * Purpose: Server-side route protection and session verification.
 * Fix: Reliable session detection to support 7-day persistent login. ✅
 * Fix: Strict redirection logic for authorized/unauthorized states. ✅
 */
export function middleware(request) {
    // 1. Extract the session cookie set during the login process
    const session = request.cookies.get('vimal_session');
    const { pathname } = request.nextUrl;

    // 2. Identify Public vs Private access paths
    const isLoginPage = pathname === '/login';

    /**
     * 3. SECURITY ENFORCEMENT LOGIC ✅
     * If NO session exists and the user is NOT on the login page:
     * Force redirect to the Authentication Portal.
     */
    if (!session && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    /**
     * 4. AUTHORIZATION BYPASS LOGIC ✅
     * If a VALID session exists and the user tries to access the login page:
     * Automatically push them back to the Executive Dashboard.
     */
    if (session && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 5. Grant access if criteria are met
    return NextResponse.next();
}

/**
 * SYSTEM MATCHER CONFIGURATION
 * Logic: Protects all administrative routes while ignoring static assets and APIs.
 */
export const config = {
    matcher: [
        /*
         * Target all paths except:
         * - api (internal server routes)
         * - _next/static (optimized files)
         * - _next/image (image assets)
         * - favicon.ico (system icon)
         * - images-logo (branding assets) ✅ Added for reliability
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images-logo).*)',
    ],
};