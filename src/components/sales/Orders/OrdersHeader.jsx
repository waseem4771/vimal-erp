"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons ✅
import { FiRefreshCw, FiActivity } from 'react-icons/fi';

/**
 * Enterprise OrdersHeader - EXECUTIVE ELITE EDITION
 * Fix: Character-by-character laptop precision with 100% sharp edges. ✅
 * Fix: High-priority Inline Styles for reliable hover and layout. ✅
 * Mobile: Fully responsive stacked layout (Precision Aligned). ✅
 */
export default function OrdersHeader({ selectedSbuId, onRefresh }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    paddingBottom: '25px',
    gap: isMobile ? '20px' : '0px',
    width: '100%'
  };

  const titleStyle = {
    fontSize: isMobile ? '18px' : '26px', // Professional h2 scale
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.03em',
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
    gap: '8px',
    textAlign: 'left'
  };

  // --- Premium Sync Button Styling ---
  const syncBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    // Hover State Logic: White -> Blackish ✅
    backgroundColor: isHovered ? '#0f172a' : '#ffffff',
    color: isHovered ? '#ffffff' : '#475569',
    border: isHovered ? '1px solid #0f172a' : '1px solid #e2e8f0',
    padding: isMobile ? '8px 14px' : '12px 22px',
    borderRadius: '0px', // Forced Sharp ✅
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    // Hover Shadow: Blue-100/50 glow effect ✅
    boxShadow: isHovered ? '0 10px 20px rgba(219, 234, 254, 0.5)' : '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    width: isMobile ? '100%' : 'auto'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. LEFT SIDE: NAVIGATION & IDENTITY (VVIP Left Aligned) ✅ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px' }}>
          <h2 style={titleStyle}>Revenue Ledger</h2>
          
          <div style={subLabelStyle}>
            <FiActivity className="animate-pulse" style={{ color: '#2563eb', fontSize: '14px' }} />
            <span>Strategic History: <span style={{ color: '#2563eb', fontWeight: '950' }}>Unit {selectedSbuId}</span></span>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: PREMIUM SYNC ACTION */}
      <div style={{ width: isMobile ? '100%' : 'auto' }}>
        <button
            onClick={onRefresh}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={syncBtnStyle}
        >
            <FiRefreshCw 
                style={{ 
                    width: '14px', 
                    height: '14px', 
                    color: isHovered ? '#ffffff' : '#2563eb',
                    transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'all 0.5s ease'
                }} 
            />
            Sync Ledger
        </button>
      </div>

    </div>
  );
}