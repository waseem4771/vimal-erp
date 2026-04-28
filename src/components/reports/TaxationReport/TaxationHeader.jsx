"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for Taxation ✅
import { FiPercent, FiActivity, FiDownload, FiPrinter } from 'react-icons/fi';

/**
 * Enterprise TaxationHeader - EXECUTIVE ACTION-ROW EDITION
 * Purpose: Unified header for Tax Audit report with split-row actions.
 * Fix: Shifted Export/Print buttons to a separate dedicated line. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive vertical stacking. ✅
 */
export default function TaxationHeader({ selectedSbuId, onExport, onPrint, loading, hasData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '20px' : '25px',
    marginBottom: '35px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '25px',
    width: '100%'
  };

  const titleRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '15px',
    width: '100%'
  };

  const titleStyle = {
    fontSize: isMobile ? '18px' : '26px', 
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: '1.2',
    margin: 0
  };

  const subLabelStyle = {
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '850',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '8px',
    textAlign: 'left'
  };

  const actionRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: isMobile ? 'flex-start' : 'flex-end',
    alignItems: 'center',
    gap: '10px',
    width: '100%'
  };

  const baseBtnStyle = (bgColor, textColor, borderBottomColor) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: bgColor,
    color: textColor,
    padding: isMobile ? '8px 12px' : '10px 20px',
    borderRadius: '0px', 
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: loading || !hasData ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    border: 'none',
    borderBottom: `3px solid ${borderBottomColor}`,
    opacity: loading || !hasData ? 0.6 : 1
  });

  return (
    <div style={containerStyle}>
      
      {/* 1. TOP ROW: NAVIGATION, TITLE & IDENTITY ✅ */}
      <div style={titleRowStyle}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <h2 style={titleStyle}>Taxation & Audit</h2>
          
          <div style={subLabelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiPercent style={{ color: '#2563eb', fontSize: isMobile ? '12px' : '14px' }} />
                <span>Unit: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: isMobile ? '12px' : '14px' }} />
                <span style={{ color: '#10b981' }}>Live Compliance Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM ROW: DEDICATED ACTION BUTTONS ✅ */}
      <div style={actionRowStyle}>
        
        {/* EXCEL EXPORT */}
        <button 
          onClick={onExport} 
          disabled={loading || !hasData}
          style={baseBtnStyle('#ecfdf5', '#059669', '#10b981')}
          onMouseOver={(e) => { if(!loading && hasData) e.currentTarget.style.backgroundColor = '#d1fae5'; }}
          onMouseOut={(e) => { if(!loading && hasData) e.currentTarget.style.backgroundColor = '#ecfdf5'; }}
        >
          <FiDownload size={isMobile ? 12 : 15} />
          {isMobile ? "Excel" : "Export Ledger"}
        </button>

        {/* PRINT PDF */}
        <button 
          onClick={onPrint} 
          disabled={loading || !hasData}
          style={baseBtnStyle('#ffffff', '#0f172a', '#e2e8f0')}
          onMouseOver={(e) => { if(!loading && hasData) e.currentTarget.style.borderBottomColor = '#cbd5e1'; }}
          onMouseOut={(e) => { if(!loading && hasData) e.currentTarget.style.borderBottomColor = '#e2e8f0'; }}
        >
          <FiPrinter size={isMobile ? 12 : 15} />
          {isMobile ? "Print" : "Print PDF"}
        </button>
        
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}} />

    </div>
  );
}