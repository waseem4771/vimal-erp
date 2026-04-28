

"use client";

import { useState, useEffect } from 'react';
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise StockTable - EXECUTIVE SHARP EDITION
 * Fix: SKU text locked to single line on mobile (no wrapping). ✅
 * Fix: Badges (Status & SKU) vertical thickness minimized. ✅
 * Fix: Forced 0px Border Radius on all elements. ✅
 */
export default function StockTable({ stock, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Data Slicing Logic
  const totalItems = stock?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStock = stock.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-r-transparent mb-4"></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Synchronizing Warehouse...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .stock-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .stock-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="stock-table-container" style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        overflow: 'hidden',
        width: '100%'
      }}>
        
        {/* 1. COMPONENT HEADER */}
        <div style={{
          padding: isMobile ? '12px 15px' : '18px 25px',
          backgroundColor: '#0f172a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '3px', height: '15px', backgroundColor: '#3b82f6' }}></div>
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Stock Intelligence Repository
            </h3>
          </div>
          <span style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            padding: isMobile ? '2px 8px' : '4px 12px',
            fontSize: isMobile ? '8px' : '10px',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}>
            {totalItems} SKUs Live
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '600px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle(isMobile, 'left')}>Product & Specification</th>
                <th style={thStyle(isMobile, 'left')}>System SKU</th>
                <th style={thStyle(isMobile, 'left')}>Site / Location</th>
                <th style={thStyle(isMobile, 'center')}>Qty</th>
                <th style={thStyle(isMobile, 'right')}>Integrity Status</th>
              </tr>
            </thead>
            <tbody>
              {currentStock.length > 0 ? (
                currentStock.map((item) => {
                  const isLowStock = item.quantity <= (item.safety_stock || 0);
                  
                  return (
                    <tr key={item.id} className="stock-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                      
                      {/* Product & Variant */}
                      <td style={tdStyle(isMobile)}>
                        <div style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', fontSize: isMobile ? '10px' : '13px' }}>
                          {item.product_variants?.products?.name || "N/A"}
                        </div>
                        <div style={{ fontSize: isMobile ? '8px' : '10px', color: '#94a3b8', fontWeight: '700', marginTop: '3px', fontStyle: 'italic' }}>
                          VARIANT: {item.product_variants?.variant_name || "Standard"}
                        </div>
                      </td>

                      {/* SKU Badge - FIXED SINGLE LINE & REDUCED HEIGHT ✅ */}
                      <td style={tdStyle(isMobile)}>
                        <span style={{
                          fontFamily: 'monospace',
                          fontSize: isMobile ? '8.5px' : '11px',
                          fontWeight: '800',
                          color: '#64748b',
                          backgroundColor: '#f1f5f9',
                          padding: isMobile ? '2px 6px' : '4px 8px',
                          border: '1px solid #e2e8f0',
                          display: 'inline-block',
                          // Forced single line rules ✅
                          whiteSpace: 'nowrap',
                          lineHeight: '1.2'
                        }}>
                          {item.product_variants?.sku || "---"}
                        </span>
                      </td>

                      {/* Warehouse Info */}
                      <td style={tdStyle(isMobile)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: isMobile ? '10px' : '14px' }}>🏢</span>
                          <span style={{ fontSize: isMobile ? '9px' : '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>
                            {item.warehouses?.name || "Main Site"}
                          </span>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                        <span style={{ 
                          fontSize: isMobile ? '12px' : '16px', 
                          fontWeight: '950', 
                          color: isLowStock ? '#ef4444' : '#0f172a' 
                        }}>
                          {item.quantity}
                        </span>
                      </td>

                      {/* Status Badge - SLIMMED DOWN ✅ */}
                      <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                        <span style={{
                          backgroundColor: isLowStock ? '#fef2f2' : '#ecfdf5',
                          color: isLowStock ? '#ef4444' : '#10b981',
                          padding: isMobile ? '2px 6px' : '6px 14px',
                          fontSize: isMobile ? '7.5px' : '9px',
                          fontWeight: '950',
                          textTransform: 'uppercase',
                          border: `1px solid ${isLowStock ? '#fee2e2' : '#d1fae5'}`,
                          letterSpacing: '0.05em',
                          display: 'inline-block',
                          // Compact height locking ✅
                          lineHeight: '1',
                          whiteSpace: 'nowrap'
                        }}>
                          {isLowStock ? '🚨 Low' : '✅ Verified'}
                        </span>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    * Zero Data Entries Detected *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. PAGINATION */}
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

// --- Helper Style Functions ---
const thStyle = (isMobile, align) => ({
  padding: isMobile ? '10px 12px' : '15px 25px',
  fontSize: isMobile ? '8px' : '10px',
  fontWeight: '950',
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  textAlign: align,
  borderBottom: '1px solid #f1f5f9'
});

const tdStyle = (isMobile) => ({
  padding: isMobile ? '10px 12px' : '18px 25px', // Reduced vertical padding for rows
  verticalAlign: 'middle'
});