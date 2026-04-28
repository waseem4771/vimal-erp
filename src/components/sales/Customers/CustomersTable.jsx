"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiDatabase, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise CustomersTable - EXECUTIVE SHARP EDITION (With Pagination)
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for reliable rendering. ✅
 * Mobile: Stealth horizontal scroll and slim row height. ✅
 * Logic: Integrated pagination (7 items per page). ✅
 */
export default function CustomersTable({ customers, loading, selectedSbuId }) {
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

  // Reset pagination if customers list changes (e.g., SBU switch)
  useEffect(() => {
    setCurrentPage(1);
  }, [customers]);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Syncing Unit Client Database...
        </p>
      </div>
    );
  }

  // --- Pagination Logic ---
  const totalItems = customers?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // --- Inline Styles ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
    overflow: 'hidden',
    width: '100%',
    borderRadius: '0px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {/* VVIP CSS INJECTION FOR SHARP EDGES & STEALTH SCROLL ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cust-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .cust-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="cust-table-container" style={containerStyle}>
        
        {/* 1. COMPONENT HEADER */}
        <div style={{
          padding: isMobile ? '10px 15px' : '18px 25px',
          backgroundColor: '#0f172a', // Corporate Dark Header
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiDatabase style={{ color: '#3b82f6', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Active Customer Ledger
            </h3>
          </div>
          <span style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: isMobile ? '2px 8px' : '4px 12px',
            fontSize: isMobile ? '7px' : '9px',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}>
            {totalItems} Entities Linked
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '700px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle(isMobile, 'left')}>Reference ID</th>
                <th style={thStyle(isMobile, 'left')}>Customer Entity</th>
                <th style={thStyle(isMobile, 'left')}>Contact Info</th>
                <th style={thStyle(isMobile, 'left')}>Billing Location</th>
                <th style={thStyle(isMobile, 'right')}>Registered Date</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.length > 0 ? (
                currentCustomers.map((c) => (
                  <tr key={c.id} className="cust-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    
                    <td style={tdStyle(isMobile)}>
                      <span style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: isMobile ? '9px' : '12px', fontWeight: '700' }}>
                        #{c.id}
                      </span>
                    </td>

                    <td style={tdStyle(isMobile)}>
                      <div style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', fontSize: isMobile ? '10.5px' : '13.5px' }}>
                        {c.customer_name}
                      </div>
                    </td>

                    <td style={tdStyle(isMobile)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiMail style={{ color: '#64748b', fontSize: '11px' }} />
                        <span style={{ color: '#475569', fontWeight: '700', fontSize: isMobile ? '9.5px' : '13px' }}>{c.email || 'N/A'}</span>
                      </div>
                    </td>

                    <td style={tdStyle(isMobile)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', maxWidth: '220px' }}>
                        <FiMapPin style={{ color: '#94a3b8', fontSize: '12px' }} />
                        <span style={{ color: '#64748b', fontSize: isMobile ? '9.5px' : '12px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                           {c.address || 'No address'}
                        </span>
                      </div>
                    </td>

                    <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                      <span style={{ color: '#94a3b8', fontWeight: '800', fontSize: isMobile ? '8.5px' : '11px', textTransform: 'uppercase' }}>
                        {new Date(c.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    * No records found *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SYSTEM PAGINATION - Visible if more than 1 page ✅ */}
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

// --- Helper Styles ---
const thStyle = (isMobile, align) => ({
  padding: isMobile ? '10px 12px' : '15px 25px',
  fontSize: isMobile ? '8.5px' : '10px',
  fontWeight: '950',
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  textAlign: align,
  borderBottom: '1px solid #f1f5f9'
});

const tdStyle = (isMobile) => ({
  // Vertical padding reduced to 8px for mobile to keep it slim ✅
  padding: isMobile ? '8px 12px' : '16px 25px', 
  verticalAlign: 'middle'
});