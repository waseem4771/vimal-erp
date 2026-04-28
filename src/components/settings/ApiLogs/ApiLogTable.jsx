"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Traffic Audit ✅
import { FiClock, FiServer, FiGlobe, FiCode, FiActivity, FiShield, FiDatabase } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise ApiLogTable - EXECUTIVE SHARP EDITION (WITH PAGINATION)
 * Purpose: Detailed ledger for monitoring inbound marketplace API requests.
 * Fix: Integrated Pagination (7 items per page) for high-volume logs. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Stealth horizontal scroll and optimized responsive scaling. ✅
 */
export default function ApiLogTable({ logs, fetching, selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to page 1 whenever the log data changes (e.g., SBU switch)
  useEffect(() => {
    setCurrentPage(1);
  }, [logs]);

  // --- Pagination Logic ---
  const totalItems = logs?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogsSlice = logs?.slice(indexOfFirstItem, indexOfLastItem) || [];
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
    overflowX: 'auto', // Mobile safety ✅
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
    whiteSpace: 'nowrap'
  });

  if (fetching) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin-vip" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>Scanning Traffic Registry...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .api-log-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { height: 4px !important; width: 0px !important; background: transparent !important; }
        .stealth-scroll::-webkit-scrollbar-thumb { background: #e2e8f0 !important; }
        .log-row:hover { background-color: #f8fafc !important; }
        @keyframes spinVip { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-vip { animation: spinVip 1s linear infinite; }
      `}} />

      <div className="api-log-container" style={containerStyle}>
        
        {/* 1. TABLE HEADER ✅ */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiDatabase style={{ color: '#3b82f6', fontSize: '18px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                External Request Ledger
            </h3>
          </div>
          <span style={{ fontSize: '8px', backgroundColor: '#334155', color: '#94a3b8', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
              Unit {selectedSbuId} Status
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '900px' : '100%' }}>
            <thead>
              <tr>
                <th style={thStyle('left')}>Timestamp</th>
                <th style={thStyle('left')}>Platform</th>
                <th style={thStyle('left')}>Endpoint Hit</th>
                <th style={thStyle('center')}>Method</th>
                <th style={thStyle('center')}>Status</th>
                <th style={thStyle('right')}>Data Payload</th>
              </tr>
            </thead>
            <tbody>
              {currentLogsSlice.length > 0 ? (
                currentLogsSlice.map((log) => (
                  <tr key={log.id} className="log-row" style={{ transition: 'all 0.2s' }}>
                    <td style={tdStyle('left')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiClock style={{ color: '#cbd5e1' }} />
                        <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '11px', fontWeight: '700' }}>
                            {new Date(log.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td style={tdStyle('left', true)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiServer style={{ color: '#3b82f6', fontSize: '14px' }} />
                        <span style={{ textTransform: 'uppercase' }}>{log.api_keys?.platform_name || 'Generic'}</span>
                      </div>
                    </td>
                    <td style={tdStyle('left')}>
                      <code style={{ fontSize: '10.5px', color: '#2563eb', fontWeight: '800', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '2px 6px' }}>
                        {log.endpoint_hit}
                      </code>
                    </td>
                    <td style={{ ...tdStyle('center') }}>
                      <span style={{ fontSize: '8.5px', fontWeight: '950', color: log.request_method === 'POST' ? '#f97316' : '#2563eb', textTransform: 'uppercase' }}>
                        {log.request_method}
                      </span>
                    </td>
                    <td style={{ ...tdStyle('center') }}>
                      <span style={{ color: '#10b981', fontSize: '9.5px', fontWeight: '950', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <FiActivity size={10} className="animate-pulse" />
                        {log.response_status} OK
                      </span>
                    </td>
                    <td style={tdStyle('right')}>
                      <div style={{ maxWidth: '180px', marginLeft: 'auto', fontSize: '10px', color: '#cbd5e1', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {log.payload_received || "{ }"}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    * No inbound traffic synchronization detected *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 3. PAGINATION CONTROLS ✅ Strictly Sharp UI */}
        <div style={{ padding: '10px 25px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9' }}>
          <Pagination 
            currentPage={currentPage} 
            totalItems={totalItems} 
            itemsPerPage={itemsPerPage} 
            onPageChange={setCurrentPage} 
          />
        </div>

      </div>

      {/* 4. TABLE FOOTER INFO ✅ Strictly Left Aligned */}
      <div style={{ paddingLeft: '5px', textAlign: 'left' }}>
         <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0, fontStyle: 'italic' }}>
            <FiShield style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Cyber-Security Audit: All marketplace traffic is recorded with IP traceability
         </p>
      </div>

    </div>
  );
}