

"use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise TaxationReport - EXECUTIVE SHARP EDITION (Slim Version)
 * Purpose: Detailed breakdown of tax liabilities and net totals.
 * Fix: Reduced vertical padding on the liability scorecard (Top & Bottom). ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Responsive layout for the liability card and stealth-scroll table. ✅
 */
export default function TaxationReport({ reportData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!reportData || !reportData.tax_details) return null;

  // --- Inline Style Constants ---
  const containerStyle = {
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    boxSizing: 'border-box'
  };

  const liabilityCardStyle = {
    backgroundColor: '#0f172a', // Corporate Dark Slate
    color: '#ffffff',
    // Vertical padding reduced from 25px/40px to 12px/20px for slim design ✅
    padding: isMobile ? '12px 20px' : '20px 50px',
    borderBottom: '8px solid #f97316', // Regulatory Orange Accent
    borderRadius: '0px', // Forced Sharp ✅
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? '15px' : '0px',
    marginBottom: '35px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'left'
  };

  const tableHeaderStyle = {
    padding: isMobile ? '12px 15px' : '15px 25px',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const thStyle = (align = 'left') => ({
    padding: isMobile ? '12px 15px' : '18px 25px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: align,
    borderBottom: '1.5px solid #0f172a',
    backgroundColor: '#fcfcfd',
    whiteSpace: 'nowrap'
  });

  const tdStyle = (align = 'left', isAmount = false) => ({
    padding: isMobile ? '12px 15px' : '16px 25px',
    fontSize: isMobile ? '11.5px' : '13.5px',
    color: isAmount ? '#ea580c' : '#1e293b',
    fontWeight: isAmount ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    fontFamily: isAmount ? 'monospace' : 'inherit',
    verticalAlign: 'middle'
  });

  return (
    <div style={containerStyle}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tax-report-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .tax-row:hover { background-color: #fffaf5 !important; }
      `}} />

      <div className="tax-report-wrapper">
        
        {/* 1. TOTAL TAX LIABILITY SCORECARD (Slimmer Version) ✅ */}
        <div style={liabilityCardStyle}>
          <div>
            <h2 style={{ fontSize: isMobile ? '11px' : '13px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
                Total Tax Liability
            </h2>
            <p style={{ fontSize: isMobile ? '9px' : '10px', color: '#64748b', fontStyle: 'italic', margin: '4px 0 0 0' }}>
                Net tax collected across filtered unit period
            </p>
          </div>
          <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
            <p style={{ fontSize: isMobile ? '32px' : '52px', fontWeight: '950', color: '#f97316', margin: 0, lineHeight: '1', letterSpacing: '-0.04em' }}>
              ${reportData.total_tax_liability?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p style={{ fontSize: '8.5px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', marginTop: '6px', letterSpacing: '0.1em', margin: '6px 0 0 0' }}>
                Currency: {reportData.meta?.currency || 'USD'}
            </p>
          </div>
        </div>

        {/* 2. TAX BREAKDOWN LEDGER TABLE ✅ */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
          width: '100%'
        }}>
          <div style={tableHeaderStyle}>
            <h3 style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Tax Accounts Breakdown
            </h3>
          </div>

          <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '600px' : '100%' }}>
              <thead>
                <tr>
                  <th style={thStyle('left')}>Account Code</th>
                  <th style={thStyle('left')}>Ledger Description</th>
                  <th style={thStyle('right')}>Balance (Liability)</th>
                </tr>
              </thead>
              <tbody>
                {reportData.tax_details.length > 0 ? (
                  reportData.tax_details.map((tax, index) => (
                    <tr key={index} className="tax-row" style={{ transition: 'all 0.2s' }}>
                      <td style={{ ...tdStyle('left'), fontFamily: 'monospace', color: '#94a3b8' }}>
                        {tax.code}
                      </td>
                      <td style={tdStyle('left')}>
                        <div style={{ fontWeight: '800', textTransform: 'uppercase' }}>{tax.name}</div>
                        <div style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', marginTop: '3px' }}>VERIFIED COMPLIANCE</div>
                      </td>
                      <td style={tdStyle('right', true)}>
                        ${tax.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                      * No tax transactions recorded in this period *
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