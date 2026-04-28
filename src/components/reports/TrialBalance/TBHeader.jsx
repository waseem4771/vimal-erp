"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons ✅
import { FiClipboard, FiActivity, FiDownload, FiPrinter, FiRefreshCw } from 'react-icons/fi';

/**
 * Enterprise TBHeader - EXECUTIVE ELITE EDITION (Fixed)
 * Fix: Removed dot icon, replaced with FiActivity. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout. ✅
 */
export default function TBHeader({ selectedSbuId, onExport, onPrint, onRefresh, loading, hasData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '35px',
    width: '100%'
  };

  const topRowStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '20px',
    gap: isMobile ? '15px' : '0px',
    width: '100%'
  };

  const statusBarStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    backgroundColor: '#ffffff',
    padding: isMobile ? '12px 15px' : '12px 25px',
    border: '1px solid #e2e8f0',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    gap: isMobile ? '10px' : '0px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const baseBtnStyle = (bgColor, textColor, borderColor) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: bgColor,
    color: textColor,
    padding: isMobile ? '8px 12px' : '10px 20px',
    borderRadius: '0px', // Forced Sharp Edges ✅
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: loading || !hasData ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    border: `1px solid ${borderColor}`,
    opacity: loading || !hasData ? 0.5 : 1
  });

  return (
    <div style={mainContainerStyle}>
      
      {/* 1. TOP SECTION: TITLE & ACTIONS */}
      <div style={topRowStyle}>
        
        {/* Left: Nav & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <BackButton />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <h2 style={{ fontSize: isMobile ? '18px' : '26px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>
                Trial Balance
            </h2>
            <div style={{ fontSize: isMobile ? '8.5px' : '10px', fontWeight: '850', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiClipboard style={{ color: '#2563eb' }} />
                <span>Unit: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
                <span style={{ color: '#e2e8f0' }}>|</span>
                <span>Integrity Audit</span>
            </div>
          </div>
        </div>

        {/* Right: Export/Print */}
        <div style={{ display: 'flex', gap: '10px', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
          <button onClick={onExport} disabled={loading || !hasData} style={baseBtnStyle('#ecfdf5', '#059669', '#d1fae5')}>
            <FiDownload size={14} /> Export Ledger
          </button>
          <button onClick={onPrint} disabled={loading || !hasData} style={baseBtnStyle('#0f172a', '#ffffff', '#0f172a')}>
            <FiPrinter size={14} /> Print PDF
          </button>
        </div>
      </div>

      {/* 2. INTEGRITY MONITORING STATUS BAR ✅ */}
      <div style={statusBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Dot removed, replaced with FiActivity icon ✅ */}
            <FiActivity style={{ color: '#2563eb', fontSize: '16px' }} />
            <p style={{ fontSize: isMobile ? '9px' : '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Real-time Double-Entry Synchronization Active for Unit {selectedSbuId}
            </p>
        </div>

        {/* Re-Sync Action */}
        <button 
            onClick={onRefresh} 
            disabled={loading}
            style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                color: '#2563eb', 
                fontSize: isMobile ? '9px' : '10px', 
                fontWeight: '950', 
                textTransform: 'uppercase', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }}
        >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            Re-Sync Balances
        </button>
      </div>

    </div>
  );
}