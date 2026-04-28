// /**
//  * Auth Utility
//  * Purpose: Handles session-related actions like Logout.
//  * Logic: Clears LocalStorage and expires the session cookie.
//  */

// export const logoutUser = (router) => {
//     // 1. Clear all LocalStorage data (User ID, Role, SBU ID)
//     localStorage.clear();

//     // 2. Expire the 'vimal_session' cookie used by the middleware
//     document.cookie = "vimal_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

//     // 3. Redirect the user back to the Login page
//     router.push('/login');
// };





/**
 * Auth Utility - EXECUTIVE SESSION MANAGEMENT
 * Purpose: Handles secure session termination and cleanup.
 * Fix: Explicitly clears the 7-day persistent session cookie. ✅
 * Fix: Wipes all local unit and identity metadata. ✅
 */

export const logoutUser = (router) => {
    // 1. Clear all LocalStorage data (User ID, Role, SBU ID selection)
    if (typeof window !== 'undefined') {
        localStorage.clear();

        /**
         * 2. TERMINATE PERSISTENT COOKIE ✅
         * Match the path and same-site attributes used during login
         * to ensure the browser successfully removes the 7-day session.
         */
        document.cookie = "vimal_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";

        // 3. Secure Redirection to the Authentication Hub
        router.push('/login');
    }
};