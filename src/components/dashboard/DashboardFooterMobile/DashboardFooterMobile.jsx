"use client";

import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

/**
 * Enterprise DashboardFooter - MOBILE ONLY VERSION
 * Fix: Visible Ultra-thin divider using low-opacity dark slate. ✅
 * Layout: Left Notice, Centered Icons, Split Version/Status Bar. ✅
 */
export default function DashboardFooterMobile({ selectedSbuId }) {
  return (
    <footer className="mt-8 py-6 bg-white border-none">
        <div className="flex flex-col gap-6 px-4">
            
            {/* 1. STATUTORY NOTICE (Left Aligned) */}
            <div className="w-full text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed italic">
                    * Strategic unit isolation protocol is active. Logs verified for 
                    <span className="text-slate-800 not-italic"> Unit {selectedSbuId || "1"}</span>. *
                </p>
            </div>

            {/* 2. SOCIAL MEDIA HUB (Centered) */}
            <div className="flex flex-row items-center justify-center gap-8 text-slate-300">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter size={18} /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF size={18} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={19} /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube size={19} /></a>
            </div>

            {/* 3. SPLIT BOTTOM BAR: Version (Left) | Status (Right) */}
            {/* border-slate-900/10 ka matlab hai bohot hi bareek aur faint line jo gayab nahi hogi ✅ */}
            <div className="flex flex-row justify-between items-center w-full pt-4 border-t border-slate-900/10">
                
                {/* SYSTEM VERSION (Left Side) */}
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">
                    VIMAL ERP v3.1.0
                </span>
                
                {/* NODE STATUS (Right Side) */}
                <div className="flex items-center gap-1.5">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-3 h-3 text-emerald-500" 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <span className="text-[9px] text-emerald-600 font-black uppercase tracking-widest leading-none">
                        Node Synchronized
                    </span>
                </div>
            </div>

        </div>
    </footer>
  );
}