"use client";

import { useState, useEffect } from 'react';
// Professional Security Icon ✅
import { FiShield, FiLock } from 'react-icons/fi';

/**
 * Enterprise UserFooter - EXECUTIVE SHARP EDITION
 * Purpose: Security protocol notice and unit authorization protocol footer.
 * Fix: Strictly Left-aligned text as per VVIP requirement. ✅
 * Fix: Significantly reduced vertical padding for ultra-compact look on Mobile. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 */
export default function UserFooter({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerWrapperStyle = {
    marginTop: isMobile ? '25px' : '40px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

  const darkNoticeStyle = {
    backgroundColor: '#0f172a', // Corporate Dark Slate
    // Vertical padding reduced: 8px Mobile / 12px Laptop ✅
    padding: isMobile ? '8px 15px' : '12px 30px',
    borderRadius: '0px', 
    borderLeft: '5px solid #2563eb', // Identity Blue Accent
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  };

  const iconBoxStyle = {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    padding: '6px', // Slim icon box
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0px',
    border: '1px solid rgba(37, 99, 235, 0.2)',
    flexShrink: 0
  };

  const statutoryTextStyle = {
    fontSize: isMobile ? '8px' : '9px',
    color: '#94a3b8',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontStyle: 'italic',
    margin: 0,
    lineHeight: '1.4',
    textAlign: 'left'
  };

  return (
    <footer style={footerWrapperStyle}>
      
      {/* 1. DARK COMPACT SECURITY PROTOCOL BANNER ✅ */}
      <div style={darkNoticeStyle}>
        <div style={iconBoxStyle}>
            <FiLock style={{ color: '#60a5fa', fontSize: isMobile ? '18px' : '22px' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: isMobile ? '8.5px' : '10px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Security Protocol Active
            </h4>
            <p style={{ fontSize: isMobile ? '8px' : '9px', color: '#64748b', fontWeight: '700', margin: '2px 0 0 0', lineHeight: '1.3' }}>
                Personnel registration triggers an immutable audit log entry for <span style={{ color: '#60a5fa' }}>{selectedSbuId ? `Unit ${selectedSbuId}` : "Mother Hub"}</span>. 
                RBAC middleware ensures organizational data isolation.
            </p>
        </div>
      </div>

      {/* 2. BASELINE AUTHORIZATION TEXT ✅ */}
      <div style={{ paddingLeft: '5px', textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
        <p style={statutoryTextStyle}>
          * Strategic User Authorization Protocol is active for Vimal ERP Organisation *
        </p>
      </div>

    </footer>
  );
}