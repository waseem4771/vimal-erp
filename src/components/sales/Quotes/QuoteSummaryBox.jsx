"use client";

import { FiSend } from 'react-icons/fi';

/**
 * Enterprise QuoteSummaryBox - EXECUTIVE DARK EDITION (Compact)
 * Fix: Reduced vertical padding for the main container on all screens. ✅
 * Fix: Reduced button size and padding specifically for mobile. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function QuoteSummaryBox({ quoteData, loading, selectedSbuId, isMobile }) {

  // --- Inline Style Constants ---
  const darkBoxStyle = {
    backgroundColor: '#0f172a', // Corporate Deep Slate
    // Vertical padding reduced: 12px on Mobile, 20px on Laptop ✅
    padding: isMobile ? '12px 15px' : '20px 40px',
    borderRadius: '0px', // Forced Sharp ✅
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: isMobile ? '15px' : '20px',
    marginTop: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #1e293b'
  };

  const amountLabelStyle = {
    fontSize: isMobile ? '8.5px' : '11px',
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '2px',
    display: 'block'
  };

  const grandTotalStyle = {
    fontSize: isMobile ? '24px' : '42px', // Slightly reduced font size ✅
    fontWeight: '950',
    color: '#10b981', 
    lineHeight: '1',
    margin: 0,
    letterSpacing: '-0.04em'
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#334155' : '#4f46e5',
    color: '#ffffff',
    // Button padding reduced: 8px vertical on Mobile, 15px on Laptop ✅
    padding: isMobile ? '8px 16px' : '15px 35px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '9px' : '12px', // Smaller font for mobile button ✅
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: isMobile ? '0.1em' : '0.2em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: isMobile ? '100%' : 'auto',
    whiteSpace: 'nowrap',
    lineHeight: '1',
    boxShadow: '0 4px 15px rgba(79, 70, 229, 0.2)'
  };

  return (
    <div style={{ width: '100%' }}>
      
      {/* 1. DARK SUMMARY CONTAINER (Slimmer version) */}
      <div style={darkBoxStyle}>
        
        {/* Left Side: Financial Summary */}
        <div style={{ textAlign: isMobile ? 'center' : 'left', width: isMobile ? '100%' : 'auto' }}>
          <span style={amountLabelStyle}>Net Proposal Value</span>
          <h2 style={grandTotalStyle}>
            ${quoteData.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <p style={{ fontSize: '8px', color: '#475569', fontWeight: '700', textTransform: 'uppercase', marginTop: '6px', letterSpacing: '0.05em' }}>
             * Synchronized with SBU {selectedSbuId} Price Books
          </p>
        </div>

        {/* Right Side: Action Trigger (Compact Button) */}
        <button 
          type="submit" 
          disabled={loading}
          style={submitBtnStyle}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#4338ca')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#4f46e5')}
        >
          <FiSend size={isMobile ? 12 : 16} />
          <span>{loading ? "AUTHENTICATING..." : "Generate Official Quotation"}</span>
        </button>

      </div>

      {/* 2. SYSTEM FOOTER: Strictly Left Aligned ✅ */}
      <div style={{ marginTop: '15px', textAlign: 'left', paddingLeft: '5px' }}>
         <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', fontStyle: 'italic', margin: 0 }}>
            Notice: Quotations are pro-forma and do not impact General Ledger or Inventory until converted.
         </p>
      </div>

    </div>
  );
}