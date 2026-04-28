

"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Real Icons Import ✅
import { FiCpu, FiActivity, FiRefreshCw } from 'react-icons/fi';

/**
 * Enterprise InventoryHeader - EXECUTIVE ELITE EDITION
 * Fix: Removed dot icon, replaced with real relevant icons (FiCpu, FiActivity). ✅
 * Fix: 100% Sharp Edges (0px Radius) and High-priority Inline Styles. ✅
 * Mobile: Precision alignment for stacked layout. ✅
 */
export default function InventoryHeader({ selectedSbuId, onRefresh }) {
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
    gap: isMobile ? '15px' : '0px',
    width: '100%'
  };

  const titleStyle = {
    fontSize: isMobile ? '20px' : '30px',
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.03em',
    lineHeight: '1',
    margin: 0
  };

  const subLabelStyle = {
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '850',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '8px'
  };

  const syncBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    color: '#2563eb',
    border: '1px solid #e2e8f0',
    padding: isMobile ? '8px 14px' : '12px 22px',
    borderRadius: '0px', // Forced Sharp Edges ✅
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    width: isMobile ? '100%' : 'auto',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. LEFT SIDE: NAVIGATION & REAL IDENTITY ICONS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px' }}>
          <h1 style={titleStyle}>Inventory Hub</h1>
          
          <div style={subLabelStyle}>
            {/* Real Unit Identity Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiCpu style={{ color: '#2563eb', fontSize: isMobile ? '12px' : '14px' }} />
                <span>Unit Identity: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
            </div>
            
            {/* Separator Pipe */}
            <span style={{ color: '#e2e8f0' }}>|</span>

            {/* Real Live Assets Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: isMobile ? '12px' : '14px' }} />
                <span style={{ color: '#10b981' }}>Live Assets</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: SYSTEM ACTIONS */}
      <div style={{ width: isMobile ? '100%' : 'auto' }}>
        <button
            onClick={onRefresh}
            style={syncBtnStyle}
            onMouseOver={(e) => { 
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderColor = '#2563eb';
            }}
            onMouseOut={(e) => { 
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e2e8f0';
            }}
        >
            <FiRefreshCw 
                style={{ width: '15px', height: '15px' }} 
                className="group-hover:rotate-180 transition-all duration-500"
            />
            Sync Inventory
        </button>
      </div>

    </div>
  );
}