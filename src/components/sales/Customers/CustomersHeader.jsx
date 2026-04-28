"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Real Professional Icons ✅
import { FiUsers, FiActivity, FiRefreshCw } from 'react-icons/fi';

/**
 * Enterprise CustomersHeader - EXECUTIVE ELITE EDITION
 * Fix: Changed heading to h2 for better visual hierarchy and reduced size. ✅
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for reliable rendering. ✅
 * Mobile: Fully responsive stacked layout with precision alignment. ✅
 */
export default function CustomersHeader({ selectedSbuId, onRefresh }) {
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
      
      {/* 1. LEFT SIDE: NAVIGATION & IDENTITY */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px' }}>
          
          {/* Main Heading changed to h2 and size reduced ✅ */}
          <h2 style={titleStyle}>Entity Registry</h2>
          
          <div style={subLabelStyle}>
            {/* Real Customers Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiUsers style={{ color: '#2563eb', fontSize: isMobile ? '11px' : '13px' }} />
                <span>Unit: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            {/* Real Sync Status Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: isMobile ? '11px' : '13px' }} />
                <span style={{ color: '#10b981' }}>Live Database</span>
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
            Reload Records
        </button>
      </div>

    </div>
  );
}