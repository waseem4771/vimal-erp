"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for AP Aging ✅
import { FiArrowUpRight, FiActivity, FiDownload, FiPrinter, FiRefreshCw } from 'react-icons/fi';

/**
 * Enterprise APHeader - EXECUTIVE ACTION-ROW EDITION (Real Icon Update)
 * Purpose: Unified header with title, context, actions, and sync status.
 * Fix: Replaced dot animation with FiActivity real-time icon. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout with precision alignment. ✅
 */
export default function APHeader({ selectedSbuId, onExport, onPrint, onRefresh, loading, hasData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const headerWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '20px' : '25px',
    marginBottom: '35px',
    width: '100%'
  };

  const titleRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '20px',
    gap: '15px'
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

  const actionGroupStyle = {
    display: 'flex',
    gap: '10px',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'space-between' : 'flex-end'
  };

  const statusBarStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    backgroundColor: '#ffffff',
    padding: isMobile ? '12px 15px' : '15px 25px',
    border: '1px solid #e2e8f0',
    borderRadius: '0px', 
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    gap: isMobile ? '15px' : '0px',
    width: '100%',
    boxSizing: 'border-box'
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
    borderBottom: `3px solid ${borderBottomColor}`,
    opacity: loading ? 0.6 : 1
  });

  return (
    <div style={headerWrapperStyle}>
      
      {/* 1. TOP TITLE & ACTION ROW ✅ */}
      <div style={titleRowStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <BackButton />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <h2 style={titleStyle}>AP Aging Analysis</h2>
            <div style={subLabelStyle}>
              <FiArrowUpRight style={{ color: '#f43f5e', fontSize: '14px' }} />
              <span>Unit {selectedSbuId}</span>
              <span style={{ color: '#e2e8f0' }}>|</span>
              <FiActivity className="animate-pulse" style={{ color: '#2563eb', fontSize: '14px' }} />
              <span style={{ color: '#2563eb' }}>Outstanding Ledger</span>
            </div>
          </div>
        </div>

        {/* Desktop Buttons Group */}
        {!isMobile && (
          <div style={actionGroupStyle}>
            <button onClick={onExport} disabled={loading || !hasData} style={baseBtnStyle('#ecfdf5', '#059669', '#10b981')}>
              <FiDownload size={14} /> Export Ledger
            </button>
            <button onClick={onPrint} disabled={loading || !hasData} style={baseBtnStyle('#0f172a', '#ffffff', '#334155')}>
              <FiPrinter size={14} /> Print PDF
            </button>
          </div>
        )}
      </div>

      {/* 2. DYNAMIC STATUS & SYNC BAR ✅ */}
      <div style={statusBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Real Real-time Activity Icon replaced the Dot ✅ */}
            <FiActivity className="animate-pulse" style={{ color: '#ef4444', fontSize: '18px' }} />
            <p style={{ fontSize: isMobile ? '9px' : '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Real-time Liability Synchronization Active for Unit {selectedSbuId}
            </p>
        </div>

        <button 
            onClick={onRefresh} 
            disabled={loading}
            style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                color: '#ef4444', 
                fontSize: isMobile ? '9px' : '11px', 
                fontWeight: '950', 
                textTransform: 'uppercase', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <FiRefreshCw className={loading ? "animate-spin" : ""} style={{ fontSize: '14px' }} />
            {loading ? "Syncing..." : "Refresh Payables"}
        </button>
      </div>

      {/* Mobile Buttons (Visible only on mobile) */}
      {isMobile && (
        <div style={{ ...actionGroupStyle, marginTop: '5px' }}>
          <button onClick={onExport} disabled={loading || !hasData} style={{ ...baseBtnStyle('#ecfdf5', '#059669', '#10b981'), flex: 1 }}>
            <FiDownload size={14} /> Export
          </button>
          <button onClick={onPrint} disabled={loading || !hasData} style={{ ...baseBtnStyle('#0f172a', '#ffffff', '#334155'), flex: 1 }}>
            <FiPrinter size={14} /> Print
          </button>
        </div>
      )}

      {/* VVIP ANIMATION INJECTION ✅ */}
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