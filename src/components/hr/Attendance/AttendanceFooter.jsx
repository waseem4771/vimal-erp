"use client";

import { useState, useEffect } from 'react';
// Professional Security Icon ✅
import { FiShield } from 'react-icons/fi';

/**
 * Enterprise AttendanceFooter - EXECUTIVE SHARP EDITION (Slim)
 * Fix: Strictly Left-aligned text and icons. ✅
 * Fix: Reduced vertical padding for ultra-compact height. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 * Mobile: Responsive font scaling and layout. ✅
 */
export default function AttendanceFooter({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerStyle = {
    marginTop: '50px',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const darkNoticeStyle = {
    backgroundColor: '#0f172a', // Corporate Dark Slate
    padding: isMobile ? '12px 15px' : '15px 30px',
    borderRadius: '0px', // Forced Sharp ✅
    borderLeft: '5px solid #2563eb', // Security Blue Accent
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    textAlign: 'left',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  };

  const statutoryTextStyle = {
    fontSize: isMobile ? '8px' : '9px',
    color: '#94a3b8',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontStyle: 'italic',
    margin: 0,
    lineHeight: '1.6',
    textAlign: 'left'
  };

  return (
    <footer style={footerStyle}>
      
      {/* 1. DARK SECURITY PROTOCOL BANNER ✅ */}
      <div style={darkNoticeStyle}>
        <FiShield style={{ color: '#60a5fa', fontSize: isMobile ? '20px' : '24px', flexShrink: 0 }} />
        <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: isMobile ? '9px' : '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Cyber-Security Protocol Active
            </h4>
            <p style={{ fontSize: isMobile ? '8.5px' : '9.5px', color: '#64748b', fontWeight: '700', margin: '2px 0 0 0', lineHeight: '1.3' }}>
                Attendance logs for <span style={{ color: '#60a5fa' }}>Unit {selectedSbuId}</span> are cryptographically linked to your administrative identity and IP address.
            </p>
        </div>
      </div>

      {/* 2. BASELINE COMPLIANCE TEXT ✅ */}
      <div style={{ paddingLeft: '5px', textAlign: 'left' }}>
        <p style={statutoryTextStyle}>
          * Unauthorized modification to verified presence records is flagged in the global organization audit trail *
        </p>
      </div>

    </footer>
  );
}