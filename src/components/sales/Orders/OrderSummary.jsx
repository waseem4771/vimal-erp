"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiCheckSquare } from 'react-icons/fi';

/**
 * Enterprise OrderSummary - EXECUTIVE DARK EDITION (Ultra-Compact)
 * Fix: Reduced vertical padding for the main dark container. ✅
 * Fix: Slimmed down the action button for laptop and significantly for mobile. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function OrderSummary({ orderData, loading, selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const darkBoxStyle = {
    backgroundColor: '#0f172a', 
    // Vertical padding significantly reduced ✅
    padding: isMobile ? '10px 15px' : '20px 40px',
    borderRadius: '0px', 
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    marginTop: '25px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #1e293b'
  };

  const amountLabelStyle = {
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '2px',
    display: 'block'
  };

  const grandTotalStyle = {
    // Font size reduced for a cleaner look ✅
    fontSize: isMobile ? '24px' : '42px',
    fontWeight: '950',
    color: '#10b981', 
    lineHeight: '1',
    margin: 0,
    letterSpacing: '-0.04em'
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#334155' : '#2563eb',
    color: '#ffffff',
    // Button padding significantly reduced for both screens ✅
    padding: isMobile ? '7px 16px' : '12px 35px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '8.5px' : '11px', // Nano font for mobile ✅
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
    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)'
  };

  return (
    <div style={{ width: '100%' }}>
      
      {/* 1. DARK SUMMARY CONTAINER (Compact Version) */}
      <div style={darkBoxStyle}>
        
        {/* Left Side: Financial Summary */}
        <div style={{ textAlign: isMobile ? 'center' : 'left', width: isMobile ? '100%' : 'auto' }}>
          <span style={amountLabelStyle}>Net Total Payable</span>
          <h2 style={grandTotalStyle}>
            ${orderData.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <p style={{ fontSize: '8px', color: '#475569', fontWeight: '700', textTransform: 'uppercase', marginTop: '6px', letterSpacing: '0.05em' }}>
             * Verified against Unit {selectedSbuId} Price Books
          </p>
        </div>

        {/* Right Side: Action Trigger (Smaller & Slimmer) */}
        <button 
          type="submit" 
          disabled={loading}
          style={submitBtnStyle}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
        >
          <FiCheckSquare size={isMobile ? 12 : 16} />
          <span>{loading ? "AUTHENTICATING..." : "Confirm Final Sale & Update Ledger"}</span>
        </button>

      </div>

      {/* 2. SYSTEM FOOTER: Strictly Left Aligned ✅ */}
      <div style={{ marginTop: '15px', textAlign: 'left', paddingLeft: '5px' }}>
         <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', fontStyle: 'italic', margin: 0 }}>
            * Audit Trail: This transaction will be recorded for Unit {selectedSbuId} financial reporting. *
         </p>
      </div>

    </div>
  );
}