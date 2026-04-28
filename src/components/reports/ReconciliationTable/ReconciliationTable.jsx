
"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiCalendar, FiCheckCircle, FiDatabase } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise ReconciliationTable - EXECUTIVE SLIM EDITION (With Pagination)
 * Fix: Reduced text boldness for descriptions. ✅
 * Fix: Reduced vertical padding for all screens. ✅
 * Fix: Integrated Pagination (7 items per page). ✅
 * Fix: Slimmed "Match with Bank" button with single-line lock. ✅
 */
export default function ReconciliationTable({ entries, loading, onMatch }) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Ek page par siraf 7 rows ✅

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset pagination if data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [entries]);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Analyzing Ledger for Unverified Transactions...
        </p>
      </div>
    );
  }

  // --- Pagination Logic ---
  const totalItems = entries?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntries = entries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    overflow: 'hidden',
    width: '100%',
    borderRadius: '0px'
  };

  const tableHeaderStyle = {
    // Reduced padding for slim look ✅
    padding: isMobile ? '10px 15px' : '15px 25px',
    backgroundColor: '#0f172a',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* VVIP CSS INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .recon-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .recon-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="recon-table-container" style={containerStyle}>
        
        {/* 1. COMPONENT HEADER */}
        <div style={tableHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiDatabase style={{ color: '#3b82f6', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Pending Bank Matching
            </h3>
          </div>
          <span style={{
            backgroundColor: '#f59e0b',
            color: '#ffffff',
            padding: '2px 8px',
            fontSize: '7px',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}>
            {totalItems} Pending
          </span>
        </div>

        {/* 2. RESPONSIVE TABLE ✅ */}
        <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '750px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle(isMobile, 'left')}>Transaction Date</th>
                <th style={thStyle(isMobile, 'left')}>Description / Reference</th>
                <th style={thStyle(isMobile, 'center')}>Debit (+)</th>
                <th style={thStyle(isMobile, 'center')}>Credit (-)</th>
                <th style={thStyle(isMobile, 'right')}>System Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.length > 0 ? (
                currentEntries.map((entry) => (
                  <tr key={entry.id} className="recon-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    
                    <td style={tdStyle(isMobile)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiCalendar style={{ color: '#94a3b8' }} />
                        <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: isMobile ? '10px' : '12px', fontWeight: '700' }}>
                           {new Date(entry.journal_entries?.transaction_date).toLocaleDateString('en-CA')}
                        </span>
                      </div>
                    </td>

                    <td style={tdStyle(isMobile)}>
                      {/* Boldness reduced from 800 to 600 ✅ */}
                      <div style={{ fontWeight: '600', color: '#1e293b', textTransform: 'uppercase', fontSize: isMobile ? '10.5px' : '13px' }}>
                        {entry.journal_entries?.description}
                      </div>
                      <div style={{ fontSize: '9px', color: '#2563eb', fontWeight: '800', textTransform: 'uppercase', marginTop: '2px' }}>
                        REF: {entry.journal_entries?.reference_no || 'INTERNAL'}
                      </div>
                    </td>

                    <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                      <span style={{ fontSize: isMobile ? '12px' : '15px', fontWeight: '950', color: parseFloat(entry.debit) > 0 ? '#10b981' : '#cbd5e1', fontFamily: 'monospace' }}>
                        {parseFloat(entry.debit) > 0 ? `+$${parseFloat(entry.debit).toLocaleString()}` : "—"}
                      </span>
                    </td>

                    <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                      <span style={{ fontSize: isMobile ? '12px' : '15px', fontWeight: '950', color: parseFloat(entry.credit) > 0 ? '#f43f5e' : '#cbd5e1', fontFamily: 'monospace' }}>
                        {parseFloat(entry.credit) > 0 ? `-$${parseFloat(entry.credit).toLocaleString()}` : "—"}
                      </span>
                    </td>

                    <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                      <button 
                        onClick={() => onMatch(entry.id)}
                        style={{
                          backgroundColor: '#2563eb',
                          color: '#ffffff',
                          border: 'none',
                          // Button padding reduced vertically ✅
                          padding: isMobile ? '5px 10px' : '7px 18px',
                          fontSize: isMobile ? '8px' : '10px',
                          fontWeight: '900',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
                          transition: 'all 0.2s',
                          // Forced single line text ✅
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <FiCheckCircle size={isMobile ? 12 : 14} />
                        Match with Bank
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No unmatched entries *</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. PAGINATION INTEGRATION ✅ */}
      {totalPages > 1 && (
        <div style={{ marginTop: '5px' }}>
          <Pagination 
            currentPage={currentPage} 
            totalItems={totalItems} 
            itemsPerPage={itemsPerPage} 
            onPageChange={setCurrentPage} 
          />
        </div>
      )}
    </div>
  );
}

// --- Helper Styles (Slimmed down) ---
const thStyle = (isMobile, align) => ({
  // Vertical padding reduced from 15px to 10px ✅
  padding: isMobile ? '10px 12px' : '10px 25px',
  fontSize: isMobile ? '8.5px' : '10px',
  fontWeight: '950',
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  textAlign: align,
  borderBottom: '1px solid #f1f5f9'
});

const tdStyle = (isMobile) => ({
  // Vertical padding reduced from 18px to 10px for slim rows ✅
  padding: isMobile ? '10px 12px' : '10px 25px',
  verticalAlign: 'middle',
  textAlign: 'left'
});