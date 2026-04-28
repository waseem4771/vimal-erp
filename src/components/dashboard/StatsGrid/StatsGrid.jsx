

"use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise StatsGrid - EXECUTIVE INLINE EDITION (Precision Border)
 * UI: High-end Minimalist, Ultra-thin surrounding borders, Thick Left Accent. ✅
 * Layout: 2x2 Mobile, 4x1 Laptop. ✅
 * Priority: 100% Inline Styles for zero-clash rendering. ✅
 */
export default function StatsGrid({ summary, selectedSbu }) {
  const stats = summary?.summary;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Theme Colors ---
  const colors = {
    revenue: '#10b981',
    expenses: '#f43f5e',
    profit: '#3b82f6',
    sbu: '#1e293b',
    textMain: '#0f172a',
    textMuted: '#64748b',
    thinBorder: '#e2e8f0' // Ultra-thin border color for other sides
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? '12px' : '24px',
    width: '100%',
    marginBottom: '40px'
  };

  const cardStyle = (color) => ({
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: isMobile ? '10px 14px' : '20px 28px',
    // --- Border Logic ---
    borderTop: `1px solid ${colors.thinBorder}`,    // Very thin top border
    borderRight: `1px solid ${colors.thinBorder}`,  // Very thin right border
    borderBottom: `1px solid ${colors.thinBorder}`, // Very thin bottom border
    borderLeft: `5px solid ${color}`,               // Premium thick left accent
    // --------------------
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    height: isMobile ? '85px' : '135px' // Professional compact heights
  });

  const labelContainer = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: isMobile ? '2px' : '6px'
  };

  const mainLabelStyle = {
    fontSize: isMobile ? '8px' : '11px',
    fontWeight: '800',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    lineHeight: '1.2'
  };

  const subLabelStyle = (color) => ({
    fontSize: isMobile ? '7px' : '9.5px',
    fontWeight: '700',
    color: color,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '1px'
  });

  const amountStyle = (color = colors.textMain) => ({
    fontSize: isMobile ? '17px' : '30px',
    fontWeight: '900',
    color: color,
    letterSpacing: '-0.02em',
    margin: '0',
    lineHeight: '1.1'
  });

  return (
    <div style={containerStyle}>
      
      {/* 1. TOTAL REVENUE */}
      <div style={cardStyle(colors.revenue)}>
        <div style={labelContainer}>
          <span style={mainLabelStyle}>Total Revenue</span>
          <span style={subLabelStyle(colors.revenue)}>Gross Income</span>
        </div>
        <h2 style={amountStyle()}>${stats?.total_revenue?.toLocaleString() || '0.00'}</h2>
      </div>

      {/* 2. TOTAL EXPENSES */}
      <div style={cardStyle(colors.expenses)}>
        <div style={labelContainer}>
          <span style={mainLabelStyle}>Total Expenses</span>
          <span style={subLabelStyle(colors.expenses)}>Running Costs</span>
        </div>
        <h2 style={amountStyle()}>${stats?.total_expenses?.toLocaleString() || '0.00'}</h2>
      </div>

      {/* 3. NET PROFIT */}
      <div style={cardStyle(colors.profit)}>
        <div style={labelContainer}>
          <span style={mainLabelStyle}>Net Profit</span>
          <span style={subLabelStyle(colors.profit)}>Net Earnings</span>
        </div>
        <h2 style={amountStyle(colors.profit)}>${stats?.net_profit?.toLocaleString() || '0.00'}</h2>
      </div>

      {/* 4. SBU UNITS */}
      <div style={cardStyle(colors.sbu)}>
        <div style={labelContainer}>
          <span style={mainLabelStyle}>SBU Units</span>
          <span style={subLabelStyle(colors.textMuted)}>Active Entities</span>
        </div>
        <h2 style={amountStyle()}>{selectedSbu ? "1" : stats?.active_sbus || 0}</h2>
      </div>

    </div>
  );
}