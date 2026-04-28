
"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Payroll ✅
import { FiUser, FiActivity, FiDollarSign, FiClock, FiDatabase, FiCheckCircle } from 'react-icons/fi';

/**
 * Enterprise PayrollLedgerTable - EXECUTIVE MASTER RESPONSIVE EDITION
 * Purpose: Detailed ledger for personnel salary disbursements with Ledger Sync Action.
 * Fix: Integrated "Pay Now" action for both Mobile and Laptop layouts. ✅
 * Fix: Dual-Layout Logic (Cards for Mobile / Table for Laptop). ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function PayrollLedgerTable({ payrollData, month, year, selectedSbuId, onPaySalary }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '0px', 
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    padding: isMobile ? '15px' : '18px 25px',
    backgroundColor: '#0f172a', // Corporate Dark
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    borderBottom: '1px solid #1e293b',
    gap: isMobile ? '10px' : '0px'
  };

  const thStyle = {
    padding: '15px 20px',
    fontSize: '10px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: 'left',
    borderBottom: '1.5px solid #0f172a',
    backgroundColor: '#fcfcfd',
    whiteSpace: 'nowrap'
  };

  const mobileCardStyle = {
    padding: '15px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'left'
  };

  const payBtnStyle = {
    backgroundColor: '#ecfdf5',
    color: '#059669',
    border: '1px solid #d1fae5',
    padding: '6px 12px',
    fontSize: '9px',
    fontWeight: '950',
    textTransform: 'uppercase',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: '0px'
  };

  const paidStatusStyle = {
    color: '#10b981',
    fontWeight: '950',
    fontSize: '9px',
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px'
  };

  // --- 1. SHARED HEADER COMPONENT ---
  const TableHeader = () => (
    <div style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiDatabase style={{ color: '#3b82f6', fontSize: '18px' }} />
        <h3 style={{ fontSize: isMobile ? '11px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
            Personnel Payroll Ledger
        </h3>
      </div>
      <span style={{ 
          fontSize: '8.5px', 
          backgroundColor: '#2563eb', 
          color: '#ffffff', 
          padding: '3px 12px', 
          fontWeight: '950', 
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
      }}>
          Period: {month} / {year}
      </span>
    </div>
  );

  // --- 2. EMPTY STATE LOGIC ---
  if (!payrollData || payrollData.length === 0) {
    return (
      <div style={containerStyle}>
        <TableHeader />
        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <FiActivity style={{ color: '#cbd5e1', fontSize: '40px' }} />
                <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                    * No active payroll entries detected for Unit {selectedSbuId} *
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
        .payroll-ledger-container * { border-radius: 0px !important; }
        .ledger-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="payroll-ledger-container" style={containerStyle}>
        
        <TableHeader />

        {/* 3. DUAL-LAYOUT DATA AREA ✅ */}
        {isMobile ? (
          /* --- MOBILE LAYOUT: PREMIUM CARDS --- */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {payrollData.map((p) => (
              <div key={p.id} style={mobileCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiUser style={{ color: '#64748b' }} />
                    <div>
                      <div style={{ fontWeight: '900', color: '#0f172a', fontSize: '12.5px', textTransform: 'uppercase' }}>{p.employees?.full_name}</div>
                      <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700' }}>{p.employees?.designation}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '950', color: '#0f172a', fontSize: '15px', fontFamily: 'monospace' }}>
                      ${parseFloat(p.net_salary).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                  <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', border: '1px solid #dbeafe' }}>
                    {p.employees?.departments?.dept_name || 'Personnel'}
                  </span>
                  
                  {/* Action or Status for Mobile */}
                  {p.payment_status === 'Paid' ? (
                    <span style={paidStatusStyle}><FiCheckCircle /> Synchronized</span>
                  ) : (
                    <button onClick={() => onPaySalary(p.id)} style={payBtnStyle}>
                        <FiDollarSign /> Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- LAPTOP LAYOUT: EXECUTIVE TABLE --- */
          <div style={{ width: '100%', overflowX: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Personnel Member</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Cost Center</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Net Salary (USD)</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Verification</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((p) => (
                  <tr key={p.id} className="ledger-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    <td style={{ padding: '15px 20px', textAlign: 'left' }}>
                      <div style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', fontSize: '13px' }}>{p.employees?.full_name}</div>
                      <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>{p.employees?.designation}</div>
                    </td>
                    <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                      <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '3px 10px', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', border: '1px solid #dbeafe' }}>
                        {p.employees?.departments?.dept_name || 'Global'}
                      </span>
                    </td>
                    <td style={{ padding: '15px 20px', textAlign: 'center', fontWeight: '950', fontSize: '17px', fontFamily: 'monospace', color: '#0f172a' }}>
                      ${parseFloat(p.net_salary).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                      {p.payment_status === 'Paid' ? (
                        <span style={paidStatusStyle}><FiCheckCircle /> Synchronized</span>
                      ) : (
                        <button onClick={() => onPaySalary(p.id)} style={payBtnStyle}>
                            <FiDollarSign /> Authorize Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. TABLE FOOTER INFO ✅ Strictly Left Aligned */}
        <div style={{ padding: '12px 25px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9', textAlign: 'left' }}>
           <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
              * Verified against Strategic Business Unit workforce directory *
           </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}} />

    </div>
  );
}