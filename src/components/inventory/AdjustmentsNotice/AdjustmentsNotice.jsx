"use client";

import { useState, useEffect } from 'react';
import { FiShield } from 'react-icons/fi';

/**
 * Enterprise AdjustmentsNotice - EXECUTIVE SHARP EDITION
 * Fix: Reduced vertical padding (Slimmer design). ✅
 * Fix: Forced 0px Border Radius on all sides. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Layout: 100% Left-aligned for professional consistency. ✅
 */
export default function AdjustmentsNotice({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    // Vertical padding reduced to make it slim ✅
    padding: isMobile ? '15px' : '20px 35px',
    border: '1px solid #f1f5f9',
    borderLeft: '8px solid #f97316', // Bold Orange Security Accent
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  const headerBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const iconStyle = {
    backgroundColor: '#fff7ed',
    color: '#ea580c',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0px',
    border: '1px solid #ffedd5'
  };

  const titleStyle = {
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '950',
    color: '#7c2d12',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    margin: 0
  };

  const bodyTextStyle = {
    fontSize: isMobile ? '9.5px' : '11px',
    color: '#475569',
    fontWeight: '600',
    lineHeight: '1.6',
    fontStyle: 'italic',
    margin: 0
  };

  return (
    <div style={containerStyle}>
        
        {/* 1. SECTION HEADER (Left Aligned) ✅ */}
        <div style={headerBoxStyle}>
            <div style={iconStyle}>
                <FiShield size={isMobile ? 18 : 22} />
            </div>
            <h4 style={titleStyle}>
                Security Enforcement Protocol
            </h4>
        </div>

        {/* 2. POLICY CONTENT (Left Aligned) ✅ */}
        <p style={bodyTextStyle}>
            Attention: Stock adjustments are categorized as critical financial modifications and permanently impact 
            the valuation of <span style={{ color: '#ea580c', fontWeight: '900', textDecoration: 'underline' }}>Unit ID {selectedSbuId}</span>. 
            All inventory deductions are cryptographically linked to your system identity and IP address within 
            the global audit trail for reconciliation and loss prevention purposes.
        </p>

    </div>
  );
}