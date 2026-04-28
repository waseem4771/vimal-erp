"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Security Audit ✅
import { FiClock, FiUser, FiShield, FiDatabase, FiCpu, FiActivity } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise AuditLogsTable - EXECUTIVE SHARP EDITION (SCROLL FIXED)
 * Purpose: Monitors organizational activity trail with smooth mobile horizontal scroll.
 * Fix: Forced Table view on all screens with smooth horizontal overflow. ✅
 * Fix: Added -webkit-overflow-scrolling for native mobile touch feel. ✅
 * Fix: Defined 'tableWrapperStyle' correctly to prevent ReferenceError. ✅
 */
export default function AuditLogsTable({ 
    logs, 
    loading, 
    currentPage, 
    totalItems, 
    itemsPerPage, 
    onPageChange,
    selectedSbuId 
}) {
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
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden' // Root hidden to keep shadow clean
  };

  const headerStyle = {
    padding: isMobile ? '12px 15px' : '15px 25px',
    backgroundColor: '#0f172a', // Corporate Dark Slate
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  // --- FIXED: tableWrapperStyle with native touch scroll support ✅ ---
  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', 
    backgroundColor: '#ffffff',
    WebkitOverflowScrolling: 'touch', // Smooth scroll for iOS/Android ✅
    msOverflowStyle: '-ms-autohiding-scrollbar'
  };

  const thStyle = (align = 'left') => ({
    padding: isMobile ? '12px 15px' : '15px 25px',
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
    fontWeight: isBold ? '800' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap' // Table columns ko crush hone se rokta hai ✅
  });

  const getActionBadgeStyle = (action) => {
    const isCritical = action.includes('DELETE') || action.includes('REVOKE') || action.includes('UNAUTHORIZED');
    return {
        backgroundColor: isCritical ? '#fef2f2' : '#eff6ff',
        color: isCritical ? '#ef4444' : '#2563eb',
        padding: '2px 8px',
        fontSize: '8.5px',
        fontWeight: '950',
        textTransform: 'uppercase',
        border: `1px solid ${isCritical ? '#fee2e2' : '#dbeafe'}`,
        display: 'inline-block',
        lineHeight: '1'
    };
  };

  if (loading) {
    return (
      <div style={{ padding: '80px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin-vip" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Retrieving Security Ledger...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '100vw' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .audit-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { height: 4px !important; width: 0px !important; background: transparent !important; }
        .stealth-scroll::-webkit-scrollbar-thumb { background: #e2e8f0 !important; }
        .audit-row:hover { background-color: #f8fafc !important; }
        @keyframes spinVip { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-vip { animation: spinVip 1s linear infinite; }
      `}} />

      <div className="audit-table-container" style={containerStyle}>
        
        {/* 1. TABLE HEADER ✅ */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiShield style={{ color: '#3b82f6', fontSize: '18px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Internal Security Ledger
            </h3>
          </div>
          <span style={{ fontSize: '8px', backgroundColor: '#f97316', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
              Live Monitoring
          </span>
        </div>

        {/* 2. SMOOTH HORIZONTAL SCROLL TABLE AREA ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              minWidth: isMobile ? '900px' : '1000px' // Mobile par width lock taake scroll active ho ✅
          }}>
            <thead>
              <tr>
                <th style={thStyle('left')}>Timestamp</th>
                <th style={thStyle('left')}>Administrative Identity</th>
                <th style={thStyle('left')}>Action Event</th>
                <th style={thStyle('center')}>Module</th>
                <th style={thStyle('center')}>Network IP</th>
                <th style={thStyle('right')}>Audit Details</th>
              </tr>
            </thead>
            <tbody>
              {logs && logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="audit-row" style={{ transition: 'all 0.2s' }}>
                  
                  {/* Date */}
                  <td style={tdStyle('left')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiClock style={{ color: '#cbd5e1' }} />
                      <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '11px', fontWeight: '700' }}>
                        {new Date(log.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>

                  {/* Identity */}
                  <td style={tdStyle('left', true)}>
                    <div style={{ textTransform: 'uppercase', fontSize: '12px' }}>{log.users?.full_name || "System Process"}</div>
                    <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700' }}>{log.users?.email || "automated-sync"}</div>
                  </td>

                  {/* Action Badge */}
                  <td style={tdStyle('left')}>
                    <span style={getActionBadgeStyle(log.action)}>{log.action.replace('_', ' ')}</span>
                  </td>

                  {/* Module */}
                  <td style={{ ...tdStyle('center'), color: '#2563eb', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px' }}>
                    {log.module}
                  </td>

                  {/* IP Address */}
                  <td style={{ ...tdStyle('center'), fontFamily: 'monospace', color: '#94a3b8', fontSize: '11px' }}>
                    {log.ip_address}
                  </td>

                  {/* Details (Truncated) */}
                  <td style={tdStyle('right')}>
                    <div style={{ maxWidth: '180px', marginLeft: 'auto', fontSize: '10px', color: '#cbd5e1', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis' }} title={log.details}>
                      {log.details || "{ }"}
                    </div>
                  </td>

                </tr>
              )) : (
                <tr>
                    <td colSpan="6" style={{ padding: '80px', textAlign: 'center' }}>
                        <FiActivity size={40} style={{ color: '#f1f5f9', marginBottom: '10px' }} />
                        <p style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No internal actions recorded *</p>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 3. PAGINATION CONTROLS ✅ Strictly Left-to-Right */}
        <div style={{ padding: '10px 20px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9' }}>
          <Pagination 
            currentPage={currentPage} 
            totalItems={totalItems} 
            itemsPerPage={itemsPerPage} 
            onPageChange={onPageChange} 
          />
        </div>

      </div>

      {/* FOOTER NOTICE ✅ Strictly Left Aligned */}
      <div style={{ textAlign: 'left', paddingLeft: '5px' }}>
         <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
            * Authorized access only - Immutable security trail for Unit {selectedSbuId || "Mother Hub"} *
         </p>
      </div>

    </div>
  );
}