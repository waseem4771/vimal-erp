"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for Traffic Analytics ✅
import { FiActivity, FiDownload, FiRefreshCw, FiShield } from 'react-icons/fi';

/**
 * Enterprise ApiLogHeader - EXECUTIVE ELITE EDITION
 * Purpose: Unified header for monitoring inbound API traffic and security logging.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout with precision alignment for action buttons. ✅
 */
export default function ApiLogHeader({ selectedSbuId, onExport, onRefresh, fetching, hasData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
    width: '100%',
    boxSizing: 'border-box'
  };

  const titleStyle = {
    fontSize: isMobile ? '20px' : '28px', 
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
    flexWrap: 'wrap',
    gap: '6px',
    textAlign: 'left'
  };

  const btnContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'flex-end' : 'flex-end'
  };

  const baseBtnStyle = (bgColor, textColor, borderBottomColor) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: bgColor,
    color: textColor,
    border: 'none',
    borderBottom: `3px solid ${borderBottomColor}`,
    padding: isMobile ? '8px 12px' : '10px 20px',
    borderRadius: '0px', 
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: fetching ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    opacity: 1
  });

  return (
    <header style={containerStyle}>
      
      {/* 1. LEFT SIDE: NAVIGATION & IDENTITY ✅ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px', textAlign: 'left' }}>
          <h2 style={titleStyle}>API Traffic Logs</h2>
          
          <div style={subLabelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiShield style={{ color: '#2563eb', fontSize: '13px' }} />
                <span>Monitoring: <span style={{ color: '#2563eb', fontWeight: '950' }}>Unit {selectedSbuId}</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: '13px' }} />
                <span style={{ color: '#10b981' }}>Secure Request Audit Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: ACTION BUTTONS ✅ */}
      <div style={btnContainerStyle}>
        
        {/* EXCEL EXPORT ACTION */}
        <button 
          onClick={onExport} 
          disabled={fetching || !hasData}
          style={{
              ...baseBtnStyle('#ecfdf5', '#059669', '#10b981'),
              opacity: (fetching || !hasData) ? 0.5 : 1
          }}
          onMouseOver={(e) => { if(!fetching && hasData) e.currentTarget.style.borderBottomColor = '#059669'; }}
          onMouseOut={(e) => { if(!fetching && hasData) e.currentTarget.style.borderBottomColor = '#10b981'; }}
        >
          <FiDownload size={15} />
          {isMobile ? "Export" : "Export Audit Log"}
        </button>

        {/* RE-SYNC ACTION */}
        <button
            onClick={onRefresh}
            disabled={fetching}
            style={baseBtnStyle('#ffffff', '#0f172a', '#e2e8f0')}
            onMouseOver={(e) => { if(!fetching) e.currentTarget.style.borderBottomColor = '#2563eb'; }}
            onMouseOut={(e) => { if(!fetching) e.currentTarget.style.borderBottomColor = '#e2e8f0'; }}
        >
            <FiRefreshCw 
                style={{ width: '13px', height: '13px' }} 
                className={fetching ? "animate-spin" : ""}
            />
            {isMobile ? "Sync" : "Sync Logs"}
        </button>
      </div>

      {/* VVIP ANIMATION INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />

    </header>
  );
}