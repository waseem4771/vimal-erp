

"use client";

import { useState, useEffect } from 'react';
import Pagination from '@/components/layout/Pagination/Pagination';

/**
 * Enterprise AssetsTable - EXECUTIVE SHARP EDITION
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for reliable rendering. ✅
 * Mobile: Horizontal scroll safety and nano-typography. ✅
 */
export default function AssetsTable({ assets, loading, onDelete }) {
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
  const totalItems = assets?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = assets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-r-transparent mb-4"></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Syncing Asset Ledger...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {/* VVIP SCOPED CSS FOR TABLE ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .asset-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .asset-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="asset-table-container" style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        overflow: 'hidden',
        width: '100%'
      }}>
        
        {/* COMPONENT HEADER */}
        <div style={{
          padding: isMobile ? '12px 15px' : '18px 25px',
          backgroundColor: '#0f172a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1e293b'
        }}>
          <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
            Fixed Assets Register
          </h3>
          <span style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            padding: isMobile ? '2px 8px' : '4px 12px',
            fontSize: isMobile ? '8px' : '10px',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}>
            {totalItems} Active Assets
          </span>
        </div>

        {/* RESPONSIVE TABLE WRAPPER */}
        <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '650px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle(isMobile, 'left')}>Asset Details</th>
                <th style={thStyle(isMobile, 'left')}>Classification</th>
                <th style={thStyle(isMobile, 'center')}>Initial Cost</th>
                <th style={thStyle(isMobile, 'center')}>Book Value</th>
                <th style={thStyle(isMobile, 'right')}>System Action</th>
              </tr>
            </thead>
            <tbody style={{ divideY: '1px solid #f1f5f9' }}>
              {currentAssets.length > 0 ? (
                currentAssets.map((asset) => (
                  <tr key={asset.id} className="asset-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    
                    {/* 1. Asset Name & Date */}
                    <td style={tdStyle(isMobile)}>
                      <div style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', fontSize: isMobile ? '10px' : '13px' }}>
                        {asset.asset_name}
                      </div>
                      <div style={{ fontSize: isMobile ? '8px' : '10px', color: '#94a3b8', fontWeight: '700', marginTop: '3px' }}>
                        ACQUIRED: {new Date(asset.purchase_date).toLocaleDateString('en-CA')}
                      </div>
                    </td>

                    {/* 2. Classification Badge */}
                    <td style={tdStyle(isMobile)}>
                      <span style={{
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        padding: '3px 8px',
                        fontSize: isMobile ? '8px' : '10px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        border: '1px solid #e2e8f0'
                      }}>
                        {asset.asset_type}
                      </span>
                    </td>

                    {/* 3. Initial Cost */}
                    <td style={{ ...tdStyle(isMobile), textAlign: 'center', fontFamily: 'monospace', fontWeight: '700', color: '#64748b' }}>
                      ${parseFloat(asset.purchase_price).toLocaleString()}
                    </td>

                    {/* 4. Book Value */}
                    <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                      <div style={{ fontWeight: '900', color: '#10b981', fontSize: isMobile ? '11px' : '14px' }}>
                        ${parseFloat(asset.current_value).toLocaleString()}
                      </div>
                      <div style={{ fontSize: '8px', color: '#f43f5e', fontWeight: '800', textTransform: 'uppercase', marginTop: '2px' }}>
                        -${parseFloat(asset.total_depreciation).toLocaleString()} DEPR.
                      </div>
                    </td>

                    {/* 5. Revoke Action */}
                    <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                      <button 
                        onClick={() => onDelete(asset.id)}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#ef4444',
                          border: '1px solid #fee2e2',
                          padding: isMobile ? '4px 8px' : '6px 12px',
                          fontSize: isMobile ? '8px' : '10px',
                          fontWeight: '900',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = '#ef4444'; e.target.style.color = '#ffffff'; }}
                        onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ef4444'; }}
                      >
                        Revoke Record
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    * No verified assets in current ledger *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={{ marginTop: '10px' }}>
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
  letterSpacing: '0.1em',
  textAlign: align,
  borderBottom: '1px solid #f1f5f9'
});

const tdStyle = (isMobile) => ({
  padding: isMobile ? '12px 12px' : '18px 25px',
  verticalAlign: 'middle'
});