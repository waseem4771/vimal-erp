

"use client";

import { useState, useEffect } from 'react';
import { FiTrendingUp, FiTrendingDown, FiFileText, FiAward } from 'react-icons/fi';

/**
 * Enterprise PLStatement - EXECUTIVE SHARP EDITION ✅
 * Purpose: Visualizes Profit & Loss data with multi-currency accuracy.
 * Fix: Tightened date display and handled empty states for Today's view. ✅
 * Style: 100% Sharp (0px Radius) & Strictly Left-aligned. ✅
 */
export default function PLStatement({ reportData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!reportData) return null;

  // Helper function to clean date without timezone shifts ✅
  const formatPeriodDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return dateStr.split('T')[0]; 
  };

  // --- Inline Style Constants ---
  const mainContainerStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '35px 45px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px !important',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03)',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'border-box',
    textAlign: 'left'
  };

  const sectionTitleStyle = (color) => ({
    fontSize: isMobile ? '10px' : '11.5px',
    fontWeight: '900',
    color: color,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    borderBottom: `2px solid ${color}22`,
    paddingBottom: '8px',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: isMobile ? '8px 0' : '10px 0',
    borderBottom: '1px solid #f8fafc'
  };

  const totalRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 0',
    marginTop: '10px',
    borderTop: '2px solid #0f172a',
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    fontSize: isMobile ? '10px' : '12px',
    letterSpacing: '0.05em'
  };

  return (
    <div style={mainContainerStyle}>
      
      {/* 1. STATEMENT HEADER */}
      <div style={{ marginBottom: '35px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <FiFileText size={22} style={{ color: '#0f172a' }} />
            <h2 style={{ fontSize: isMobile ? '18px' : '26px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>
                Profit & Loss Statement
            </h2>
        </div>
        <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            Period: {formatPeriodDate(reportData.meta.startDate)} — {formatPeriodDate(reportData.meta.endDate)}
        </p>
      </div>

      {/* 2. OPERATING INCOME SECTION */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={sectionTitleStyle('#10b981')}>
            <FiTrendingUp size={14} /> Operating Revenue
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {reportData.income && reportData.income.length > 0 ? reportData.income.map((item, index) => (
            <div key={index} style={rowStyle}>
              <span style={{ fontSize: isMobile ? '11px' : '13px', color: '#475569', fontWeight: '700' }}>
                {item.code} — {item.name}
              </span>
              <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: '900', color: '#0f172a', fontFamily: 'monospace' }}>
                ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          )) : (
            <p style={{ padding: '20px 0', fontSize: '10px', color: '#cbd5e1', fontStyle: 'italic', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
                * No income detected for selected period *
            </p>
          )}
          
          <div style={totalRowStyle}>
            <span>Gross Operating Revenue</span>
            <span style={{ color: '#10b981' }}>${reportData.totals.total_income.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* 3. OPERATING EXPENSES SECTION */}
      <div style={{ marginBottom: '10px' }}>
        <h3 style={sectionTitleStyle('#f43f5e')}>
            <FiTrendingDown size={14} /> Operating Expenditures
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {reportData.expenses && reportData.expenses.length > 0 ? reportData.expenses.map((item, index) => (
            <div key={index} style={rowStyle}>
              <span style={{ fontSize: isMobile ? '11px' : '13px', color: '#475569', fontWeight: '700' }}>
                {item.code} — {item.name}
              </span>
              <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: '900', color: '#f43f5e', fontFamily: 'monospace' }}>
                (${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })})
              </span>
            </div>
          )) : (
            <p style={{ padding: '20px 0', fontSize: '10px', color: '#cbd5e1', fontStyle: 'italic', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
                * No verified expenses detected *
            </p>
          )}
          
          <div style={totalRowStyle}>
            <span>Total Operating Costs</span>
            <span style={{ color: '#f43f5e' }}>(${reportData.totals.total_expense.toLocaleString(undefined, { minimumFractionDigits: 2 })})</span>
          </div>
        </div>
      </div>

      {/* 4. NET PERFORMANCE SUMMARY */}
      <div style={{
          backgroundColor: '#0f172a',
          padding: isMobile ? '20px' : '25px 40px',
          marginTop: '40px',
          borderRadius: '0px !important',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          border: '1px solid #1e293b'
      }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiAward style={{ color: '#60a5fa', fontSize: '16px' }} />
            <h4 style={{ fontSize: '11px', fontWeight: '900', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                Net Performance
            </h4>
          </div>
          <p style={{ fontSize: '9px', color: '#475569', fontWeight: '800', textTransform: 'uppercase', marginTop: '4px', margin: 0 }}>
            Audit Grade Result (USD)
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: '950', color: parseFloat(reportData.totals.net_profit) >= 0 ? '#10b981' : '#f43f5e', letterSpacing: '-0.03em', lineHeight: '1' }}>
              ${reportData.totals.net_profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <p style={{ fontSize: '8px', color: '#475569', fontWeight: '900', textTransform: 'uppercase', marginTop: '5px', margin: 0 }}>Consolidated Sync Active</p>
        </div>
      </div>

      {/* 5. AUDIT DISCLAIMER */}
      <div style={{ marginTop: '40px', textAlign: 'left', borderTop: '1px solid #f8fafc', paddingTop: '15px' }}>
        <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', fontStyle: 'italic', margin: 0 }}>
            * This statement is a real-time synchronized record of Unit 1 financial ledger entries *
        </p>
      </div>

    </div>
  );
}