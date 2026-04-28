"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Analytics ✅
import { FiPieChart, FiTarget, FiActivity, FiArrowRight } from 'react-icons/fi';

/**
 * Enterprise PayrollDeptReport - EXECUTIVE MASTER RESPONSIVE
 * Purpose: Displays the breakdown of salary expenditures grouped by department.
 * Fix: Dual-Layout (Sleek List for Mobile / Executive Table for Laptop). ✅
 * Fix: Re-optimized Empty State for small screens. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function PayrollDeptReport({ reportData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logic: 100% Preserved ✅
  const grandTotal = reportData?.reduce((acc, curr) => acc + curr.totalCost, 0) || 0;

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    padding: isMobile ? '15px' : '18px 25px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px'
  };

  const mobileRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #f8fafc',
    backgroundColor: '#ffffff'
  };

  const footerTotalStyle = {
    backgroundColor: '#0f172a',
    padding: isMobile ? '15px' : '20px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '2px solid #2563eb'
  };

  // --- 1. FALLBACK UI (Professional Empty State) ---
  if (!reportData || reportData.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
            <h3 style={{ fontSize: '12px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0 }}>Cost Distribution</h3>
            <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '900' }}>UNIT ID</span>
        </div>
        <div style={{ padding: isMobile ? '60px 20px' : '100px 20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <FiActivity style={{ color: '#cbd5e1', fontSize: '32px' }} />
                <p style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
                    * No distributions detected *
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '8.5px', fontWeight: '700', textTransform: 'uppercase', margin: 0 }}>
                    Awaiting System Records
                </p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .dept-report-container * { border-radius: 0px !important; }
        .dept-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="dept-report-container" style={containerStyle}>
        
        {/* 2. COMPONENT HEADER ✅ */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiPieChart style={{ color: '#2563eb', fontSize: '18px' }} />
            <h3 style={{ fontSize: isMobile ? '11px' : '12.5px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Cost Distribution
            </h3>
          </div>
          <span style={{ fontSize: '8px', backgroundColor: '#f8fafc', color: '#64748b', padding: '3px 8px', fontWeight: '950', textTransform: 'uppercase', border: '1px solid #e2e8f0' }}>
              Unit Map
          </span>
        </div>

        {/* 3. DATA AREA: DUAL LAYOUT ✅ */}
        {isMobile ? (
          /* MOBILE LAYOUT: SLEEK DATA ROWS */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {reportData.map((item, index) => (
              <div key={index} style={mobileRowStyle} className="dept-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FiTarget style={{ color: '#cbd5e1', fontSize: '14px' }} />
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#334155', textTransform: 'uppercase' }}>
                    {item.department}
                  </span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '950', color: '#0f172a', fontFamily: 'monospace' }}>
                  ${item.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* LAPTOP LAYOUT: EXECUTIVE TABLE */
          <div style={{ width: '100%', overflowX: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '15px 20px', fontSize: '10px', fontWeight: '950', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid #f1f5f9', backgroundColor: '#fcfcfd' }}>Department</th>
                  <th style={{ padding: '15px 20px', fontSize: '10px', fontWeight: '950', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right', borderBottom: '1px solid #f1f5f9', backgroundColor: '#fcfcfd' }}>Net Salary Cost</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index} className="dept-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    <td style={{ padding: '12px 20px', textAlign: 'left' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                         <FiTarget style={{ color: '#cbd5e1' }} />
                         <span style={{ textTransform: 'uppercase', fontWeight: '800', fontSize: '13px', color: '#475569' }}>{item.department}</span>
                       </div>
                    </td>
                    <td style={{ padding: '12px 20px', textAlign: 'right', fontWeight: '900', color: '#0f172a', fontFamily: 'monospace', fontSize: '14px' }}>
                      ${item.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. GRAND TOTAL ANALYTICS FOOTER ✅ */}
        <div style={footerTotalStyle}>
          <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '8px', color: '#64748b', fontWeight: '900', textTransform: 'uppercase', margin: 0, letterSpacing: '0.1em' }}>
                  Total Expenditure
              </p>
              <p style={{ fontSize: '9px', color: '#ffffff', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px', margin: 0 }}>
                  Consolidated
              </p>
          </div>
          <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: '950', color: '#10b981', fontFamily: 'monospace', letterSpacing: '-0.02em', lineHeight: '1' }}>
                  ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
          </div>
        </div>

        {/* 5. COMPLIANCE NOTE ✅ */}
        <div style={{ padding: '10px 15px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
           <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
              * Official Unit Financial map synchronization *
           </p>
        </div>

      </div>
    </div>
  );
}