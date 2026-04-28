


"use client";

import Link from 'next/link';

/**
 * Enterprise SidebarHeader - EXECUTIVE GLOW EDITION
 * Purpose: Identity header with synchronized light effects on both Logo and Typography.
 * Fix: Added subtle Blue-Sky light glow (filter) to VIMAL text. ✅
 * Fix: Logo lighting effect maintained for HD visibility. ✅
 * Priority: Maximum Vertical Compression & Professional Alignment. ✅
 */
export default function SidebarHeader() {
  return (
    /* 
       -mt-10: Absolute top positioning.
       mb-1: Minimized bottom gap.
       padding: 0px: Forced absolute vertical compression.
    */
    <div 
      style={{ 
        boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.15)', 
        paddingTop: '0px', 
        paddingBottom: '0px' 
      }}
      className="-mt-10 mb-1 group cursor-pointer transition-all w-full"
    >
      {/* items-center ensures the text and logo are perfectly aligned in one line ✅ */}
      <Link href="/" className="flex flex-row items-center gap-0 pt-0 leading-none">
        
        {/* 1. XL HIGH-DEFINITION LOGO WITH LIGHT EFFECT ✅ */}
        <div 
          style={{ 
            width: '84px', 
            height: '84px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // LOGO GLOW: Vibrant Blue-Sky Effect
            filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.5)) brightness(1.1)'
          }} 
          className="flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
        >
          <img 
              src="/images-logo/logo-erp2.png" 
              alt="Vimal"
              className="h-full w-full object-contain"
              style={{ imageRendering: 'auto' }} 
              onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* 2. CENTER-ALIGNED BLUE-SKY TYPOGRAPHY WITH SUBTLE GLOW ✅ */}
        <div className="flex flex-col justify-center">
            <h2 
                style={{ 
                    background: 'linear-gradient(to bottom, #2563eb, #38bdf8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    fontSize: 'clamp(12px, 1.4vw, 16px)',
                    fontWeight: '900',
                    marginLeft: '-6px', /* Tight attachment */
                    // TEXT GLOW: Added very subtle matching light effect ✅
                    filter: 'drop-shadow(0 0 5px rgba(56, 189, 248, 0.3))'
                }}
                className="uppercase tracking-widest leading-none select-none"
            >
                VIMAL
            </h2>
        </div>

      </Link>
    </div>
  );
}