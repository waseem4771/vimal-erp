"use client";

import { useState, useEffect } from 'react';
// Professional Security Icons ✅
import { FiShield, FiLock } from 'react-icons/fi';

/**
 * Enterprise ApiKeyFooter - EXECUTIVE SHARP EDITION
 * Purpose: Security protocol notice and B2B synchronization compliance footer.
 * Fix: Strictly Left-aligned text as per VVIP requirement. ✅
 * Fix: Reduced vertical padding for ultra-compact look on Mobile. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 */
export default function ApiKeyFooter({ selectedSbuId }) {
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
    gap: '20px'
  };

  const darkNoticeStyle = {
    backgroundColor: '#0f172a', // Corporate Dark Slate
    // Vertical padding reduced for slim look ✅
    padding: isMobile ? '12px 15px' : '15px 30px',
    borderRadius: '0px', 
    borderLeft: '5px solid #2563eb', // B2B Blue Accent
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    textAlign: 'left',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  };

  const iconBoxStyle = {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    padding: '6px', // Reduced to slim the box ✅
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
    lineHeight: '1.6',
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
                B2B Security Protocol Active
            </h4>
            <p style={{ fontSize: isMobile ? '8px' : '9px', color: '#64748b', fontWeight: '700', margin: '2px 0 0 0', lineHeight: '1.4' }}>
                Every marketplace synchronization event for <span style={{ color: '#60a5fa' }}>Unit {selectedSbuId}</span> is recorded 
                in the organizational audit trail for real-time ledger reconciliation.
            </p>
        </div>
      </div>

      {/* 2. BASELINE ISOLATION TEXT ✅ */}
      <div style={{ paddingLeft: '5px', textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
        <p style={statutoryTextStyle}>
          * Strategic Business Unit Isolation Protocol: Unauthorized API handshake attempts are cryptographically flagged *
        </p>
      </div>

    </footer>
  );
}