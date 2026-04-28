"use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise DepartmentsFooter - EXECUTIVE SHARP EDITION (Slim)
 * Fix: Strictly Left-aligned text as per VVIP requirement. ✅
 * Fix: Reduced vertical padding (Smaller top/bottom size). ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 * Mobile: Responsive font scaling and spacing. ✅
 */
export default function DepartmentsFooter() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerStyle = {
    marginTop: '40px',
    paddingTop: '15px', // Top padding reduced for slim look ✅
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
    lineHeight: '1.6'
  };

  return (
    <footer style={footerStyle}>
      <p style={textStyle}>
        * Regulatory Notice: All organizational modifications are protected by RBAC 
        and cryptographically logged in the internal audit trail for compliance purposes. *
      </p>
    </footer>
  );
}