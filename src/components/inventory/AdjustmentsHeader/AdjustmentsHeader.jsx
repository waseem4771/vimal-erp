

"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Real Icons Import ✅
import { FiDatabase, FiActivity, FiRefreshCw } from 'react-icons/fi';

/**
 * Enterprise AdjustmentsHeader - EXECUTIVE ELITE EDITION
 * Fix: Changed heading to h2 for better visual hierarchy. ✅
 * Fix: Adjusted font sizes for a more professional compact look. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 * Mobile: Precision alignment for stacked layout. ✅
 */
export default function AdjustmentsHeader({ selectedSbuId, onRefresh }) {
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

  const titleSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  const titleStyle = {
    // h2 scale: Mobile 18px, Laptop 26px (Slightly reduced for elegance) ✅
    fontSize: isMobile ? '18px' : '26px', 
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: '1.2',
    margin: 0
  };

  const subLabelStyle = {
    fontSize: isMobile ? '8px' : '9.5px',
    fontWeight: '850',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const syncBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    color: '#2563eb',
    border: '1px solid #e2e8f0',
    padding: isMobile ? '8px 14px' : '10px 20px',
    borderRadius: '0px', // Forced Sharp Edges ✅
    fontSize: isMobile ? '8px' : '9px',
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
      <div style={titleSectionStyle}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px' }}>
          
          {/* Main Heading changed to h2 ✅ */}
          <h2 style={titleStyle}>Inventory Adjustments</h2>
          
          <div style={subLabelStyle}>
            {/* Real Database Icon for Context */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiDatabase style={{ color: '#2563eb', fontSize: isMobile ? '11px' : '13px' }} />
                <span>Unit Identity: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            {/* Real Tracking Icon for Waste */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#f43f5e', fontSize: isMobile ? '11px' : '13px' }} />
                <span style={{ color: '#f43f5e' }}>Waste Tracking</span>
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
                style={{ width: '14px', height: '14px' }} 
                className="group-hover:rotate-180 transition-all duration-500"
            />
            Sync Unit Data
        </button>
      </div>

    </div>
  );
}