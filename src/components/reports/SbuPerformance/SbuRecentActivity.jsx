"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Ledger ✅
import { FiClock, FiFileText, FiUser, FiCheckCircle } from 'react-icons/fi';

/**
 * Enterprise SbuRecentActivity - EXECUTIVE SHARP EDITION
 * Purpose: Displays the latest transaction records for the specific unit.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Stealth horizontal scroll and optimized nano-typography. ✅
 * Style: Corporate Slate & Emerald fulfillment accents. ✅
 */
export default function SbuRecentActivity({ activityData, selectedSbuId }) {
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
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    padding: isMobile ? '12px 15px' : '18px 25px',
    backgroundColor: '#0f172a', // Corporate Dark
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Mobile scroll safety ✅
    backgroundColor: '#ffffff'
  };

  const thStyle = (align = 'left') => ({
    padding: isMobile ? '10px 12px' : '15px 25px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: align,
    borderBottom: '1.5px solid #f1f5f9',
    backgroundColor: '#fcfcfd',
    whiteSpace: 'nowrap'
  });

  const tdStyle = (align = 'left', isBold = false) => ({
    padding: isMobile ? '10px 12px' : '14px 25px',
    fontSize: isMobile ? '11px' : '13px',
    color: isBold ? '#0f172a' : '#475569',
    fontWeight: isBold ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .activity-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .activity-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="activity-table-container" style={containerStyle}>
        
        {/* 1. COMPONENT HEADER ✅ */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiClock style={{ color: '#3b82f6', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Recent Unit Transaction Ledger
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
            Unit {selectedSbuId}
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '850px' : '100%' }}>
            <thead>
              <tr>
                <th style={thStyle('left')}>Invoice Ref</th>
                <th style={thStyle('left')}>Customer Entity</th>
                <th style={thStyle('center')}>Posting Date</th>
                <th style={thStyle('center')}>Fulfillment</th>
                <th style={thStyle('right')}>Net Value (USD)</th>
              </tr>
            </thead>
            <tbody>
              {activityData && activityData.length > 0 ? (
                activityData.map((order) => (
                  <tr key={order.id} className="activity-row" style={{ transition: 'all 0.2s' }}>
                    
                    {/* Invoice ID */}
                    <td style={tdStyle('left', true)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FiFileText style={{ color: '#3b82f6' }} />
                            <span style={{ color: '#2563eb', fontFamily: 'monospace' }}>#INV-{order.id}</span>
                        </div>
                    </td>

                    {/* Customer Name */}
                    <td style={tdStyle('left')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiUser style={{ color: '#cbd5e1' }} />
                        <span style={{ textTransform: 'uppercase', fontWeight: '800' }}>{order.customers?.customer_name}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td style={{ ...tdStyle('center'), color: '#94a3b8', fontSize: '11px' }}>
                      {new Date(order.created_at).toLocaleDateString('en-CA', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>

                    {/* Fulfillment Status Badge ✅ */}
                    <td style={{ ...tdStyle('center') }}>
                      <span style={{
                        backgroundColor: '#ecfdf5',
                        color: '#10b981',
                        padding: '3px 10px',
                        fontSize: isMobile ? '8px' : '9.5px',
                        fontWeight: '950',
                        textTransform: 'uppercase',
                        border: '1px solid #d1fae5',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        lineHeight: '1'
                      }}>
                        <FiCheckCircle size={10} />
                        {order.status}
                      </span>
                    </td>

                    {/* Amount ✅ */}
                    <td style={{ ...tdStyle('right', true), fontSize: isMobile ? '13px' : '16px', fontFamily: 'monospace' }}>
                      ${parseFloat(order.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    * No recent unit activity synchronized *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}