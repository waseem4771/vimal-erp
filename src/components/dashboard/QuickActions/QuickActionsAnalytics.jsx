"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FiPieChart, FiColumns, FiActivity, 
  FiClipboard, FiShield, FiArrowDownRight, 
  FiArrowUpRight, FiPercent, FiBarChart2 
} from 'react-icons/fi';

/**
 * QuickActionsAnalytics Component - Part 2
 * Fix: Standardized compact height for all buttons. ✅
 * Fix: Hover-nudge effect enabled. ✅
 * Fix: Forced single-line text (no wrapping) on mobile. ✅
 * Reliability: 100% Inline Styles. ✅
 */
export default function QuickActionsAnalytics({ canView }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Styling Logic ---
  const gridStyle = {
    display: 'grid',
    // Mobile par 2 columns, Laptop par flex-wrap behavior
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(170px, 1fr))',
    gap: isMobile ? '8px' : '12px',
    width: '100%',
    marginBottom: '25px'
  };

  const btnStyle = (color) => ({
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    // Reduced padding for uniform compact height ✅
    padding: isMobile ? '10px 8px' : '12px 15px', 
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: isMobile ? '9.5px' : '11px',
    color: '#ffffff',
    textTransform: 'uppercase',
    textDecoration: 'none',
    letterSpacing: '0.03em',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    // Preventing buttons from becoming thick due to long text ✅
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  });

  const labelStyle = {
    fontSize: '10px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '12px',
    textAlign: 'left',
    paddingLeft: '5px'
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Section Header - Left Aligned */}
      <p style={labelStyle}>Analytics & Intelligence Suite</p>

      {/* Responsive Grid Container */}
      <div style={gridStyle}>
        
        {/* Each button has the qa-btn-transition class for the hover effect ✅ */}
        
        <Link href="/report/profit-loss" className="qa-btn-transition" style={btnStyle('#10b981')}>
          <FiPieChart size={16} /> Analyze P&L
        </Link>

        <Link href="/report/balance-sheet" className="qa-btn-transition" style={btnStyle('#9333ea')}>
          <FiColumns size={16} /> Balance Sheet
        </Link>

        <Link href="/report/cash-flow" className="qa-btn-transition" style={btnStyle('#0ea5e9')}>
          <FiActivity size={16} /> Cash Flow
        </Link>

        <Link href="/report/trial-balance" className="qa-btn-transition" style={btnStyle('#0284c7')}>
          <FiClipboard size={16} /> Trial Balance
        </Link>

        <Link href="/report/reconciliation" className="qa-btn-transition" style={btnStyle('#64748b')}>
          <FiShield size={16} /> Bank Reconcile
        </Link>

        <Link href="/report/ar-aging" className="qa-btn-transition" style={btnStyle('#e11d48')}>
          <FiArrowDownRight size={16} /> AR Aging
        </Link>

        <Link href="/report/ap-aging" className="qa-btn-transition" style={btnStyle('#dc2626')}>
          <FiArrowUpRight size={16} /> AP Aging
        </Link>

        <Link href="/report/taxation" className="qa-btn-transition" style={btnStyle('#f59e0b')}>
          <FiPercent size={16} /> Taxation
        </Link>

        <Link href="/report/sbu-performance" className="qa-btn-transition" style={btnStyle('#0891b2')}>
          <FiBarChart2 size={16} /> Unit Analytics
        </Link>

      </div>
    </div>
  );
}