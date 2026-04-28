"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for AR Aging ✅
import { FiArrowDownLeft, FiActivity, FiDownload, FiPrinter, FiRefreshCw } from 'react-icons/fi';

/**
 * Enterprise ARHeader - ACTION ROW EDITION
 * Laptop: Title at Top, All Buttons (Sync/Export/Print) in a separate line below. ✅
 * Mobile: Responsive stacking with Left/Right split for actions. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function ARHeader({ selectedSbuId, onExport, onPrint, onRefresh, loading, hasData }) {
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
    flexDirection: 'column', // Stacks rows vertically ✅
    gap: isMobile ? '20px' : '25px',
    marginBottom: '35px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '25px',
    width: '100%'
  };

  const topRowStyle = {
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

  const bottomActionRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // Sync (Left) | Export/Print (Right) ✅
    alignItems: 'center',
    width: '100%',
    gap: '10px'
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
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    border: 'none',
    borderBottom: `3px solid ${borderBottomColor}`, // Sharp bottom line ✅
    opacity: loading ? 0.6 : 1
  });

  return (
    <div style={containerStyle}>
      
      {/* 1. TOP ROW: NAVIGATION, TITLE & CONTEXT ✅ */}
      <div style={topRowStyle}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <h2 style={titleStyle}>AR Aging Analysis</h2>
          <div style={subLabelStyle}>
            <FiArrowDownLeft style={{ color: '#10b981', fontSize: '14px' }} />
            <span>Unit {selectedSbuId}</span>
            <span style={{ color: '#e2e8f0' }}>|</span>
            <FiActivity className="animate-pulse" style={{ color: '#2563eb', fontSize: '14px' }} />
            <span style={{ color: '#2563eb' }}>Receivables Ledger Live</span>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM ROW: ALL ACTION BUTTONS (Sync, Export, Print) ✅ */}
      <div style={bottomActionRowStyle}>
        
        {/* SYNC BUTTON - Locked to the Left */}
        <button
            onClick={onRefresh}
            disabled={loading}
            style={baseBtnStyle('#ffffff', '#0f172a', '#e2e8f0')}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.borderBottomColor = '#cbd5e1'; }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.borderBottomColor = '#e2e8f0'; }}
        >
            <FiRefreshCw 
                style={{ width: '13px', height: '13px' }} 
                className={loading ? "animate-spin" : ""}
            />
            {isMobile ? "Sync" : "Sync Debtors List"}
        </button>

        {/* EXPORT & PRINT GROUP - Locked to the Right */}
        <div style={{ display: 'flex', gap: '10px' }}>
            <button 
                onClick={onExport} 
                disabled={loading || !hasData}
                style={baseBtnStyle('#ecfdf5', '#059669', '#10b981')}
            >
                <FiDownload size={14} />
                {!isMobile && "Export Excel"}
            </button>

            <button 
                onClick={onPrint} 
                disabled={loading || !hasData}
                style={baseBtnStyle('#0f172a', '#ffffff', '#334155')}
            >
                <FiPrinter size={14} />
                {!isMobile && "Print PDF"}
            </button>
        </div>

      </div>

    </div>
  );
}