"use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise FundFooter - EXECUTIVE SHARP EDITION
 * Purpose: Regulatory disclosure and capital movement compliance notice.
 * Fix: Strictly Left-aligned text as per VVIP requirement. ✅
 * Fix: Reduced vertical padding for ultra-compact look. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 */
export default function FundFooter({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerStyle = {
    marginTop: isMobile ? '30px' : '60px',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0',
    textAlign: 'left', // Strictly Left Aligned ✅
    width: '100%',
    boxSizing: 'border-box'
  };

  const textStyle = {
    fontSize: isMobile ? '8px' : '9px',
    color: '#94a3b8',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontStyle: 'italic',
    margin: 0,
    lineHeight: '1.8'
  };

  return (
    <footer style={footerStyle}>
      <p style={textStyle}>
        * Regulatory Disclosure: Inter-company fund movements and automated profit distributions for Unit {selectedSbuId || "the organization"} 
        are automatically synchronized with the General Ledger in real-time. <br />
        Authorized administrative access only - All capital transactions are verified for equity reconciliation and audit compliance. *
      </p>
    </footer>
  );
}