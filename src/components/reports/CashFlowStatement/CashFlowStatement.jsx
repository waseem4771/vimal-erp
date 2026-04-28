"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiArrowDownLeft, FiArrowUpRight, FiActivity, FiClock } from 'react-icons/fi';
// Pagination Component Import ✅
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise CashFlowStatement - EXECUTIVE SHARP EDITION (With Pagination)
 * Fix: Integrated pagination logic for transaction timeline. ✅
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Mobile: Full responsiveness with stealth-scroll table. ✅
 * Layout: Strictly Left-aligned. ✅
 */
export default function CashFlowStatement({ reportData }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Ek page par siraf 7 entries ✅

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when report data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [reportData]);

  if (!reportData) return null;

  const { summary, activities } = reportData;

  // --- Pagination Logic ---
  const totalItems = activities?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = activities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // --- Inline Style Constants ---
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: isMobile ? '15px' : '25px',
    marginBottom: '35px',
    width: '100%'
  };

  const cardStyle = (accentColor, isDark = false) => ({
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    padding: isMobile ? '20px 15px' : '25px 30px',
    border: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9',
    borderLeft: `6px solid ${accentColor}`,
    borderRadius: '0px', 
    boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left'
  });

  const valueStyle = (isDark) => ({
    fontSize: isMobile ? '22px' : '32px',
    fontWeight: '950',
    color: isDark ? '#ffffff' : '#0f172a',
    margin: 0,
    letterSpacing: '-0.02em',
    fontFamily: 'monospace'
  });

  return (
    <div style={{ width: '100%', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cf-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .cf-row:hover { background-color: #f8fafc !important; }
      `}} />

      {/* 1. SUMMARY SCORECARDS */}
      <div style={gridContainerStyle}>
        
        <div style={cardStyle('#10b981')}>
          <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Liquid Asset Inflow</span>
          <h2 style={valueStyle(false)}>${summary.total_inflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
              <FiArrowDownLeft style={{ color: '#10b981', fontSize: '14px' }} />
              <p style={{ fontSize: '8px', color: '#10b981', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>Revenue Sync</p>
          </div>
        </div>

        <div style={cardStyle('#f43f5e')}>
          <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Liquid Asset Outflow</span>
          <h2 style={valueStyle(false)}>${summary.total_outflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
              <FiArrowUpRight style={{ color: '#f43f5e', fontSize: '14px' }} />
              <p style={{ fontSize: '8px', color: '#f43f5e', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>Expense Sync</p>
          </div>
        </div>

        <div style={cardStyle('#0ea5e9', true)}>
          <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Net Position</span>
          <h2 style={valueStyle(true)}>${summary.net_cash_change.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
              <FiActivity className="animate-pulse" style={{ color: '#60a5fa', fontSize: '14px' }} />
              <p style={{ fontSize: '8px', color: '#60a5fa', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>Verified Liquidity</p>
          </div>
        </div>

      </div>

      {/* 2. ACTIVITY LEDGER TABLE */}
      <div className="cf-table-container" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          overflow: 'hidden',
          marginBottom: '15px'
      }}>
        {/* Table Header */}
        <div style={{
            padding: isMobile ? '12px 15px' : '18px 25px',
            backgroundColor: '#0f172a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiClock style={{ color: '#60a5fa', fontSize: '16px' }} />
                <h3 style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                    Transaction Timeline
                </h3>
            </div>
            <span style={{ fontSize: '8px', backgroundColor: '#334155', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
                {totalItems} Logs
            </span>
        </div>

        <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '600px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle(isMobile, 'left')}>Posting Date</th>
                <th style={thStyle(isMobile, 'left')}>Description & Account</th>
                <th style={thStyle(isMobile, 'center')}>Nature</th>
                <th style={thStyle(isMobile, 'right')}>Net Value (USD)</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.length > 0 ? currentActivities.map((act) => (
                <tr key={act.id} className="cf-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                  <td style={tdStyle(isMobile)}><span style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: isMobile ? '9.5px' : '12px', fontWeight: '700' }}>{new Date(act.date).toLocaleDateString('en-CA', { day: '2-digit', month: 'short', year: 'numeric' })}</span></td>
                  <td style={tdStyle(isMobile)}>
                    <div style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', fontSize: isMobile ? '10.5px' : '13px' }}>{act.description}</div>
                    <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>{act.account}</div>
                  </td>
                  <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                    <span style={{ backgroundColor: act.type === 'Inflow' ? '#ecfdf5' : '#fef2f2', color: act.type === 'Inflow' ? '#10b981' : '#f43f5e', padding: '2px 8px', fontSize: isMobile ? '7.5px' : '9px', fontWeight: '950', textTransform: 'uppercase', border: `1px solid ${act.type === 'Inflow' ? '#d1fae5' : '#fee2e2'}`, display: 'inline-block', lineHeight: '1' }}>{act.type}</span>
                  </td>
                  <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                    <span style={{ fontSize: isMobile ? '12.5px' : '15px', fontWeight: '950', color: act.type === 'Inflow' ? '#10b981' : '#f43f5e', fontFamily: 'monospace' }}>{act.type === 'Inflow' ? '+' : '-'}${act.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No data entries *</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SYSTEM PAGINATION - Strictly Sharp ✅ */}
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

const thStyle = (isMobile, align) => ({
  padding: isMobile ? '10px 12px' : '18px 25px',
  fontSize: isMobile ? '9px' : '10px',
  fontWeight: '950',
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  textAlign: align,
  borderBottom: '1px solid #f1f5f9'
});

const tdStyle = (isMobile) => ({
  padding: isMobile ? '12px 15px' : '18px 25px',
  verticalAlign: 'middle'
});