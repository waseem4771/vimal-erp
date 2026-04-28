"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for Balance Sheet ✅
import { FiBookOpen, FiActivity, FiDownload, FiPrinter } from 'react-icons/fi';

/**
 * Enterprise BSHeader - EXECUTIVE ELITE EDITION
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for reliable rendering. ✅
 * Mobile: Fully responsive stacked layout with precision alignment. ✅
 */
export default function BSHeader({ selectedSbuId, onExport, onPrint, loading, hasData }) {
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
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    marginBottom: '35px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '20px',
    gap: isMobile ? '20px' : '0px',
    width: '100%'
  };

  const titleStyle = {
    fontSize: isMobile ? '20px' : '26px', // Professional h2 scale
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
    gap: '8px'
  };

  const btnContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'space-between' : 'flex-end'
  };

  const baseBtnStyle = (bgColor, textColor, borderColor) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: bgColor,
    color: textColor,
    padding: isMobile ? '8px 12px' : '12px 22px',
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
    <div style={containerStyle}>
      
      {/* 1. LEFT SIDE: NAVIGATION & IDENTITY (Strictly Left Aligned) ✅ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px', textAlign: 'left' }}>
          <h2 style={titleStyle}>Balance Sheet</h2>
          
          <div style={subLabelStyle}>
            {/* Ledger Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiBookOpen style={{ color: '#2563eb', fontSize: isMobile ? '12px' : '14px' }} />
                <span>Unit: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            {/* Position Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: isMobile ? '12px' : '14px' }} />
                <span style={{ color: '#10b981' }}>Verified Position</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: ACTION BUTTONS (NANO-SIZED ON MOBILE) */}
      <div style={btnContainerStyle}>
        
        {/* EXCEL EXPORT */}
        <button 
          onClick={onExport} 
          disabled={loading || !hasData}
          style={baseBtnStyle('#ecfdf5', '#059669', '#d1fae5')}
          onMouseOver={(e) => { if(!loading && hasData) e.currentTarget.style.backgroundColor = '#d1fae5'; }}
          onMouseOut={(e) => { if(!loading && hasData) e.currentTarget.style.backgroundColor = '#ecfdf5'; }}
        >
          <FiDownload size={isMobile ? 12 : 15} />
          Export Excel
        </button>

        {/* PRINT PDF */}
        <button 
          onClick={onPrint} 
          disabled={loading || !hasData}
          style={baseBtnStyle('#0f172a', '#ffffff', '#0f172a')}
          onMouseOver={(e) => { if(!loading && hasData) e.currentTarget.style.backgroundColor = '#000000'; }}
          onMouseOut={(e) => { if(!loading && hasData) e.currentTarget.style.backgroundColor = '#0f172a'; }}
        >
          <FiPrinter size={isMobile ? 12 : 15} />
          Print PDF
        </button>
        
      </div>

    </div>
  );
}