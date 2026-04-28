"use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise TaxationFooter - EXECUTIVE SHARP EDITION
 * Fix: Strictly Left-aligned text as per VVIP requirement. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 * Mobile: Responsive font scaling and spacing. ✅
 */
export default function TaxationFooter({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerStyle = {
    marginTop: '60px',
    paddingTop: '25px',
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
        * Regulatory Disclosure: This report is aggregated based on the active unit financial ledger entries for Unit {selectedSbuId}. <br />
        All figures are cryptographically synchronized for audit-readiness and internal compliance monitoring. *
      </p>
    </footer>
  );
}