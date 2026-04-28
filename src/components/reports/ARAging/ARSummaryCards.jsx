"use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise ARSummaryCards - EXECUTIVE SHARP EDITION
 * Purpose: Categorized receivables aging buckets.
 * Fix: Forced 0px Border Radius on all cards. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Mobile: 2x2 Grid with 'Total' card spanning full width. ✅
 * Layout: Strictly Left-aligned labels and values. ✅
 */
export default function ARSummaryCards({ summary }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!summary) return null;

  // --- Inline Style Constants ---
  const gridContainerStyle = {
    display: 'grid',
    // Mobile: 2 cols | Laptop: 5 cols ✅
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
    gap: isMobile ? '12px' : '20px',
    marginBottom: '35px',
    width: '100%'
  };

  const cardStyle = (accentColor, isFullWidthMobile = false) => ({
    backgroundColor: '#ffffff',
    padding: isMobile ? '15px' : '20px 25px',
    border: '1px solid #f1f5f9',
    borderLeft: `5px solid ${accentColor}`, // Professional Accent Line ✅
    borderRadius: '0px', // Forced Sharp Edges ✅
    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left', // Strictly Left Aligned ✅
    // Total card spans 2 columns on mobile ✅
    gridColumn: isMobile && isFullWidthMobile ? 'span 2' : 'auto',
    height: isMobile ? '85px' : '120px',
    boxSizing: 'border-box'
  });

  const labelStyle = {
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '4px'
  };

  const valueStyle = (color = '#1e293b') => ({
    fontSize: isMobile ? '18px' : '26px',
    fontWeight: '950',
    color: color,
    margin: 0,
    fontFamily: 'monospace',
    letterSpacing: '-0.02em'
  });

  return (
    <div style={gridContainerStyle}>
      
      {/* 1. CURRENT (0-30 Days) - Emerald */}
      <div style={cardStyle('#10b981')}>
        <span style={labelStyle}>Current (0-30)</span>
        <h2 style={valueStyle('#10b981')}>${summary.current.toLocaleString()}</h2>
        <p style={{ fontSize: '7px', color: '#cbd5e1', fontWeight: '800', marginTop: '4px', textTransform: 'uppercase' }}>Healthy Debt</p>
      </div>

      {/* 2. 31-60 DAYS - Amber */}
      <div style={cardStyle('#f59e0b')}>
        <span style={labelStyle}>31-60 Days</span>
        <h2 style={valueStyle('#f59e0b')}>${summary.overdue30.toLocaleString()}</h2>
        <p style={{ fontSize: '7px', color: '#cbd5e1', fontWeight: '800', marginTop: '4px', textTransform: 'uppercase' }}>Late Warning</p>
      </div>

      {/* 3. 61-90 DAYS - Orange */}
      <div style={cardStyle('#f97316')}>
        <span style={labelStyle}>61-90 Days</span>
        <h2 style={valueStyle('#f97316')}>${summary.overdue60.toLocaleString()}</h2>
        <p style={{ fontSize: '7px', color: '#cbd5e1', fontWeight: '800', marginTop: '4px', textTransform: 'uppercase' }}>Active Collection</p>
      </div>

      {/* 4. 90+ DAYS - Red */}
      <div style={cardStyle('#ef4444')}>
        <span style={labelStyle}>90+ Days</span>
        <h2 style={valueStyle('#ef4444')}>${summary.overdue90.toLocaleString()}</h2>
        <p style={{ fontSize: '7px', color: '#cbd5e1', fontWeight: '800', marginTop: '4px', textTransform: 'uppercase' }}>Critical / Bad Debt</p>
      </div>

      {/* 5. TOTAL OUTSTANDING - Black/Slate (Full width on Mobile) ✅ */}
      <div style={cardStyle('#0f172a', true)}>
        <span style={labelStyle}>Total Receivables</span>
        <h2 style={valueStyle('#0f172a')}>${summary.total.toLocaleString()}</h2>
        <p style={{ fontSize: '7px', color: '#cbd5e1', fontWeight: '800', marginTop: '4px', textTransform: 'uppercase' }}>Consolidated Value</p>
      </div>

    </div>
  );
}