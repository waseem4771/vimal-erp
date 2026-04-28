"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Sales ✅ Added FiUser
import { FiFileText, FiDownload, FiCheckCircle, FiClock, FiActivity, FiDatabase, FiUser } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise QuotesTable - EXECUTIVE SHARP EDITION (FIXED)
 * Purpose: Detailed ledger for monitoring and authorizing sales quotations.
 * Fix: Added missing FiUser import to resolve ReferenceError. ✅
 * Fix: Integrated Pagination (7 items per page) for professional data handling. ✅
 * Fix: Guaranteed smooth horizontal scroll for mobile devices. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function QuotesTable({ quotes, loading, onConvert, onPDF, selectedSbuId }) {
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

  // Reset pagination when data changes (e.g. SBU switch)
  useEffect(() => {
    setCurrentPage(1);
  }, [quotes]);

  // --- Pagination Logic ✅ ---
  const totalItems = (quotes || []).length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuotesSlice = (quotes || []).slice(indexOfFirstItem, indexOfLastItem);
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
    backgroundColor: '#0f172a', // Corporate Dark
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Horizontal scroll safety ✅
    backgroundColor: '#ffffff',
    WebkitOverflowScrolling: 'touch'
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

  const tdStyle = (align = 'left', isBold = false) => ({
    padding: isMobile ? '10px 12px' : '14px 25px',
    fontSize: isMobile ? '11px' : '13px',
    color: isBold ? '#0f172a' : '#475569',
    fontWeight: isBold ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap' // Columns ko wide rakhta hai ✅
  });

  const getStatusBadgeStyle = (status) => {
    const base = {
      padding: '3px 10px',
      fontSize: '8.5px',
      fontWeight: '950',
      textTransform: 'uppercase',
      border: '1px solid',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      lineHeight: '1'
    };
    if (status === 'Converted') return { ...base, backgroundColor: '#ecfdf5', color: '#10b981', borderColor: '#d1fae5' };
    return { ...base, backgroundColor: '#eff6ff', color: '#4f46e5', borderColor: '#dbeafe' }; // Draft/Pending
  };

  const actionBtnStyle = (color) => ({
    backgroundColor: color,
    color: '#ffffff',
    padding: '6px 12px',
    fontSize: '8.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '0px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
    lineHeight: '1'
  });

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin-vip" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #4f46e5', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Authenticating Proposals Ledger...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '100vw' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .quote-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { height: 4px !important; width: 0px !important; background: transparent !important; }
        .stealth-scroll::-webkit-scrollbar-thumb { background: #e2e8f0 !important; }
        .quote-row:hover { background-color: #f5f3ff !important; }
        @keyframes spinVip { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-vip { animation: spinVip 1s linear infinite; }
      `}} />

      <div className="quote-table-container" style={containerStyle}>
        
        {/* 1. COMPONENT HEADER ✅ */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiDatabase style={{ color: '#818cf8', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Verified Proposal Ledger
            </h3>
          </div>
          <span style={{ fontSize: '8px', backgroundColor: '#4f46e5', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
            {totalItems} Quotes Tracked
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '850px' : '100%' }}>
            <thead>
              <tr>
                <th style={thStyle('left')}>Proposal ID</th>
                <th style={thStyle('left')}>Prospect Entity</th>
                <th style={thStyle('center')}>Fulfillment Status</th>
                <th style={thStyle('right')}>Net Value (USD)</th>
                <th style={thStyle('right')}>Workflow Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentQuotesSlice.length > 0 ? (
                currentQuotesSlice.map((quote) => (
                  <tr key={quote.id} className="quote-row" style={{ transition: 'all 0.2s' }}>
                    
                    {/* Proposal ID */}
                    <td style={tdStyle('left', true)}>
                      <div style={{ fontWeight: '900', color: '#4f46e5', fontSize: isMobile ? '11px' : '13px', fontFamily: 'monospace' }}>
                        #QT-{quote.id}
                      </div>
                      <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700', marginTop: '2px' }}>
                        EXP: {quote.valid_until ? new Date(quote.valid_until).toLocaleDateString('en-CA') : 'STABLE'}
                      </div>
                    </td>

                    {/* Prospect Name */}
                    <td style={tdStyle('left')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiUser style={{ color: '#cbd5e1' }} />
                        <span style={{ textTransform: 'uppercase', fontWeight: '800' }}>{quote.customers?.customer_name || 'Direct Inquiry'}</span>
                      </div>
                    </td>

                    {/* Status Badge ✅ */}
                    <td style={{ ...tdStyle('center') }}>
                      <span style={getStatusBadgeStyle(quote.status)}>
                        {quote.status === 'Converted' ? <FiCheckCircle size={10} /> : <FiClock size={10} />}
                        <span style={{marginLeft: '4px'}}>{quote.status}</span>
                      </span>
                    </td>

                    {/* Value ✅ */}
                    <td style={{ ...tdStyle('right', true), fontSize: isMobile ? '14px' : '16px', fontFamily: 'monospace' }}>
                      ${parseFloat(quote.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Actions Group ✅ */}
                    <td style={tdStyle('right')}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        {quote.status !== 'Converted' && (
                          <button 
                            onClick={() => onConvert(quote.id)}
                            style={actionBtnStyle('#4f46e5')}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#4338ca')}
                            onMouseOut={(e) => (e.target.style.backgroundColor = '#4f46e5')}
                          >
                             Invoice
                          </button>
                        )}
                        <button 
                          onClick={() => onPDF(quote)}
                          style={actionBtnStyle('#334155')}
                          onMouseOver={(e) => (e.target.style.backgroundColor = '#0f172a')}
                          onMouseOut={(e) => (e.target.style.backgroundColor = '#334155')}
                        >
                          <FiDownload />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '80px', textAlign: 'center' }}>
                      <FiActivity size={40} style={{ color: '#f1f5f9', marginBottom: '10px' }} />
                      <p style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No active business proposals *</p>
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

      {/* 4. FOOTER INFO ✅ Strictly Left Aligned */}
      <div style={{ textAlign: 'left', paddingLeft: '5px' }}>
         <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, fontStyle: 'italic' }}>
            * Strategic unit quotation records synchronized with audit trail *
         </p>
      </div>

    </div>
  );
}