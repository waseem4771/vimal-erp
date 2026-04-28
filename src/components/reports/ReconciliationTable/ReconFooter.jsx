"use client";

import { useState, useEffect } from 'react';
// Professional Icon for Security context ✅
import { FiShield } from 'react-icons/fi';

/**
 * Enterprise ReconFooter - EXECUTIVE SLIM EDITION
 * Fix: Reduced vertical padding for ultra-compact height (Laptop & Mobile). ✅
 * Fix: Tightened internal gaps to minimize vertical footprint. ✅
 * Style: 100% Sharp (0px Radius), Strictly Left-aligned. ✅
 */
export default function ReconFooter({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const footerStyle = {
    marginTop: '40px', // Reduced from 60px ✅
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px' // Reduced gap ✅
  };

  const darkNoticeStyle = {
    backgroundColor: '#0f172a', // Corporate Dark Slate
    // Vertical padding significantly reduced: 8px Mobile / 10px Laptop ✅
    padding: isMobile ? '8px 15px' : '10px 30px',
    borderRadius: '0px', 
    borderLeft: '5px solid #10b981', 
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
      
      {/* 1. DARK SECURITY PROTOCOL BANNER (Compact Version) ✅ */}
      <div style={darkNoticeStyle}>
        <FiShield style={{ color: '#10b981', fontSize: isMobile ? '18px' : '22px', flexShrink: 0 }} />
        <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: isMobile ? '9px' : '10.5px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Verified Ledger Protocol Active
            </h4>
            <p style={{ fontSize: isMobile ? '8.5px' : '9.5px', color: '#64748b', fontWeight: '700', margin: '2px 0 0 0', lineHeight: '1.3' }}>
                Reconciliation locks the financial transaction record for <span style={{ color: '#10b981' }}>Unit {selectedSbuId}</span> for external audit purposes.
            </p>
        </div>
      </div>

      {/* 2. BASELINE COMPLIANCE TEXT (Tightened spacing) ✅ */}
      <div style={{ paddingLeft: '5px', textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
        <p style={statutoryTextStyle}>
          * Strategic Business Unit Isolation Notice: Ledger matching actions are immutable and 100% synchronized with the organization-wide audit trail *
        </p>
      </div>

    </footer>
  );
}