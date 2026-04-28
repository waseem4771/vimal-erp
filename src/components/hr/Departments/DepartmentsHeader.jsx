"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for HR/Departments ✅
import { FiBriefcase, FiActivity, FiRefreshCw } from 'react-icons/fi';

/**
 * Enterprise DepartmentsHeader - EXECUTIVE ELITE EDITION
 * Purpose: Unified header for organizational structure management.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout with precision alignment. ✅
 */
export default function DepartmentsHeader({ selectedSbuId, onRefresh, fetching }) {
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
    fontSize: isMobile ? '20px' : '26px', 
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

  const syncBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    border: 'none',
    borderBottom: '3px solid #e2e8f0',
    padding: isMobile ? '8px 14px' : '10px 20px',
    borderRadius: '0px', // Forced Sharp Edges ✅
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: fetching ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    width: isMobile ? '100%' : 'auto',
    justifyContent: 'center',
    opacity: fetching ? 0.6 : 1
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. LEFT SIDE: NAVIGATION & IDENTITY ✅ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px', textAlign: 'left' }}>
          <h2 style={titleStyle}>SBU Departments</h2>
          
          <div style={subLabelStyle}>
            {/* Dept Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiBriefcase style={{ color: '#2563eb', fontSize: isMobile ? '12px' : '14px' }} />
                <span>Unit Structure: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            {/* Sync Activity Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: isMobile ? '12px' : '14px' }} />
                <span style={{ color: '#10b981' }}>Live Organization Map</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: SYNC ACTION ✅ */}
      <div style={{ width: isMobile ? '100%' : 'auto' }}>
        <button
            onClick={onRefresh}
            disabled={fetching}
            style={syncBtnStyle}
            onMouseOver={(e) => { if(!fetching) e.currentTarget.style.borderBottomColor = '#cbd5e1'; }}
            onMouseOut={(e) => { if(!fetching) e.currentTarget.style.borderBottomColor = '#e2e8f0'; }}
        >
            <FiRefreshCw 
                style={{ width: '14px', height: '14px' }} 
                className={fetching ? "animate-spin" : ""}
            />
            {fetching ? "Syncing..." : "Sync Records"}
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

    </div>
  );
}