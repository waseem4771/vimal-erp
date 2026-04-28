"use client";

import { useState, useEffect } from 'react';
// Professional Compliance Icons ✅
import { FiShield } from 'react-icons/fi';

/**
 * Enterprise AuditFooter - EXECUTIVE SLIM EDITION (FIXED)
 * Purpose: Regulatory disclosure and unit isolation protocol notice.
 * Fix: Significantly reduced vertical padding and margins for a compact look. ✅
 * Fix: Strictly Left-aligned text as per VVIP requirement. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 */
export default function AuditFooter({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerWrapperStyle = {
    marginTop: isMobile ? '20px' : '30px', // Margin reduced from 50px
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px' // Gap reduced from 20px
  };

  const protocolBoxStyle = {
    backgroundColor: '#ffffff',
    // Vertical padding reduced: 10px Mobile / 15px Laptop ✅
    padding: isMobile ? '10px 15px' : '15px 30px',
    border: '1px solid #e2e8f0',
    borderLeft: '6px solid #2563eb', // Executive Blue Accent
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box'
  };

  const statutoryTextStyle = {
    fontSize: isMobile ? '8px' : '9px',
    color: '#94a3b8',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontStyle: 'italic',
    margin: 0,
    lineHeight: '1.4', // Tightened line height
    textAlign: 'left'
  };

  return (
    <footer style={footerWrapperStyle}>
      
      {/* 1. AUTHORIZED LOGGING PROTOCOL NOTICE (Slim Version) ✅ */}
      <div style={protocolBoxStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <FiShield style={{ color: '#1e3a8a', fontSize: '16px' }} />
            <h4 style={{ fontSize: isMobile ? '9px' : '10.5px', fontWeight: '900', color: '#1e3a8a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Authorized Logging Protocol
            </h4>
        </div>
        <p style={{ fontSize: isMobile ? '9px' : '10.5px', color: '#475569', fontWeight: '600', lineHeight: '1.4', margin: 0 }}>
            Compliance Notice: These logs are <span style={{ color: '#0f172a', fontWeight: '900', textDecoration: 'underline' }}>IMMUTABLE</span>. 
            Actions within <span style={{ color: '#2563eb', fontWeight: '800' }}>{selectedSbuId ? `Unit ID ${selectedSbuId}` : "the organization"}</span> are cryptographically recorded.
        </p>
      </div>

      {/* 2. BASELINE ISOLATION NOTICE (Slim Version) ✅ */}
      <div style={{ paddingLeft: '5px', textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
        <p style={statutoryTextStyle}>
          * Strategic Business Unit Isolation is enforced for administrative auditing and privacy *
        </p>
      </div>

    </footer>
  );
}