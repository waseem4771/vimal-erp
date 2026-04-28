"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for Capital Management ✅
import { FiBriefcase, FiActivity, FiRefreshCw, FiShield } from 'react-icons/fi';

/**
 * Enterprise FundHeader - EXECUTIVE ELITE EDITION (FIXED MOBILE)
 * Purpose: Unified header for inter-company fund allocations and profit sharing.
 * Fix: Sync button forced to Right-align on mobile screens. ✅
 * Fix: Button size reduced for a slimmer professional look. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function FundHeader({ selectedSbuId, onRefresh, loading }) {
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
    gap: isMobile ? '15px' : '0px',
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

  const syncBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#0f172a', // Executive Dark
    color: '#ffffff',
    border: 'none',
    // Mobile horizontal padding reduced for slim look ✅
    padding: isMobile ? '8px 12px' : '11px 22px', 
    borderRadius: '0px', 
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    whiteSpace: 'nowrap',
    opacity: loading ? 0.6 : 1
  };

  return (
    <header style={containerStyle}>
      
      {/* 1. LEFT SIDE: NAVIGATION & IDENTITY ✅ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px', textAlign: 'left' }}>
          <h2 style={titleStyle}>Capital Management</h2>
          
          <div style={subLabelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiBriefcase style={{ color: '#2563eb', fontSize: '13px' }} />
                <span>Unit: <span style={{ color: '#2563eb', fontWeight: '950' }}>{selectedSbuId || "Mother"}</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: '13px' }} />
                <span style={{ color: '#10b981' }}>Live Fund Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: SYNC ACTION (Forced Right-align on Mobile) ✅ */}
      <div style={{ 
          width: isMobile ? '100%' : 'auto', 
          display: 'flex', 
          justifyContent: isMobile ? 'flex-end' : 'center',
          marginTop: isMobile ? '5px' : '0px'
      }}>
        <button
            onClick={onRefresh}
            disabled={loading}
            style={syncBtnStyle}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#2563eb'; }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#0f172a'; }}
        >
            <FiRefreshCw 
                style={{ width: '13px', height: '13px' }} 
                className={loading ? "animate-spin" : ""}
            />
            {isMobile ? "Sync" : "Refresh Ledger"}
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