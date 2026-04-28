

"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Balance Sheet ✅
import { FiLayers, FiTrendingDown, FiCheckCircle, FiAlertTriangle, FiActivity } from 'react-icons/fi';

/**
 * Enterprise BalanceSheet - EXECUTIVE SLIM EDITION
 * Fix: Reduced vertical padding and margins for a compact layout. ✅
 * Fix: Removed style shorthands to prevent Next.js hydration/render bugs. ✅
 * Layout: Strictly Left-aligned and 0px Radius. ✅
 */
export default function BalanceSheet({ reportData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!reportData) return null;

  const { assets, liabilities, equity, totals } = reportData.data;

  // --- Inline Style Constants ---
  const mainContainerStyle = {
    backgroundColor: '#ffffff',
    // Vertical padding reduced: 15px Mobile / 25px Laptop ✅
    paddingTop: isMobile ? '15px' : '25px',
    paddingBottom: isMobile ? '15px' : '25px',
    paddingLeft: isMobile ? '15px' : '40px',
    paddingRight: isMobile ? '15px' : '40px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03)',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'border-box',
    textAlign: 'left'
  };

  const sectionHeaderStyle = (color) => ({
    fontSize: isMobile ? '10.5px' : '12px',
    fontWeight: '900',
    color: color,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    borderBottom: `1.5px solid ${color}33`,
    paddingBottom: '6px',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textAlign: 'left'
  });

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: isMobile ? '6px 0' : '8px 0',
    borderBottom: '1px solid #f8fafc'
  };

  const totalBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    marginTop: '10px',
    borderTop: '2px solid #0f172a',
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    fontSize: isMobile ? '10px' : '12px',
    letterSpacing: '0.05em'
  };

  const isBalanced = Math.abs(totals.total_assets - (totals.total_liabilities + totals.total_equity)) < 0.01;

  return (
    <div style={mainContainerStyle}>
      
      {/* 1. STATEMENT HEADER - Vertical Gaps Tightened ✅ */}
      <div style={{ marginBottom: isMobile ? '20px' : '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <FiActivity size={20} style={{ color: '#0f172a' }} />
            <h2 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', marginTop: 0, marginBottom: 0, letterSpacing: '-0.02em' }}>
                Financial Position Statement
            </h2>
        </div>
        <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 0, marginBottom: 0 }}>
            Snapshot: {new Date(reportData.meta.asOfDate).toLocaleDateString('en-CA', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* 2. MAIN CATEGORIES GRID */}
      <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '60px'
      }}>
        
        {/* ASSETS COLUMN */}
        <div>
          <h3 style={sectionHeaderStyle('#2563eb')}>
            <FiLayers /> Assets
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {assets.length > 0 ? assets.map((item, index) => (
              <div key={index} style={rowStyle}>
                <span style={{ fontSize: isMobile ? '10px' : '12px', color: '#475569', fontWeight: '600' }}>
                  {item.code} — {item.name}
                </span>
                <span style={{ fontSize: isMobile ? '11px' : '13.5px', fontWeight: '900', color: '#0f172a', fontFamily: 'monospace' }}>
                  ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            )) : (
              <p style={{ padding: '10px 0', fontSize: '10px', color: '#94a3b8', fontStyle: 'italic' }}>* No entries *</p>
            )}
            
            <div style={totalBoxStyle}>
              <span>Total Assets</span>
              <span style={{ color: '#2563eb' }}>${totals.total_assets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* LIABILITIES & EQUITY COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={sectionHeaderStyle('#f43f5e')}>
                <FiTrendingDown /> Liabilities
            </h3>
            {liabilities.length > 0 ? liabilities.map((item, index) => (
              <div key={index} style={rowStyle}>
                <span style={{ fontSize: isMobile ? '10px' : '12px', color: '#475569', fontWeight: '600' }}>
                  {item.code} — {item.name}
                </span>
                <span style={{ fontSize: isMobile ? '11px' : '13.5px', fontWeight: '900', color: '#f43f5e', fontFamily: 'monospace' }}>
                  ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            )) : (
              <p style={{ padding: '10px 0', fontSize: '10px', color: '#94a3b8', fontStyle: 'italic' }}>* No entries *</p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={sectionHeaderStyle('#9333ea')}>
                <FiActivity /> Unit Equity
            </h3>
            {equity.length > 0 ? equity.map((item, index) => (
              <div key={index} style={rowStyle}>
                <span style={{ fontSize: isMobile ? '10px' : '12px', color: '#475569', fontWeight: '600' }}>
                  {item.code} — {item.name}
                </span>
                <span style={{ fontSize: isMobile ? '11px' : '13.5px', fontWeight: '900', color: '#0f172a', fontFamily: 'monospace' }}>
                  ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            )) : (
              <p style={{ padding: '10px 0', fontSize: '10px', color: '#94a3b8', fontStyle: 'italic' }}>* No entries *</p>
            )}
          </div>

          <div style={{ ...totalBoxStyle, backgroundColor: '#fcfcfd', padding: '12px 10px' }}>
            <span style={{ fontSize: isMobile ? '9px' : '11px' }}>Total L+E Sum</span>
            <span style={{ color: '#0f172a' }}>
                ${(totals.total_liabilities + totals.total_equity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

        </div>
      </div>

      {/* 3. BALANCE INTEGRITY CHECKER - Compact Height ✅ */}
      <div style={{
          marginTop: isMobile ? '30px' : '40px',
          padding: isMobile ? '12px 15px' : '15px 30px',
          backgroundColor: isBalanced ? '#ecfdf5' : '#fff7ed',
          border: `1px solid ${isBalanced ? '#d1fae5' : '#ffedd5'}`,
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: 'center',
          gap: '12px',
          borderRadius: '0px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isBalanced ? <FiCheckCircle style={{ color: '#10b981' }} size={18} /> : <FiAlertTriangle style={{ color: '#f97316' }} size={18} />}
            <span style={{ fontSize: isMobile ? '9px' : '11.5px', fontWeight: '900', color: isBalanced ? '#065f46' : '#9a3412', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isBalanced ? "Ledger Integrity: Verified" : "Warning: Unbalanced"}
            </span>
        </div>
        {!isMobile && (
            <span style={{ fontSize: '9px', color: isBalanced ? '#059669' : '#ea580c', fontWeight: '800', textTransform: 'uppercase' }}>
                Assets = Liab. + Equity
            </span>
        )}
      </div>

      {/* 4. FOOTER NOTICE */}
      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic', marginTop: 0, marginBottom: 0 }}>
            * Computer generated official audit record of position *
        </p>
      </div>

    </div>
  );
} 