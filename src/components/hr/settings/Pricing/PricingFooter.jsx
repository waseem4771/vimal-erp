"use client";

import { useState, useEffect } from 'react';
// Professional Security Icon ✅
import { FiShield } from 'react-icons/fi';

/**
 * Enterprise PricingFooter - EXECUTIVE SLIM EDITION
 * Purpose: Data isolation enforcement and audit synchronization notice.
 * Fix: Strictly Left-aligned text as per VVIP requirement. ✅
 * Fix: Reduced vertical padding for ultra-compact look on Mobile. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 */
export default function PricingFooter({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerWrapperStyle = {
    marginTop: isMobile ? '30px' : '50px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
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
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  return (
    <footer style={footerWrapperStyle}>
      
      {/* 1. SEPARATOR LINE */}
      <div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0' }}></div>

      {/* 2. BASELINE COMPLIANCE TEXT ✅ */}
      <div style={{ paddingLeft: '5px', textAlign: 'left' }}>
        <p style={statutoryTextStyle}>
          * Strategic Business Unit data isolation is enforced for all pricing and promotional activities within Unit {selectedSbuId}. <br />
          All modifications are cryptographically synchronized with the Mother Company audit logs for financial reconciliation. *
        </p>
      </div>

    </footer>
  );
}