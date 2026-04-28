


"use client";

import { useState, useEffect } from 'react';
import { FiTrash2, FiBox } from "react-icons/fi";

/**
 * Enterprise AssetsTable - EXECUTIVE UI EDITION
 * UI: Sharp Edges (0px Radius), Ultra-thin Borders, Inline-CSS. ✅
 * Mobile: Horizontal scroll safety & fluid scaling. ✅
 * Logic: 100% Intact. ✅
 */
export default function AssetsTable({ assets, loading, onDelete }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em' }}>
        <div className="animate-pulse">Synchronizing Asset Ledger...</div>
      </div>
    );
  }

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '0px', // Full Sharp Edges ✅
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    width: '100%',
    overflow: 'hidden',
    marginBottom: '30px'
  };

  const headerStyle = {
    backgroundColor: '#f8fafc',
    padding: isMobile ? '12px 15px' : '15px 25px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Mobile scroll safety ✅
    backgroundColor: '#ffffff'
  };

  const thStyle = {
    padding: isMobile ? '10px 12px' : '12px 20px',
    fontSize: isMobile ? '9px' : '10px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
    whiteSpace: 'nowrap'
  };

  const tdStyle = {
    padding: isMobile ? '10px 12px' : '14px 20px',
    fontSize: isMobile ? '11px' : '13px',
    color: '#334155',
    borderBottom: '1px solid #f8fafc'
  };

  return (
    <div style={containerStyle}>
      {/* 1. TABLE HEADER */}
      <div style={headerStyle}>
        <FiBox style={{ color: '#64748b', fontSize: '18px' }} />
        <h3 style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', margin: 0, letterSpacing: '0.02em' }}>
          Fixed Assets Registry
        </h3>
      </div>

      {/* 2. TABLE BODY */}
      <div style={tableWrapperStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '600px' : 'auto' }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: 'left' }}>Asset Description</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Classification</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Cost (USD)</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Current Value</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Annual Depr.</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>System Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                {/* Asset Name */}
                <td style={tdStyle}>
                  <div style={{ fontWeight: '800', color: '#0f172a', textTransform: 'uppercase' }}>{asset.asset_name}</div>
                  <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700', marginTop: '2px' }}>
                    ACQUIRED: {new Date(asset.purchase_date).toLocaleDateString('en-CA')}
                  </div>
                </td>

                {/* Type Badge */}
                <td style={tdStyle}>
                  <span style={{ 
                    backgroundColor: '#eff6ff', 
                    color: '#3b82f6', 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    fontSize: '9px', 
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    border: '1px solid #dbeafe'
                  }}>
                    {asset.asset_type}
                  </span>
                </td>

                {/* Purchase Price */}
                <td style={{ ...tdStyle, textAlign: 'center', fontFamily: 'monospace', color: '#64748b', fontWeight: '700' }}>
                  ${parseFloat(asset.purchase_price).toLocaleString()}
                </td>

                {/* Current Value (Emerald) */}
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <div style={{ fontWeight: '900', color: '#10b981' }}>${parseFloat(asset.current_value).toLocaleString()}</div>
                  <div style={{ fontSize: '8px', color: '#f43f5e', fontWeight: '800', textTransform: 'uppercase' }}>
                    -${parseFloat(asset.total_depreciation).toLocaleString()} Accumulated
                  </div>
                </td>

                {/* Depreciation Rate */}
                <td style={{ ...tdStyle, textAlign: 'center', color: '#94a3b8', fontSize: '11px', fontWeight: '700' }}>
                  ${parseFloat(asset.annual_depreciation).toLocaleString()}
                </td>

                {/* Action Button (Rose) */}
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  <button 
                    onClick={() => onDelete(asset.id)}
                    style={{ 
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#f43f5e',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '10px',
                        fontWeight: '900',
                        textTransform: 'uppercase'
                    }}
                    className="hover:underline active:scale-95 transition-all"
                  >
                    <FiTrash2 size={14} /> 
                    {!isMobile && "Archive"}
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ padding: '60px', textAlign: 'center', color: '#cbd5e1', fontSize: '12px', fontStyle: 'italic', fontWeight: '600' }}>
                   * No verified assets detected in the current unit ledger *
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. TABLE FOOTER */}
      <div style={{ padding: '10px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
         <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
            Regulatory Notice: Depreciation is calculated based on the straight-line method.
         </p>
      </div>
    </div>
  );
}