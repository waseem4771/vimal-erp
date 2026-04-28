"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Capital Ledger ✅
import { FiClock, FiBriefcase, FiArrowDownLeft, FiArrowUpRight, FiActivity, FiDatabase, FiShield } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise FundHistoryTable - EXECUTIVE SHARP EDITION (HORIZONTAL SCROLL FIXED)
 * Purpose: Detailed ledger for tracking capital flow with guaranteed mobile horizontal scroll.
 * Fix: Removed Cards and forced Table with min-width and touch-scroll. ✅
 * Fix: Locked columns with white-space: nowrap to prevent text crushing. ✅
 * Fix: Handled Pagination props correctly. ✅
 */
export default function FundHistoryTable({ history, loading, selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [history]);

  // --- Pagination Logic ---
  const totalItems = history?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistorySlice = history.slice(indexOfFirstItem, indexOfLastItem);
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
    padding: isMobile ? '12px 15px' : '15px 25px',
    backgroundColor: '#0f172a', // Corporate Dark
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  // --- VVIP: Table Scroll Logic ✅ ---
  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Horizontal scroll enabled
    backgroundColor: '#ffffff',
    display: 'block',
    WebkitOverflowScrolling: 'touch', // Smooth touch for mobile
    msOverflowStyle: '-ms-autohiding-scrollbar'
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
    whiteSpace: 'nowrap' // Text wrap hone se rokta hai ✅
  });

  const tdStyle = (align = 'left', isBold = false) => ({
    padding: isMobile ? '10px 15px' : '14px 25px',
    fontSize: isMobile ? '11px' : '13px',
    color: isBold ? '#0f172a' : '#475569',
    fontWeight: isBold ? '800' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap' // Columns ko wide rakhta hai ✅
  });

  if (loading) {
    return (
      <div style={{ padding: '80px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin-vip" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Syncing Capital Ledger...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '100vw' }}>
      
      {/* VVIP CSS INJECTION FOR SHARP EDGES & SCROLLBAR ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .fund-ledger-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { height: 4px !important; width: 0px !important; background: transparent !important; }
        .stealth-scroll::-webkit-scrollbar-thumb { background: #e2e8f0 !important; }
        .fund-row:hover { background-color: #f8fafc !important; }
        @keyframes spinVip { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-vip { animation: spinVip 1s linear infinite; }
      `}} />

      <div className="fund-ledger-container" style={containerStyle}>
        
        {/* 1. TABLE HEADER */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiDatabase style={{ color: '#3b82f6', fontSize: '18px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Authorized Capital Registry
            </h3>
          </div>
          <span style={{ fontSize: '8px', backgroundColor: '#2563eb', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
              Audit Ready
          </span>
        </div>

        {/* 2. RESPONSIVE TABLE WITH SCROLL LOCK ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              minWidth: isMobile ? '850px' : '1000px' // Table ko Wide rakha hai
          }}>
            <thead>
              <tr>
                <th style={thStyle('left')}>Transaction Date</th>
                <th style={thStyle('left')}>Subsidiary Unit</th>
                <th style={thStyle('left')}>Type</th>
                <th style={thStyle('left')}>Audit Description</th>
                <th style={thStyle('right')}>Net Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              {currentHistorySlice.length > 0 ? (
                currentHistorySlice.map((item) => (
                  <tr key={item.id} className="fund-row" style={{ transition: 'all 0.2s' }}>
                    
                    {/* Date */}
                    <td style={tdStyle('left')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiClock style={{ color: '#cbd5e1' }} />
                        <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '11px', fontWeight: '700' }}>
                            {new Date(item.transfer_date).toLocaleDateString('en-CA')}
                        </span>
                      </div>
                    </td>

                    {/* Unit */}
                    <td style={tdStyle('left', true)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FiBriefcase style={{ color: '#3b82f6' }} />
                            <span style={{ textTransform: 'uppercase' }}>{item.sbus?.sbu_name}</span>
                        </div>
                    </td>

                    {/* Type Badge */}
                    <td style={tdStyle('left')}>
                        <span style={{ 
                            backgroundColor: item.transfer_type === 'Allocation' ? '#eff6ff' : '#ecfdf5', 
                            color: item.transfer_type === 'Allocation' ? '#2563eb' : '#10b981', 
                            padding: '3px 10px', fontSize: '9px', fontWeight: '950', textTransform: 'uppercase', border: '1px solid',
                            display: 'inline-flex', alignItems: 'center', gap: '5px'
                        }}>
                            {item.transfer_type === 'Allocation' ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                            {item.transfer_type.replace('_', ' ')}
                        </span>
                    </td>

                    {/* Memo */}
                    <td style={tdStyle('left')}>
                        <div style={{ fontSize: '11.5px', color: '#64748b', fontStyle: 'italic' }}>
                            {item.description}
                        </div>
                    </td>

                    {/* Amount */}
                    <td style={{ ...tdStyle('right', true), fontSize: '16px', fontFamily: 'monospace', color: item.transfer_type === 'Allocation' ? '#2563eb' : '#10b981' }}>
                        ${parseFloat(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan="5" style={{ padding: '80px', textAlign: 'center' }}>
                        <FiActivity size={40} style={{ color: '#f1f5f9', marginBottom: '10px' }} />
                        <p style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No capital transactions detected *</p>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 3. PAGINATION CONTROLS ✅ Fixed Prop Name */}
        <div style={{ padding: '10px 20px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9' }}>
          <Pagination 
            currentPage={currentPage} 
            totalItems={totalItems} 
            itemsPerPage={itemsPerPage} 
            onPageChange={setCurrentPage} 
          />
        </div>

      </div>

      {/* FOOTER ANALYTICS NOTICE ✅ */}
      <div style={{ textAlign: 'left', paddingLeft: '5px' }}>
         <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
            * Authorized capital movement ledger for Unit {selectedSbuId || "the organization"} *
         </p>
      </div>

    </div>
  );
}