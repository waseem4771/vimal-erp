"use client";

import { useState, useEffect } from 'react';
// Professional Icons for AR Audit ✅
import { FiUser, FiCalendar, FiPieChart, FiBarChart } from 'react-icons/fi';

/**
 * Enterprise ARTable - EXECUTIVE SHARP EDITION
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for reliable rendering. ✅
 * Mobile: Stealth horizontal scroll and nano-scale typography. ✅
 * Layout: Strictly Left-aligned and Audit-ready. ✅
 */
export default function ARTable({ reportData, isMobile: manualMobileCheck }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!reportData) return null;

  const { details } = reportData;

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    padding: isMobile ? '12px 15px' : '18px 25px',
    backgroundColor: '#0f172a', // Corporate Dark Header
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Mobile scroll safety ✅
    backgroundColor: '#ffffff'
  };

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
    backgroundColor: isTotal ? '#fcfcfd' : 'transparent'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ar-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .ar-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="ar-table-container" style={containerStyle}>
        
        {/* 1. COMPONENT HEADER */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiPieChart style={{ color: '#3b82f6', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Customer Debt Maturity Ledger
            </h3>
          </div>
          <span style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            padding: isMobile ? '2px 8px' : '4px 12px',
            fontSize: isMobile ? '7px' : '9px',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}>
            {details?.length || 0} Entities
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '800px' : '100%' }}>
            <thead>
              <tr>
                <th style={thStyle('left')}>Customer Entity</th>
                <th style={thStyle('center')}>Current (0-30)</th>
                <th style={thStyle('center')}>31-60 Overdue</th>
                <th style={thStyle('center')}>61-90 Overdue</th>
                <th style={thStyle('center')}>90+ Days</th>
                <th style={thStyle('right', true)}>Total Balance</th>
              </tr>
            </thead>
            <tbody>
              {details && details.length > 0 ? (
                details.map((cust, index) => (
                  <tr key={index} className="ar-row" style={{ transition: 'all 0.2s' }}>
                    
                    {/* Customer Identity */}
                    <td style={tdStyle('left')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiUser style={{ color: '#94a3b8' }} />
                        <span style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase' }}>{cust.name}</span>
                      </div>
                    </td>

                    {/* Current (Emerald tint) */}
                    <td style={{ ...tdStyle('center'), color: '#10b981', fontFamily: 'monospace' }}>
                      ${cust.current.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Overdue 30 (Amber tint) */}
                    <td style={{ ...tdStyle('center'), color: '#f59e0b', fontFamily: 'monospace' }}>
                      ${cust.overdue30.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Overdue 60 (Orange tint) */}
                    <td style={{ ...tdStyle('center'), color: '#f97316', fontFamily: 'monospace' }}>
                      ${cust.overdue60.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Overdue 90 (Red tint) */}
                    <td style={{ ...tdStyle('center'), color: '#ef4444', fontFamily: 'monospace' }}>
                      ${cust.overdue90.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Net Balance (Highlighted Column) ✅ */}
                    <td style={{ ...tdStyle('right', true), color: '#0f172a', fontFamily: 'monospace', borderLeft: '1px solid #f1f5f9' }}>
                      ${cust.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    * No outstanding receivables detected *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Helper Styles injected inside component for better scoped control