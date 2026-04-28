
"use client";

import { useState, useEffect } from 'react';
import Pagination from '@/components/layout/Pagination/Pagination';
// Professional Icons ✅
import { FiDownload, FiFileText, FiCheckCircle, FiClock, FiGlobe, FiMonitor } from 'react-icons/fi';

/**
 * Enterprise OrdersTable - EXECUTIVE SHARP EDITION (Marketplace Linked)
 * Fix: Added "Order Source" tracking (Shopify/WP vs Internal). ✅
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: Enlarged headers (sm scale) and Medium (non-bold) body text. ✅
 * Mobile: Stealth horizontal scroll and nano-scale typography. ✅
 */
export default function OrdersTable({ 
    orders, 
    loading, 
    onDownloadPDF, 
    currentPage, 
    totalItems, 
    itemsPerPage, 
    onPageChange 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '80px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Synchronizing Revenue Ledger...
        </p>
      </div>
    );
  }

  // --- Status Badge Styling ---
  const getStatusStyle = (status) => {
    const base = {
      padding: '3px 10px',
      fontSize: isMobile ? '8px' : '9px',
      fontWeight: '900',
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      borderRadius: '0px',
      border: '0.5px solid'
    };
    if (status === 'Paid' || status === 'Invoiced') return { ...base, backgroundColor: '#ecfdf5', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)' };
    return { ...base, backgroundColor: '#fff7ed', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.2)' };
  };

  // --- Source Badge Styling (Shopify/WP Link) ✅ ---
  const getSourceBadge = (customerSource) => {
    const isExternal = customerSource === 'External Marketplace';
    return (
        <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '4px', 
            marginTop: '4px',
            fontSize: '8px',
            fontWeight: '900',
            textTransform: 'uppercase',
            color: isExternal ? '#4f46e5' : '#94a3b8',
            letterSpacing: '0.05em'
        }}>
            {isExternal ? <FiGlobe size={10} /> : <FiMonitor size={10} />}
            {isExternal ? 'Marketplace Sync' : 'Internal Hub'}
        </div>
    );
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .order-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .order-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="order-table-container" style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        width: '100%'
      }}>
        
        {/* 1. TABLE HEADER SECTION */}
        <div style={{
          padding: isMobile ? '15px' : '30px 40px',
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ backgroundColor: '#0f172a', padding: '10px', display: 'flex' }}>
                <FiFileText style={{ color: '#ffffff', fontSize: '20px' }} />
            </div>
            <div>
                <h3 style={{ fontSize: isMobile ? '15px' : '22px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>
                    Revenue Ledger
                </h3>
                <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0, marginTop: '4px' }}>
                    Authorized Unit Transaction History
                </p>
            </div>
          </div>
        </div>

        {/* 2. RESPONSIVE TABLE BODY ✅ */}
        <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '850px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle(isMobile, 'left')}>Reference</th>
                <th style={thStyle(isMobile, 'left')}>Customer Entity & Source</th>
                <th style={thStyle(isMobile, 'center')}>Posting Date</th>
                <th style={thStyle(isMobile, 'center')}>Status</th>
                <th style={thStyle(isMobile, 'right')}>Net Value (USD)</th>
                <th style={thStyle(isMobile, 'right')}>Documentation</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="order-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    
                    {/* Invoice Reference */}
                    <td style={tdStyle(isMobile)}>
                      <span style={{ fontWeight: '900', color: '#2563eb', fontSize: isMobile ? '10px' : '12.5px', fontFamily: 'monospace' }}>
                        #INV-{order.id}
                      </span>
                    </td>

                    {/* Customer Entity + Source Badge ✅ */}
                    <td style={tdStyle(isMobile)}>
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <div style={{ fontWeight: '500', color: '#334155', textTransform: 'uppercase', fontSize: isMobile ? '11px' : '13.5px' }}>
                            {order.customers?.customer_name || 'Walk-in Client'}
                        </div>
                        {getSourceBadge(order.customers?.source)}
                      </div>
                    </td>

                    {/* Date */}
                    <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                      <span style={{ color: '#94a3b8', fontWeight: '600', fontSize: isMobile ? '9px' : '11px' }}>
                        {new Date(order.order_date).toLocaleDateString('en-CA', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                      <div style={getStatusStyle(order.status)}>
                        {order.status === 'Paid' || order.status === 'Invoiced' ? <FiCheckCircle size={10} /> : <FiClock size={10} />}
                        {order.status}
                      </div>
                    </td>

                    {/* Amount */}
                    <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                      <span style={{ fontSize: isMobile ? '13px' : '16px', fontWeight: '950', color: '#0f172a', fontFamily: 'monospace' }}>
                        ${parseFloat(order.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* PDF Action */}
                    <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                      <button 
                        onClick={() => onDownloadPDF(order)}
                        style={actionBtnStyle(isMobile)}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#0f172a'}
                      >
                        <FiDownload size={isMobile ? 12 : 14} />
                        {!isMobile && "Export PDF"}
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    * No verified records found in unit ledger *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. PAGINATION INTEGRATION */}
      <div style={{ marginTop: '5px' }}>
        <Pagination 
          currentPage={currentPage} 
          totalItems={totalItems} 
          itemsPerPage={itemsPerPage} 
          onPageChange={onPageChange} 
        />
      </div>
    </div>
  );
}

// --- Helper Style Functions ---
const thStyle = (isMobile, align) => ({
  padding: isMobile ? '12px 15px' : '22px 40px',
  fontSize: isMobile ? '9.5px' : '11px', // Slightly larger as requested
  fontWeight: '950',
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  textAlign: align,
  borderBottom: '1px solid #f1f5f9',
  backgroundColor: '#fcfcfd'
});

const tdStyle = (isMobile) => ({
  padding: isMobile ? '12px 15px' : '18px 40px',
  verticalAlign: 'middle'
});

const actionBtnStyle = (isMobile) => ({
  backgroundColor: '#0f172a',
  color: '#ffffff',
  padding: isMobile ? '6px 10px' : '10px 20px',
  fontSize: isMobile ? '8.5px' : '10px',
  fontWeight: '900',
  textTransform: 'uppercase',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  lineHeight: '1',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease'
});