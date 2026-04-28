"use client";

import { useState, useEffect } from 'react';
// Professional Icons for HR/Audit ✅
import { FiClock, FiUser, FiCalendar, FiCheckCircle, FiXCircle, FiLayers, FiDatabase, FiActivity } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise LeaveTable - EXECUTIVE SHARP EDITION (WITH PAGINATION)
 * Purpose: Unified ledger for monitoring and authorizing employee leave requests.
 * Fix: Integrated Pagination (7 items per page) for long-term records. ✅
 * Fix: Guaranteed smooth horizontal scroll for mobile devices. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function LeaveTable({ requests, loading, onUpdateStatus }) {
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
  }, [requests]);

  // --- Pagination Logic ✅ ---
  const totalItems = (requests || []).length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequestsSlice = (requests || []).slice(indexOfFirstItem, indexOfLastItem);
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

  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Mobile horizontal scroll trigger ✅
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
    fontSize: isMobile ? '11.5px' : '13px',
    color: isBold ? '#0f172a' : '#475569',
    fontWeight: isBold ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap' // Prevents text crushing on mobile ✅
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
    if (status === 'Approved') return { ...base, backgroundColor: '#ecfdf5', color: '#10b981', borderColor: '#d1fae5' };
    if (status === 'Rejected') return { ...base, backgroundColor: '#fef2f2', color: '#ef4444', borderColor: '#fee2e2' };
    return { ...base, backgroundColor: '#fff7ed', color: '#f59e0b', borderColor: '#ffedd5' }; // Pending
  };

  const actionBtnStyle = (type) => ({
    backgroundColor: type === 'approve' ? '#10b981' : '#ef4444',
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
          Syncing Absence Ledger...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '100vw' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .leave-table-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { height: 4px !important; width: 0px !important; background: transparent !important; }
        .stealth-scroll::-webkit-scrollbar-thumb { background: #e2e8f0 !important; }
        .leave-row:hover { background-color: #f8fafc !important; }
        @keyframes spinVip { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-vip { animation: spinVip 1s linear infinite; }
      `}} />

      <div className="leave-table-wrapper" style={containerStyle}>
        
        {/* 1. TABLE HEADER ✅ */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiDatabase style={{ color: '#818cf8', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Personnel Absence Ledger
            </h3>
          </div>
          <span style={{ fontSize: '8px', backgroundColor: '#4f46e5', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
            {totalItems} Requests Logged
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '850px' : '100%' }}>
            <thead>
              <tr>
                <th style={thStyle('left')}>Staff Member</th>
                <th style={thStyle('left')}>Classification</th>
                <th style={thStyle('center')}>Period (Dates)</th>
                <th style={thStyle('left')}>Audit Memo</th>
                <th style={thStyle('center')}>Status</th>
                <th style={thStyle('right')}>System Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRequestsSlice.length > 0 ? (
                currentRequestsSlice.map((leave) => (
                  <tr key={leave.id} className="leave-row" style={{ transition: 'all 0.2s' }}>
                    
                    <td style={tdStyle('left', true)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiUser style={{ color: '#cbd5e1' }} />
                        <span style={{ textTransform: 'uppercase' }}>{leave.employees?.full_name}</span>
                      </div>
                      <div style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'monospace', fontWeight: '700', marginTop: '2px', marginLeft: '22px' }}>
                        ID: #{leave.id}
                      </div>
                    </td>

                    <td style={tdStyle('left')}>
                      <div style={{ color: '#4f46e5', fontWeight: '800', fontSize: '10px', textTransform: 'uppercase' }}>{leave.leave_type}</div>
                      <div style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>Category</div>
                    </td>

                    <td style={{ ...tdStyle('center'), color: '#475569', fontSize: '11px', fontFamily: 'monospace' }}>
                        <div style={{ fontWeight: '800' }}>{new Date(leave.start_date).toLocaleDateString('en-CA', { day: '2-digit', month: 'short' })}</div>
                        <div style={{ fontSize: '9px', color: '#cbd5e1' }}>to</div>
                        <div style={{ fontWeight: '800' }}>{new Date(leave.end_date).toLocaleDateString('en-CA', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    </td>

                    <td style={tdStyle('left')}>
                      <div style={{ fontSize: '11.5px', color: '#64748b', fontStyle: 'italic', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={leave.reason}>
                        {leave.reason || "Authorized absence"}
                      </div>
                    </td>

                    <td style={{ ...tdStyle('center') }}>
                      <span style={getStatusBadgeStyle(leave.status)}>
                        <FiClock size={10} style={{ marginRight: '4px' }} />
                        {leave.status}
                      </span>
                    </td>

                    <td style={tdStyle('right')}>
                      {leave.status === 'Pending' ? (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button 
                            onClick={() => onUpdateStatus(leave.id, 'Approved')}
                            style={actionBtnStyle('approve')}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
                            onMouseOut={(e) => (e.target.style.backgroundColor = '#10b981')}
                          >
                            <FiCheckCircle size={12} />
                          </button>
                          <button 
                            onClick={() => onUpdateStatus(leave.id, 'Rejected')}
                            style={actionBtnStyle('reject')}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
                            onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
                          >
                            <FiXCircle size={12} />
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '9px', color: '#cbd5e1', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic' }}>
                            Decision Logged
                        </span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '80px', textAlign: 'center' }}>
                      <FiActivity size={40} style={{ color: '#f1f5f9', marginBottom: '10px' }} />
                      <p style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No leave records found *</p>
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
            * Verified personnel leave ledger - authorized unit records *
         </p>
      </div>

    </div>
  );
}