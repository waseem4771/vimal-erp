"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import BackButton from '@/components/layout/BackButton/BackButton';
import { FiFileText, FiActivity, FiRefreshCw, FiPlus, FiEdit3 } from 'react-icons/fi';

/**
 * Enterprise QuotesHeader - SMART MULTI-PAGE EDITION (V2)
 * Logic: Hides only "New Quotation" button on the create page. ✅
 * Logic: Keeps "Sync" button visible but it will only work if onRefresh is passed. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function QuotesHeader({ selectedSbuId, onRefresh }) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname(); 
  const isCreatePage = pathname === '/sales/quotes/create';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
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
    gap: '8px'
  };

  const bottomButtonsRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    // Agar create page hai to button aik hi hoga isliye end par rakhenge, warna split ✅
    justifyContent: isCreatePage ? 'flex-end' : 'space-between',
    alignItems: 'center',
    width: '100%'
  };

  const getBtnStyle = (bgColor, textColor, borderBottomColor) => ({
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
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    border: 'none',
    borderBottom: `3px solid ${borderBottomColor}`
  });

  return (
    <div style={containerStyle}>
      
      {/* 1. TOP ROW: NAVIGATION, TITLE & CONTEXT */}
      <div style={topRowStyle}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={titleStyle}>
            {isCreatePage ? "Draft New Quotation" : "Sales Quotations"}
          </h2>
          <div style={subLabelStyle}>
            {isCreatePage ? <FiEdit3 style={{ color: '#4f46e5', fontSize: '14px' }} /> : <FiFileText style={{ color: '#4f46e5', fontSize: '14px' }} />}
            <span>Unit {selectedSbuId}</span>
            <span style={{ color: '#e2e8f0' }}>|</span>
            <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: '14px' }} />
            <span style={{ color: '#10b981' }}>{isCreatePage ? "Generation Active" : "Live Ledger"}</span>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM ROW: Action Buttons */}
      <div style={bottomButtonsRowStyle}>
        
        {/* NEW QUOTATION BUTTON - Hidden on Create Page ✅ */}
        {!isCreatePage && (
          <Link 
            href="/sales/quotes/create" 
            style={getBtnStyle('#4f46e5', '#ffffff', '#312e81')}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
          >
            <FiPlus size={14} />
            New Quotation
          </Link>
        )}

        {/* SYNC BUTTON - Hamesha nazar aayega (Right side par) ✅ */}
        <button
            onClick={onRefresh}
            style={getBtnStyle('#ffffff', '#4f46e5', '#e2e8f0')}
            onMouseOver={(e) => { 
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderBottomColor = '#cbd5e1';
            }}
            onMouseOut={(e) => { 
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderBottomColor = '#e2e8f0';
            }}
        >
            <FiRefreshCw 
                style={{ width: '14px', height: '14px' }} 
                className="group-hover:rotate-180 transition-all duration-500"
            />
            {!isMobile && "Sync Proposals"}
        </button>

      </div>

    </div>
  );
}