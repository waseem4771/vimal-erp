"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Audit ✅
import { FiCalendar, FiRefreshCw, FiUser, FiActivity, FiDatabase, FiShield, FiClock } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise AttendanceHistory - EXECUTIVE SHARP EDITION (WITH PAGINATION)
 * Purpose: Analytical view for historical staff presence logs.
 * Fix: Integrated Pagination (7 items per page) for large datasets. ✅
 * Fix: Guaranteed smooth horizontal scroll for mobile devices. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function AttendanceHistory({ 
  reportDate, 
  setReportDate, 
  fetchAttendanceReport, 
  history, 
  selectedSbuId 
}) {
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

  // Reset pagination when data or date changes
  useEffect(() => {
    setCurrentPage(1);
  }, [history, reportDate]);

  // --- Pagination Logic ✅ ---
  const totalItems = (history || []).length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistorySlice = (history || []).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // --- Inline Style Constants ---
  const filterBoxStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '15px' : '20px 30px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '30px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'stretch' : 'flex-end',
    gap: '20px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13.5px',
    fontWeight: '700',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  const syncBtnStyle = {
    backgroundColor: '#0f172a', // Executive Dark
    color: '#ffffff',
    padding: isMobile ? '12px' : '14px 35px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: '10.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(15, 23, 42, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    lineHeight: '1'
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
    padding: isMobile ? '10px 15px' : '14px 25px',
    fontSize: isMobile ? '11px' : '13px',
    color: isBold ? '#0f172a' : '#475569',
    fontWeight: isBold ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap' // Prevents text from wrapping on mobile ✅
  });

  const getStatusBadgeStyle = (status) => {
    const base = {
        padding: '3px 10px',
        fontSize: '9px',
        fontWeight: '950',
        textTransform: 'uppercase',
        border: '1px solid',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        lineHeight: '1'
    };
    if (status === 'Present') return { ...base, backgroundColor: '#ecfdf5', color: '#10b981', borderColor: '#d1fae5' };
    if (status === 'Absent') return { ...base, backgroundColor: '#fef2f2', color: '#ef4444', borderColor: '#fee2e2' };
    return { ...base, backgroundColor: '#fff7ed', color: '#f59e0b', borderColor: '#ffedd5' }; // Leave
  };

  return (
    <div style={{ width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .attendance-history-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { height: 4px !important; width: 0px !important; background: transparent !important; }
        .stealth-scroll::-webkit-scrollbar-thumb { background: #e2e8f0 !important; }
        .log-row:hover { background-color: #f8fafc !important; }
        .animate-spin-vip { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />

      <div className="attendance-history-wrapper">
        
        {/* 1. HISTORICAL AUDIT FILTER BAR ✅ */}
        <div style={filterBoxStyle}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <label style={{ fontSize: '9px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiCalendar size={12} /> Target Audit Date
            </label>
            <input 
              type="date" 
              value={reportDate} 
              onChange={(e) => setReportDate(e.target.value)} 
              style={inputStyle}
            />
          </div>
          <button 
            onClick={fetchAttendanceReport} 
            style={syncBtnStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#1e293b')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#0f172a')}
          >
            <FiRefreshCw size={14} />
            <span>Sync Audit Log</span>
          </button>
        </div>

        {/* 2. PRESENCE LEDGER TABLE ✅ With Horizontal Scroll */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Table Header */}
          <div style={{
            padding: isMobile ? '12px 15px' : '18px 25px',
            backgroundColor: '#0f172a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #1e293b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiDatabase style={{ color: '#3b82f6', fontSize: '16px' }} />
                <h3 style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                    Unit Presence History
                </h3>
            </div>
            <span style={{ fontSize: '8px', backgroundColor: '#334155', color: '#94a3b8', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
                Unit {selectedSbuId}
            </span>
          </div>

          <div className="stealth-scroll" style={tableWrapperStyle}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '800px' : '100%' }}>
              <thead>
                <tr>
                  <th style={thStyle('left')}>Personnel Member</th>
                  <th style={thStyle('left')}>Dept / Role</th>
                  <th style={thStyle('center')}>Fulfillment Status</th>
                  <th style={thStyle('right')}>Verification Date</th>
                </tr>
              </thead>
              <tbody>
                {currentHistorySlice.length > 0 ? (
                  currentHistorySlice.map((log) => (
                    <tr key={log.id} className="log-row" style={{ transition: 'all 0.2s' }}>
                      <td style={tdStyle('left', true)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FiUser style={{ color: '#cbd5e1' }} />
                          <span style={{ textTransform: 'uppercase' }}>{log.employees?.full_name}</span>
                        </div>
                        <div style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'monospace', fontWeight: '700', marginTop: '2px', marginLeft: '22px' }}>
                          ID: #{log.employee_id}
                        </div>
                      </td>
                      <td style={tdStyle('left')}>
                        <div style={{ color: '#1e293b', fontWeight: '700', fontSize: '11px' }}>{log.employees?.designation}</div>
                        <div style={{ fontSize: '9px', color: '#3b82f6', fontWeight: '800', textTransform: 'uppercase', marginTop: '2px' }}>
                            {log.employees?.departments?.dept_name || 'Personnel'}
                        </div>
                      </td>
                      <td style={{ ...tdStyle('center') }}>
                        <span style={getStatusBadgeStyle(log.status)}>
                          <FiActivity size={10} style={{ marginRight: '5px' }} />
                          {log.status}
                        </span>
                      </td>
                      <td style={{ ...tdStyle('right'), color: '#94a3b8', fontFamily: 'monospace', fontSize: '11px' }}>
                        {new Date(log.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: '2-digit' })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '80px', textAlign: 'center' }}>
                        <FiClock size={40} style={{ color: '#f1f5f9', marginBottom: '10px' }} />
                        <p style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>* No presence logs synchronized *</p>
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

        {/* 4. TABLE FOOTER INFO ✅ Strictly Left Aligned */}
        <div style={{ paddingLeft: '5px', textAlign: 'left', marginTop: '12px' }}>
           <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, fontStyle: 'italic' }}>
              <FiShield style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              * Presence records are cryptographically verified for audit compliance *
           </p>
        </div>

      </div>
    </div>
  );
}