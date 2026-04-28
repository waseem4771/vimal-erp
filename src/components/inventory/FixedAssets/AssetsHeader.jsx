

"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
import { FiActivity, FiDownload, FiPrinter, FiCheckSquare } from 'react-icons/fi';

/**
 * Enterprise AssetsHeader - EXECUTIVE ELITE EDITION
 * Fix: Added "Authorize Depreciation" trigger for financial ledger sync. ✅
 * Fix: 100% Inline Styles & All corners made sharp (0px radius). ✅
 * Mobile: Fully responsive layout with optimized button grouping. ✅
 */
export default function AssetsHeader({ selectedSbuId, onExport, onPrint, onPostDepreciation }) {
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
    marginBottom: '30px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '20px',
    gap: isMobile ? '20px' : '0px',
    width: '100%'
  };

  const titleStyle = {
    fontSize: isMobile ? '20px' : '28px',
    fontWeight: '900',
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    margin: 0
  };

  const subLabelStyle = {
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontStyle: 'italic',
    marginTop: '4px'
  };

  const btnContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: isMobile ? 'wrap' : 'nowrap',
    gap: '8px',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'flex-start' : 'flex-end'
  };

  const baseBtnStyle = (bgColor, textColor, borderColor) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: bgColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    padding: isMobile ? '8px 12px' : '10px 18px',
    borderRadius: '0px', // Forced Sharp Edges ✅
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap'
  });

  return (
    <div style={containerStyle}>
      
      {/* 1. LEFT SIDE: NAVIGATION & IDENTITY */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <h1 style={titleStyle}>Assets Registry</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiActivity style={{ color: '#2563eb', fontSize: isMobile ? '12px' : '14px' }} />
              <p style={subLabelStyle}>
                Unit Identity: <span style={{ color: '#2563eb' }}>ID {selectedSbuId}</span>
              </p>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: ACTION BUTTONS (Included Depreciation POST) */}
      <div style={btnContainerStyle}>
        
        {/* AUTHORIZE DEPRECIATION (Accounting Link ✅) */}
        <button 
          onClick={onPostDepreciation} 
          style={baseBtnStyle('#eff6ff', '#2563eb', '#dbeafe')}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; e.currentTarget.style.color = '#ffffff'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#eff6ff'; e.currentTarget.style.color = '#2563eb'; }}
        >
          <FiCheckSquare size={isMobile ? 12 : 15} />
          Post Depreciation
        </button>
        
        {/* EXCEL EXPORT */}
        <button 
          onClick={onExport} 
          style={baseBtnStyle('#ecfdf5', '#059669', '#d1fae5')}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#059669'; e.currentTarget.style.color = '#ffffff'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ecfdf5'; e.currentTarget.style.color = '#059669'; }}
        >
          <FiDownload size={isMobile ? 12 : 15} />
          {!isMobile && "Export Excel"}
        </button>

        {/* PRINT PDF */}
        <button 
          onClick={onPrint} 
          style={baseBtnStyle('#0f172a', '#ffffff', '#0f172a')}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#000000'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0f172a'; }}
        >
          <FiPrinter size={isMobile ? 12 : 15} />
          {!isMobile && "Print PDF"}
        </button>
        
      </div>

    </div>
  );
}