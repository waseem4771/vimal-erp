

"use client";

import { HiBars3BottomLeft } from "react-icons/hi2";

/**
 * Enterprise MobileHeader - EXECUTIVE GLOW EDITION
 * Purpose: Dedicated top-bar with HD lighting effect on branding.
 * Fix: Added Blue-Sky light glow (drop-shadow) to the mobile logo. ✅
 * Fix: Auto-hide menu trigger logic maintained for clean workspace. ✅
 */
export default function MobileHeader({ isOpen, onOpen }) {
  return (
    /* ROOT WRAPPER: Kills laptop space entirely ✅ */
    <div id="vimal-mobile-root-vip">
      
      {/* 1. VIP CSS: Absolute priority logic for isolation and stacking ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* --- LAPTOP: Zero Space Logic (Absolute Removal) --- */
        @media (min-width: 1024px) {
          #vimal-mobile-root-vip { 
            display: none !important; 
            height: 0 !important; 
            overflow: hidden !important;
          }
        }
        
        /* --- MOBILE: Stacking & Geometry --- */
        #vimal-mobile-master-bar-vip {
          height: 65px !important; 
          background-color: #0f172a !important; /* Solid Slate-900 ✅ */
          border-bottom: 1px solid #1e293b !important;
          z-index: 50 !important; 
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
        }
      `}} />

      {/* 2. MAIN HEADER BAR ✅ */}
      <div 
        id="vimal-mobile-master-bar-vip" 
        className="sticky top-0 shadow-2xl justify-between transition-none"
      >
        
        {/* LEFT SECTION: LOGO WITH HD LIGHT EFFECT ✅ */}
        <div className="flex items-center justify-start h-full min-w-[100px] overflow-hidden">
            {!isOpen && (
                <img 
                    src="/images-logo/logo-erp2.png" 
                    alt="Vimal ERP"
                    style={{ 
                        height: '78px', 
                        width: 'auto', 
                        marginLeft: '12px', 
                        display: 'block',
                        // LIGHT EFFECT: Blue-Sky Glow for Mobile Branding ✅
                        filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.5)) brightness(1.1)'
                    }}
                    className="pointer-events-none animate-in fade-in duration-200"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            )}
        </div>

        {/* RIGHT SECTION: DYNAMIC ACTION BUTTON ✅ */}
        <div 
          style={{ paddingRight: '7px' }} 
          className="flex items-center justify-center h-full"
        >
            {!isOpen && (
                <button 
                    onClick={(e) => { e.preventDefault(); onOpen(); }}
                    /* Forced 0.5px white hairline border ✅ */
                    style={{ border: '0.5px solid rgba(255, 255, 255, 0.4)' }}
                    className="cursor-pointer p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center bg-slate-800/60 shadow-md active:scale-95 animate-in fade-in"
                >
                    <HiBars3BottomLeft size={22} className="text-blue-400" />
                </button>
            )}
        </div>

      </div>
    </div>
  );
}