"use client";

import { useRouter } from 'next/navigation';

/**
 * Reusable BackButton Component (Advanced Responsive UI)
 * Purpose: Provides a high-end, clear navigation-back trigger.
 * Update: Replaced the path with a high-visibility bold arrow to avoid "dot" look. ✅
 */
export default function BackButton() {
    const router = useRouter();

    return (
        <button 
            onClick={() => router.back()} 
            className="cursor-pointer bg-white border border-slate-200 p-2 sm:p-2.5 rounded-xl md:rounded-2xl hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 active:scale-90 group flex items-center justify-center text-slate-600 shadow-sm"
            title="Return to Previous Page"
        >
            {/* New Professional High-Visibility Arrow Icon ✅ */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 group-hover:-translate-x-1.5 transition-transform duration-300 ease-out" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M11 17l-5-5m0 0l5-5m-5 5h12" 
                />
            </svg>
        </button>
    );
}