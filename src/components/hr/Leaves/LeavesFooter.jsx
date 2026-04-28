"use client";

import { useState, useEffect } from 'react';
// Professional Icons for HR/Compliance ✅
import { FiShield } from 'react-icons/fi';

/**
 * Enterprise LeavesFooter - EXECUTIVE SLIM EDITION
 * Purpose: Compliance notice and unit isolation protocol footer.
 * Fix: Significantly reduced vertical padding for ultra-compact look. ✅
 * Fix: Strictly Left-aligned text as per VVIP requirement. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 */
export default function LeavesFooter({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerWrapperStyle = {
    marginTop: isMobile ? '25px' : '40px', // Wrapper margin reduced
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
    borderLeft: '5px solid #4f46e5', // Indigo HR Accent
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box'
  };

  const iconBoxStyle = {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    padding: '6px', // Reduced from 10px to slim the box ✅
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0px',
    border: '1px solid rgba(79, 70, 229, 0.2)',
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
      
      {/* 1. DARK SLIM POLICY BANNER ✅ */}
      <div style={darkNoticeStyle}>
        <div style={iconBoxStyle}>
            <FiShield style={{ color: '#818cf8', fontSize: isMobile ? '18px' : '22px' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: isMobile ? '8.5px' : '10px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                HR Compliance & Policy Notice
            </h4>
            <p style={{ fontSize: isMobile ? '8px' : '9px', color: '#64748b', fontWeight: '700', margin: '2px 0 0 0', lineHeight: '1.3' }}>
                All approved leave records for <span style={{ color: '#818cf8' }}>Unit {selectedSbuId}</span> are synchronized with the Payroll Engine. 
                Unauthorized modifications are cryptographically flagged.
            </p>
        </div>
      </div>

      {/* 2. BASELINE ISOLATION TEXT ✅ */}
      <div style={{ paddingLeft: '5px', textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
        <p style={statutoryTextStyle}>
          * Strategic Business Unit Isolation Protocol is active for HR data integrity *
        </p>
      </div>

    </footer>
  );
}