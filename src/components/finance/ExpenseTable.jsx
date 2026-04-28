

"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiFileText, FiDownload, FiDatabase, FiActivity } from 'react-icons/fi';
// Reusable Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise ExpenseTable - EXECUTIVE SHARP EDITION (WITH PAGINATION)
 * Purpose: Detailed ledger for monitoring unit expenditure history.
 * Fix: Integrated Pagination (7 items per page) for high-volume transactions. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Stealth horizontal scroll and optimized responsive scaling. ✅
 */
export default function ExpenseTable({ expenses, loading }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // --- Pagination State ✅ ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to page 1 whenever the expense data changes (e.g., SBU switch)
  useEffect(() => {
    setCurrentPage(1);
  }, [expenses]);

  /**
   * Logic: Resolve the base backend URL for static file serving.
   */
  const backendBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');

  // --- Pagination Logic ✅ ---
  const totalItems = (expenses || []).length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpensesSlice = (expenses || []).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
    padding: isMobile ? '12px 15px' : '18px 25px',
    backgroundColor: '#0f172a', // Corporate Dark Header
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Mobile safety trigger ✅
    backgroundColor: '#ffffff',
    WebkitOverflowScrolling: 'touch' // Native smooth scroll on mobile
  };

  const thStyle = (align = 'left') => ({
    padding: isMobile ? '12px 12px' : '18px 25px',
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
    padding: isMobile ? '10px 12px' : '16px 25px',
    fontSize: isMobile ? '11.5px' : '13px',
    color: isAmount ? '#0f172a' : '#475569',
    fontWeight: isAmount ? '950' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    fontFamily: isAmount ? 'monospace' : 'inherit',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  });

  const actionBtnStyle = {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: isMobile ? '6px 10px' : '8px 16px',
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    lineHeight: '1',
    textDecoration: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  };

  if (loading) {
    return (
      <div style={{ padding: '80px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin-vip" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #f59e0b', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Synchronizing Unit Expenditure Ledger...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .exp-table-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { height: 4px !important; width: 0px !important; background: transparent !important; }
        .stealth-scroll::-webkit-scrollbar-thumb { background: #e2e8f0 !important; }
        .exp-row:hover { background-color: #f8fafc !important; }
        @keyframes spinVip { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-vip { animation: spinVip 1s linear infinite; }
      `}} />

      <div className="exp-table-wrapper" style={containerStyle}>
        
        {/* 1. COMPONENT HEADER ✅ */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiDatabase style={{ color: '#f59e0b', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Authorized Transaction History
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
            {totalItems} Entries Verified
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '800px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle('left')}>Posting Date</th>
                <th style={thStyle('left')}>Accounting Category</th>
                <th style={thStyle('left')}>Memo / Description</th>
                <th style={thStyle('left')}>Amount (USD)</th>
                <th style={thStyle('right')}>Verification</th>
              </tr>
            </thead>
            <tbody>
              {currentExpensesSlice.length > 0 ? (
                currentExpensesSlice.map((exp) => (
                  <tr key={exp.id} className="exp-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    
                    <td style={tdStyle('left')}>
                      <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: isMobile ? '10px' : '12px', fontWeight: '700' }}>
                        {new Date(exp.expense_date).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </td>

                    <td style={tdStyle('left')}>
                      <span style={{
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        padding: '3px 10px',
                        fontSize: isMobile ? '8.5px' : '10px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        border: '1px solid #dbeafe',
                        display: 'inline-block',
                        lineHeight: '1'
                      }}>
                        {exp.chart_of_accounts?.account_name}
                      </span>
                    </td>

                    <td style={tdStyle('left')}>
                      <div style={{ color: '#64748b', fontSize: isMobile ? '10px' : '12.5px', fontWeight: '600', fontStyle: 'italic', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                         {exp.description || "Authorized disbursement"}
                      </div>
                    </td>

                    <td style={tdStyle('left', true)}>
                      <span style={{ fontSize: isMobile ? '13px' : '16px', fontFamily: 'monospace' }}>
                        ${parseFloat(exp.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    <td style={{ ...tdStyle('right'), textAlign: 'right' }}>
                      {exp.invoice_url ? (
                        <a 
                          href={`${backendBaseUrl}${exp.invoice_url}`} 
                          target="_blank" 
                          rel="noreferrer"
                          style={actionBtnStyle}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; }}
                        >
                          <FiDownload size={isMobile ? 12 : 14} />
                          {!isMobile && "View"}
                        </a>
                      ) : (
                        <span style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', fontStyle: 'italic' }}>
                           No PDF
                        </span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '80px', textAlign: 'center' }}>
                      <FiActivity size={40} style={{ color: '#f1f5f9', marginBottom: '10px' }} />
                      <p style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No expense history detected *</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 3. PAGINATION CONTROLS ✅ Strictly Sharp UI */}
        {totalPages > 1 && (
            <div style={{ padding: '10px 20px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9' }}>
                <Pagination 
                    currentPage={currentPage} 
                    totalItems={totalItems} 
                    itemsPerPage={itemsPerPage} 
                    onPageChange={setCurrentPage} 
                />
            </div>
        )}

      </div>

      {/* FOOTER NOTICE ✅ Strictly Left Aligned */}
      <div style={{ textAlign: 'left', paddingLeft: '5px' }}>
         <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, fontStyle: 'italic' }}>
            * Transaction records synchronized with Unit general ledger *
         </p>
      </div>
    </div>
  );
}