"use client";

import { useState, useEffect } from 'react';
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise ProcurementTable - EXECUTIVE SHARP EDITION
 * Fix: Reduced vertical padding for Badges & Buttons on Mobile (No mota-pan). ✅
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Mobile: Stealth horizontal scroll and nano-scale typography. ✅
 * Logic: 100% Intact. ✅
 */
export default function ProcurementTable({ orders, loading, onApprove, onReceive, userRole }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Data Slicing
  const totalItems = orders?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="inline-block animate-spin" style={{ height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Synchronizing Procurement Ledger...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .proc-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .proc-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="proc-table-container" style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        overflow: 'hidden',
        width: '100%'
      }}>
        
        {/* 1. COMPONENT HEADER */}
        <div style={{
          padding: isMobile ? '12px 15px' : '18px 25px',
          backgroundColor: '#0f172a', // Premium Dark Header
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '3px', height: '15px', backgroundColor: '#3b82f6' }}></div>
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Authorized Unit Requisitions
            </h3>
          </div>
          <span style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: isMobile ? '2px 8px' : '4px 12px',
            fontSize: isMobile ? '7px' : '9px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Fulfillment Active
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '650px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle(isMobile, 'left')}>PO Reference</th>
                <th style={thStyle(isMobile, 'center')}>Net Amount</th>
                <th style={thStyle(isMobile, 'center')}>Lifecycle Status</th>
                <th style={thStyle(isMobile, 'left')}>Authority Threshold</th>
                <th style={thStyle(isMobile, 'right')}>Workflow Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((po) => {
                  const amount = parseFloat(po.total_amount);
                  const needsDirector = amount > 1000;
                  
                  return (
                    <tr key={po.id} className="proc-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                      
                      {/* PO Ref */}
                      <td style={tdStyle(isMobile)}>
                        <span style={{ fontWeight: '800', color: '#1e293b', fontSize: isMobile ? '10px' : '13px' }}>
                          #PO-{po.id}
                        </span>
                      </td>

                      {/* Net Amount */}
                      <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                        <span style={{ 
                          fontSize: isMobile ? '12px' : '16px', 
                          fontWeight: '950', 
                          color: '#2563eb',
                          fontFamily: 'monospace'
                        }}>
                          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Lifecycle Status Badge (Slimmed down) ✅ */}
                      <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: po.status === 'Received' ? '#ecfdf5' : '#fff7ed',
                          color: po.status === 'Received' ? '#10b981' : '#f97316',
                          padding: isMobile ? '2px 6px' : '4px 12px',
                          fontSize: isMobile ? '7.5px' : '9px',
                          fontWeight: '950',
                          textTransform: 'uppercase',
                          border: `1px solid ${po.status === 'Received' ? '#d1fae5' : '#ffedd5'}`,
                          display: 'inline-block',
                          lineHeight: '1'
                        }}>
                          {po.status.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Threshold Info */}
                      <td style={tdStyle(isMobile)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ 
                            fontSize: isMobile ? '8px' : '10px', 
                            fontWeight: '900', 
                            color: needsDirector ? '#ef4444' : '#94a3b8',
                            textTransform: 'uppercase'
                          }}>
                            {needsDirector ? '⚠️ Director Approval' : 'Manager or Above'}
                          </span>
                        </div>
                      </td>

                      {/* Workflow Actions (Buttons slimmed) ✅ */}
                      <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          {po.status === 'Pending' && (
                            <button 
                                onClick={() => onApprove(po.id)}
                                style={actionBtnStyle(isMobile, '#2563eb')}
                            >
                                Authorize
                            </button>
                          )}
                          {(po.status === 'Manager_Approved' || po.status === 'Director_Approved') && (
                            <button 
                                onClick={() => onReceive(po.id)}
                                style={actionBtnStyle(isMobile, '#10b981')}
                            >
                                Fulfill Stock
                            </button>
                          )}
                          {po.status === 'Received' && (
                            <span style={{ color: '#10b981', fontSize: '9px', fontWeight: '950', textTransform: 'uppercase', fontStyle: 'italic' }}>
                                ✓ Synchronized
                            </span>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    * No requisitions detected in unit ledger *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. PAGINATION */}
      <div style={{ marginTop: '5px' }}>
        <Pagination 
          currentPage={currentPage} 
          totalItems={totalItems} 
          itemsPerPage={itemsPerPage} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}

// --- Helper Styles ---
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
  padding: isMobile ? '10px 12px' : '18px 25px',
  verticalAlign: 'middle'
});

const actionBtnStyle = (isMobile, color) => ({
  backgroundColor: color,
  color: '#ffffff',
  padding: isMobile ? '4px 8px' : '8px 16px', // Vertical padding reduced ✅
  fontSize: isMobile ? '8px' : '10px',
  fontWeight: '900',
  textTransform: 'uppercase',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  lineHeight: '1'
});