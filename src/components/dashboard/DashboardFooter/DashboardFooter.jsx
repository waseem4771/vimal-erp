"use client";

import { useState, useEffect } from 'react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import DashboardFooterMobile from '../DashboardFooterMobile/DashboardFooterMobile';

export default function DashboardFooter({ selectedSbuId }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    // 1. MOBILE VIEW: Kabhee Laptop code par asar nahi karega
    if (isMobile) {
        return <DashboardFooterMobile selectedSbuId={selectedSbuId} />;
    }

    // 2. LAPTOP VIEW: Aapka original code, 100% UNTOUCHED
    return (
        <footer className="mt-12 py-6 bg-white border-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-6">
                
                {/* Notice Block */}
                <div className="w-full text-left">
                    <p className="text-[10px] md:text-[12.5px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed italic max-w-6xl">
                        * Strategic unit isolation protocol is active. Session data and all transactional logs are 
                        cryptographically verified for <span className="text-slate-800 not-italic border-b border-slate-200">Unit {selectedSbuId || "1"}</span>. 
                        Unauthorized attempts to bypass unit boundaries are recorded in the immutable audit trail. *
                    </p>
                </div>

                {/* Bottom Bar Block */}
                <div className="flex flex-row flex-nowrap justify-between items-center w-full pt-5 border-t border-slate-50">
                    
                    <div className="flex-1 text-left">
                        <span className="text-[11px] md:text-[13px] text-slate-500 font-black uppercase tracking-tighter whitespace-nowrap">
                            VIMAL ERP v3.1.0
                        </span>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-4 md:gap-10 px-4 shrink-0">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-slate-900 transition-all duration-300">
                            <FaXTwitter size={17} className="md:size-[19px]" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-600 transition-all duration-300">
                            <FaFacebookF size={17} className="md:size-[19px]" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-pink-600 transition-all duration-300">
                            <FaInstagram size={18} className="md:size-[20px]" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-red-600 transition-all duration-300">
                            <FaYoutube size={18} className="md:size-[20px]" />
                        </a>
                    </div>

                    <div className="flex-1 flex justify-end items-center gap-2.5">
                        <div className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                style={{ width: 'clamp(10px, 1.1vw, 13.5px)', height: 'clamp(10px, 1.1vw, 13.5px)' }}
                                className="text-emerald-500" 
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                            <span className="text-[11px] md:text-[13px] text-emerald-600 font-black uppercase tracking-widest leading-none">
                                Node Synchronized
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}