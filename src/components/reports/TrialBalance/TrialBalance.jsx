"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiCheckCircle, FiAlertTriangle, FiFileText } from 'react-icons/fi';

/**
 * Enterprise TrialBalance - EXECUTIVE SHARP EDITION
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Mobile: Stealth horizontal scroll and nano-scale typography. ✅
 * Layout: Strictly Left-aligned (Headers, Text, Badges). ✅
 */
export default function TrialBalance({ reportData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!reportData) return null;

  // --- Inline Style Constants ---
  const mainContainerStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 12px' : '40px 50px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03)',
    maxWidth: '1000px',
    margin: '0 auto',
    boxSizing: 'border-box',
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Mobile scroll safety ✅
    marginTop: '20px',
    backgroundColor: '#ffffff'
  };

  const thStyle = (align) => ({
    padding: isMobile ? '10px 12px' : '15px 20px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: align,
    borderBottom: '1.5px solid #0f172a', // Heavy top line for accounting look
    backgroundColor: '#fcfcfd'
  });

  const tdStyle = {
    padding: isMobile ? '10px 12px' : '14px 20px',
    fontSize: isMobile ? '11px' : '13px',
    color: '#334155',
    borderBottom: '1px solid #f8fafc',
    verticalAlign: 'middle'
  };

  const statusBoxStyle = {
    marginTop: '40px',
    padding: isMobile ? '15px' : '20px 30px',
    backgroundColor: reportData.totals.is_balanced ? '#ecfdf5' : '#fef2f2',
    border: `1px solid ${reportData.totals.is_balanced ? '#d1fae5' : '#fee2e2'}`,
    borderRadius: '0px', // Sharp ✅
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'flex-start' // Always Left ✅
  };

  return (
    <div style={mainContainerStyle}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tb-stealth-scroll::-webkit-scrollbar { display: none !important; }
        .tb-stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .tb-row:hover { background-color: #f8fafc !important; }
      `}} />

      {/* 1. REPORT HEADER (Strictly Left Aligned) ✅ */}
      <div style={{ marginBottom: '35px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <FiFileText size={20} style={{ color: '#0f172a' }} />
            <h2 style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>
                Trial Balance Summary
            </h2>
        </div>
        <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            As of: {new Date(reportData.meta.asOfDate).toLocaleDateString('en-CA', { day: '2-digit', month: 'long', year: 'numeric' })} | Currency: {reportData.meta.currency}
        </p>
      </div>

      {/* 2. DATA LEDGER TABLE */}
      <div className="tb-stealth-scroll" style={tableWrapperStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '600px' : '100%' }}>
          <thead>
            <tr>
              <th style={thStyle('left')}>Account Code & Description</th>
              <th style={thStyle('right')}>Debit (USD)</th>
              <th style={thStyle('right')}>Credit (USD)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.accounts.map((acc, index) => (
              <tr key={index} className="tb-row" style={{ transition: 'all 0.2s' }}>
                
                {/* Account Details */}
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'monospace', color: '#94a3b8', fontWeight: '700' }}>{acc.account_code}</span>
                    <span style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase' }}>{acc.account_name}</span>
                  </div>
                  <div style={{ fontSize: '8.5px', color: '#cbd5e1', fontWeight: '900', textTransform: 'uppercase', marginTop: '2px', marginLeft: isMobile ? '0' : '45px' }}>
                    Category: {acc.account_type}
                  </div>
                </td>

                {/* Debit Value */}
                <td style={{ ...tdStyle, textAlign: 'right', fontFamily: 'monospace', fontWeight: '900' }}>
                  {acc.total_debit > 0 ? `$${acc.total_debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "—"}
                </td>

                {/* Credit Value */}
                <td style={{ ...tdStyle, textAlign: 'right', fontFamily: 'monospace', fontWeight: '900' }}>
                  {acc.total_credit > 0 ? `$${acc.total_credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "—"}
                </td>

              </tr>
            ))}
          </tbody>

          {/* 3. GRAND TOTALS ROW (Accounting Double-Underline Style) ✅ */}
          <tfoot>
            <tr style={{ backgroundColor: '#fcfcfd' }}>
              <td style={{ ...tdStyle, borderBottom: 'none', fontWeight: '950', textTransform: 'uppercase', color: '#0f172a' }}>
                Consolidated Grand Total
              </td>
              <td style={{ ...tdStyle, borderBottom: 'none', textAlign: 'right' }}>
                <div style={{ display: 'inline-block', borderBottom: '3px double #0f172a', paddingBottom: '2px' }}>
                    <span style={{ fontSize: isMobile ? '14px' : '18px', fontWeight: '950', color: '#0f172a', fontFamily: 'monospace' }}>
                        ${reportData.totals.grand_total_debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                </div>
              </td>
              <td style={{ ...tdStyle, borderBottom: 'none', textAlign: 'right' }}>
                <div style={{ display: 'inline-block', borderBottom: '3px double #0f172a', paddingBottom: '2px' }}>
                    <span style={{ fontSize: isMobile ? '14px' : '18px', fontWeight: '950', color: '#0f172a', fontFamily: 'monospace' }}>
                        ${reportData.totals.grand_total_credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 4. INTEGRITY STATUS BADGE (Strictly Left Aligned) ✅ */}
      <div style={statusBoxStyle}>
        {reportData.totals.is_balanced ? 
            <FiCheckCircle style={{ color: '#10b981', fontSize: '20px' }} /> : 
            <FiAlertTriangle style={{ color: '#ef4444', fontSize: '20px' }} />
        }
        <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: '950', color: reportData.totals.is_balanced ? '#065f46' : '#991b1b', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                {reportData.totals.is_balanced ? "Ledger Integrity: Verified Balanced" : "Warning: Ledger Imbalance Detected"}
            </h4>
            <p style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', marginTop: '2px', margin: 0 }}>
                Automatic Double-Entry Verification System
            </p>
        </div>
      </div>

      {/* 5. AUDIT DISCLAIMER */}
      <div style={{ marginTop: '40px', textAlign: 'left' }}>
        <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic', margin: 0 }}>
            * This document serves as a verified internal record of ledger accuracy *
        </p>
      </div>

    </div>
  );
}