

import axios from 'axios';

/**
 * VIMAL ERP - Global API Client Configuration
 * Purpose: Centrally manages backend communication and RBAC security headers.
 * Deployment Ready: Uses NEXT_PUBLIC_API_URL from environment variables. ✅
 */
const api = axios.create({
    /**
     * Logic: Pulls the API Base URL from the .env.local file.
     * Fallback: Defaults to localhost:5000 for local development if env is missing.
     */
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
});

/**
 * Request Interceptor
 * Purpose: Automatically injects identity headers into every outgoing request.
 * Required for: Backend 'rbacMiddleware' to verify user permissions and Unit context. ✅
 */
api.interceptors.request.use((config) => {
    // Ensuring the code runs only in the browser (client-side)
    if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('vimal_user_id');
        
        if (userId) {
            /**
             * The 'x-user-id' header is mandatory for the backend to:
             * 1. Check module permissions (RBAC).
             * 2. Log actions in the Audit Trail for the correct user.
             */
            config.headers['x-user-id'] = userId;
        }
    }
    return config;
}, (error) => {
    // Handles cases where the request configuration fails
    return Promise.reject(error);
});

export default api;