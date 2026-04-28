"use client";

import { useState, useEffect } from 'react';
// Professional Info Icon ✅
import { FiInfo, FiHash } from 'react-icons/fi';

/**
 * Enterprise ReconAccountSelector - EXECUTIVE CONTROL CENTER
 * Purpose: Ledger account identification and audit guidance.
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 * Layout: Strictly Left-aligned for professional consistency. ✅
 * Mobile: Fully responsive stacked layout. ✅
 */
export default function ReconAccountSelector({ accountId, setAccountId, selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const mainBoxStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '25px 30px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '30px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  const inputStyle = {
    width: isMobile ? '100%' : '120px',
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    fontWeight: '900',
    color: '#2563eb', // Highlighted ID color
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box',
    textAlign: 'center'
  };

  const infoBoxStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    backgroundColor: '#eff6ff', // Light Blue Tint
    padding: '12px 15px',
    border: '1px solid #dbeafe',
    borderRadius: '0px'
  };

  return (
    <div style={mainBoxStyle}>
      <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          gap: '20px',
          width: '100%'
      }}>
        
        {/* 1. LEDGER ID INPUT SECTION */}
        <div style={{ textAlign: 'left', minWidth: isMobile ? '100%' : '200px' }}>
          <label style={labelStyle}>
            <FiHash /> Target Ledger Account ID
          </label>
          <input 
            type="number" 
            value={accountId} 
            onChange={(e) => setAccountId(e.target.value)}
            style={inputStyle}
            placeholder="ID"
          />
        </div>

        {/* 2. AUDIT GUIDANCE NOTICE (VVIP Left Aligned) ✅ */}
        <div style={infoBoxStyle}>
            <FiInfo style={{ color: '#3b82f6', fontSize: '18px', marginTop: '2px', flexShrink: 0 }} />
            <p style={{ 
                fontSize: isMobile ? '9px' : '11px', 
                color: '#1e40af', 
                fontWeight: '700', 
                lineHeight: '1.5', 
                margin: 0,
                textAlign: 'left' // strictly Left ✅
            }}>
                Operational Note: Please verify that you are matching system entries against the 
                official physical bank statement for <span style={{ textDecoration: 'underline', fontWeight: '900' }}>Unit {selectedSbuId}</span>. 
                Incorrect matching will affect the reconciliation accuracy.
            </p>
        </div>

      </div>
    </div>
  );
}