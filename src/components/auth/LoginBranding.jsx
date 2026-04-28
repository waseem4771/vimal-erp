

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiLock } from 'react-icons/fi';

/**
 * FIXED STATIC IMPORT PATH ✅
 */
import logoImg from '../../../public/images-logo/login-page.png';

/**
 * Enterprise LoginBranding - EXECUTIVE ULTRA-WIDE EDITION
 * Purpose: Identity section with wide baseline and refined micro-typography.
 * Fix: Underline width expanded for a solid administrative look. ✅
 * Fix: ERP text size micro-adjusted (smaller) for better scale. ✅
 * Style: Slanted typography, Dark Gray tone, 0px Radius, 100% Inline CSS. ✅
 */
export default function LoginBranding() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const brandingWrapperStyle = {
    backgroundColor: '#2563eb', // Executive Blue
    padding: isMobile ? '15px 15px' : '50px 40px',
    textAlign: 'center',
    borderBottom: 'none', 
    borderRadius: '0px', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '10px' : '15px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const identityRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0px', 
    width: '100%',
    position: 'relative',
    marginBottom: isMobile ? '5px' : '10px'
  };

  const imageContainerStyle = {
    width: isMobile ? '70px' : '120px', 
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))'
  };

  const titleStyle = {
    fontSize: isMobile ? '16px' : '28px', // Slightly smaller for refined look ✅
    fontWeight: '600', 
    color: '#333333', 
    margin: 0,
    marginLeft: isMobile ? '-8px' : '-15px', 
    lineHeight: '1',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    display: 'inline-block',
    zIndex: 1,
    transform: 'skewX(-10deg)', // Slanted tech look
    WebkitTransform: 'skewX(-10deg)'
  };

  const badgeStyle = {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: isMobile ? '6px' : '10px',
    backgroundColor: 'rgba(0,0,0,0.1)', 
    padding: isMobile ? '6px 12px' : '8px 20px',
    borderRadius: '0px',
    border: '1px solid rgba(255,255,255,0.05)',
    width: 'fit-content'
  };

  const subtitleStyle = {
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '800',
    color: '#dbeafe', 
    textTransform: 'uppercase',
    letterSpacing: '0.22em',
    margin: 0,
    opacity: 0.8,
    whiteSpace: 'nowrap'
  };

  // Ultra-Wide baseline line updated ✅
  const underlineStyle = {
    width: isMobile ? '160px' : '240px', // Width expanded on both sides ✅
    height: '2px',
    backgroundColor: '#000000',
    marginTop: '20px', 
    opacity: 0.5,
    borderRadius: '1px'
  };

  return (
    <div style={brandingWrapperStyle}>
      
      {/* 1. IDENTITY ROW: LOGO + MINI SLANTED ERP TEXT */}
      <div style={identityRowStyle}>
        <div style={imageContainerStyle}>
          <Image 
              src={logoImg} 
              alt="Logo" 
              style={{ 
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block'
              }}
              priority={true}
          />
        </div>

        <h1 style={titleStyle}>
            ERP
        </h1>
      </div>

      {/* 2. SECURITY ACCESS BADGE WITH ULTRA-WIDE BASELINE ✅ */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
        <div style={badgeStyle}>
            <FiLock size={isMobile ? 10 : 12} style={{ color: '#93c5fd' }} />
            <p style={subtitleStyle}>
                Secure Administrative Access
            </p>
        </div>
        
        {/* Ultra-Wide Dark line shifted down ✅ */}
        <div style={underlineStyle}></div>
      </div>

    </div>
  );
}