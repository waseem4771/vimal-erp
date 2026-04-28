"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ExecutiveBackground from '@/components/layout/ExecutiveBackground/ExecutiveBackground';
// Professional Icons ✅
import { FiArrowLeft, FiShield, FiAlertOctagon, FiActivity } from 'react-icons/fi';

/**
 * Global 404 Page - EXECUTIVE TERMINAL EDITION
 * Purpose: Professional fallback with a wide-screen desktop layout.
 * Fix: Expanded width for Laptop to prevent "Mobile-in-Laptop" look. ✅
 * Fix: Fully responsive button with optimized touch targets for Mobile. ✅
 * Style: 100% Sharp (0px Radius), Glassy UI, Inline CSS. ✅
 */
export default function NotFound() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const mainRootStyle = {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', 
    overflow: 'hidden',
    position: 'relative'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    // Laptop width increased to 900px to feel like a real desktop app ✅
    maxWidth: isMobile ? '90%' : '900px', 
    width: '100%',
    padding: isMobile ? '40px 20px' : '60px 80px',
    border: '1px solid rgba(15, 23, 42, 0.1)',
    borderRadius: '0px', 
    boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    zIndex: 10,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const errorCodeStyle = {
    fontSize: isMobile ? '80px' : '150px',
    fontWeight: '950',
    color: '#0f172a',
    margin: 0,
    lineHeight: '0.9',
    letterSpacing: '-0.05em',
    opacity: 0.9,
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  };

  const statusBadgeStyle = {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '6px 15px',
    fontSize: isMobile ? '9px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    display: 'inline-block',
    marginTop: '20px',
    borderRadius: '0px'
  };

  const returnBtnStyle = {
    marginTop: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: '#2563eb', // Executive Blue
    color: '#ffffff',
    // Responsive padding for the button ✅
    padding: isMobile ? '14px 20px' : '18px 45px',
    textDecoration: 'none',
    fontSize: isMobile ? '10px' : '12px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    border: 'none',
    borderRadius: '0px',
    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)',
    transition: 'all 0.3s ease',
    width: isMobile ? '100%' : 'auto', // Mobile par button poori width le ga ✅
    boxSizing: 'border-box'
  };

  return (
    <main style={mainRootStyle}>
      
      {/* 1. DYNAMIC WATER MESH BG */}
      <ExecutiveBackground />

      {/* 2. EXECUTIVE ERROR WORKSPACE ✅ */}
      <div style={cardStyle}>
        
        {/* Large Visual Header */}
        <div style={errorCodeStyle}>
            {!isMobile && <FiAlertOctagon size={80} style={{ color: '#ef4444' }} />}
            <span>404</span>
        </div>
        
        <div style={statusBadgeStyle}>
            System Alert: Invalid Resource Path
        </div>

        {/* Professional Message Layout */}
        <div style={{ marginTop: '30px', maxWidth: '600px' }}>
            <p style={{ 
                fontSize: isMobile ? '13px' : '16px', 
                color: '#475569', 
                fontWeight: '600', 
                lineHeight: '1.7', 
                margin: 0,
                textAlign: 'center'
            }}>
                The administrative module you are attempting to access is currently <span style={{color: '#0f172a', fontWeight: '800'}}>Offline</span> or has been <span style={{color: '#0f172a', fontWeight: '800'}}>Restricted</span> by the Mother Company security protocol.
            </p>
        </div>

        {/* FULLY RESPONSIVE ACTION BUTTON ✅ */}
        <Link 
            href="/" 
            style={returnBtnStyle}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <FiArrowLeft size={isMobile ? 16 : 20} />
            <span>Return to Secure Terminal</span>
        </Link>

        {/* COMPLIANCE FOOTER */}
        <div style={{ 
            marginTop: '50px', 
            paddingTop: '20px', 
            borderTop: '1px solid rgba(15, 23, 42, 0.05)', 
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
        }}>
            <FiShield style={{ color: '#94a3b8' }} />
            <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Vimal ERP Security & Integrity Engine
            </span>
        </div>

      </div>

      {/* VVIP GLOBAL STYLE INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; transition: background-color 0.3s, transform 0.3s !important; }
      `}} />

    </main>
  );
}