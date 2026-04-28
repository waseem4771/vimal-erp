

"use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise APAging - EXECUTIVE SHARP EDITION
 * Purpose: Categorized vendor liabilities breakdown and detailed ledger.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Responsive grid for cards and stealth horizontal scroll for table. ✅
 * Style: Deep professional accents (Emerald to Red scale). ✅
 */
export default function APAging({ reportData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!reportData) return null;

  const { summary, details } = reportData;

  // --- Inline Style Constants ---
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
    gap: isMobile ? '12px' : '20px',
    marginBottom: '35px',
    width: '100%'
  };

  const cardStyle = (accentColor, isTotal = false) => ({
    backgroundColor: isTotal ? '#0f172a' : '#ffffff',
    padding: isMobile ? '15px' : '20px 25px',
    border: isTotal ? '1px solid #1e293b' : '1px solid #f1f5f9',
    borderLeft: `5px solid ${accentColor}`,
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
    gridColumn: isMobile && isTotal ? 'span 2' : 'auto',
    height: isMobile ? '85px' : '110px',
    boxSizing: 'border-box'
  });

  const labelStyle = (isTotal) => ({
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    color: isTotal ? '#94a3b8' : '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '4px'
  });

  const valueStyle = (color) => ({
    fontSize: isMobile ? '18px' : '24px',
    fontWeight: '950',
    color: color,
    margin: 0,
    fontFamily: 'monospace',
    letterSpacing: '-0.02em'
  });

  const thStyle = (align = 'left', isTotal = false) => ({
    padding: isMobile ? '10px 12px' : '15px 20px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '950',
    color: isTotal ? '#0f172a' : '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: align,
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: isTotal ? '#f1f5f9' : '#f8fafc',
    whiteSpace: 'nowrap'
  });

  const tdStyle = (align = 'left', isTotal = false) => ({
    padding: isMobile ? '10px 12px' : '14px 20px',
    fontSize: isMobile ? '11px' : '13px',
    color: isTotal ? '#0f172a' : '#475569',
    fontWeight: isTotal ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    backgroundColor: isTotal ? '#fcfcfd' : 'transparent',
    verticalAlign: 'middle'
  });

  return (
    <div style={{ width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ap-aging-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .ap-row:hover { background-color: #fef2f2 !important; }
      `}} />

      <div className="ap-aging-wrapper">
        
        {/* 1. SUMMARY BUCKETS SECTION */}
        <div style={gridContainerStyle}>
          <div style={cardStyle('#10b981')}>
            <span style={labelStyle(false)}>Current (0-30)</span>
            <h2 style={valueStyle('#10b981')}>${summary.current.toLocaleString()}</h2>
          </div>
          <div style={cardStyle('#f59e0b')}>
            <span style={labelStyle(false)}>31-60 Days Late</span>
            <h2 style={valueStyle('#f59e0b')}>${summary.overdue30.toLocaleString()}</h2>
          </div>
          <div style={cardStyle('#f97316')}>
            <span style={labelStyle(false)}>61-90 Days Late</span>
            <h2 style={valueStyle('#f97316')}>${summary.overdue60.toLocaleString()}</h2>
          </div>
          <div style={cardStyle('#ef4444')}>
            <span style={labelStyle(false)}>90+ Days Critical</span>
            <h2 style={valueStyle('#ef4444')}>${summary.overdue90.toLocaleString()}</h2>
          </div>
          <div style={cardStyle('#f43f5e', true)}>
            <span style={labelStyle(true)}>Total Unit Payable</span>
            <h2 style={valueStyle('#ffffff')}>${summary.total.toLocaleString()}</h2>
          </div>
        </div>

        {/* 2. VENDOR LEDGER TABLE SECTION */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
          width: '100%'
        }}>
          {/* Table Header Container */}
          <div style={{
            padding: isMobile ? '12px 15px' : '18px 25px',
            backgroundColor: '#0f172a',
            borderBottom: '1px solid #1e293b'
          }}>
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Vendor-wise Liability Distribution
            </h3>
          </div>

          <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '800px' : '100%' }}>
              <thead>
                <tr>
                  <th style={thStyle('left')}>Vendor / Supplier Entity</th>
                  <th style={thStyle('center')}>Current</th>
                  <th style={thStyle('center')}>31-60 Days</th>
                  <th style={thStyle('center')}>61-90 Days</th>
                  <th style={thStyle('center')}>90+ Days</th>
                  <th style={thStyle('right', true)}>Net Payable</th>
                </tr>
              </thead>
              <tbody>
                {details && details.length > 0 ? (
                  details.map((vendor, index) => (
                    <tr key={index} className="ap-row" style={{ transition: 'all 0.2s' }}>
                      <td style={tdStyle('left')}>
                        <div style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase' }}>{vendor.name}</div>
                        <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', marginTop: '3px' }}>VERIFIED SUPPLIER</div>
                      </td>
                      <td style={{ ...tdStyle('center'), color: '#10b981', fontFamily: 'monospace' }}>${vendor.current.toLocaleString()}</td>
                      <td style={{ ...tdStyle('center'), color: '#f59e0b', fontFamily: 'monospace' }}>${vendor.overdue30.toLocaleString()}</td>
                      <td style={{ ...tdStyle('center'), color: '#f97316', fontFamily: 'monospace' }}>${vendor.overdue60.toLocaleString()}</td>
                      <td style={{ ...tdStyle('center'), color: '#ef4444', fontFamily: 'monospace' }}>${vendor.overdue90.toLocaleString()}</td>
                      <td style={{ ...tdStyle('right', true), color: '#f43f5e', fontFamily: 'monospace', borderLeft: '1px solid #f1f5f9' }}>
                        ${vendor.total.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                      * Zero outstanding liabilities detected in current ledger *
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}