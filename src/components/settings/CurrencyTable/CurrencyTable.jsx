"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Currency Registry ✅
import { FiEdit, FiSave, FiX, FiGlobe, FiDatabase, FiTrendingUp } from 'react-icons/fi';

/**
 * Enterprise CurrencyTable - EXECUTIVE SHARP EDITION (MAX RESPONSIVE)
 * Purpose: Global exchange rate registry with inline editing capabilities.
 * Fix: Full mobile responsiveness with horizontal stealth scroll. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Style: Corporate Dark header with high-contrast monetary inputs. ✅
 */
export default function CurrencyTable({ rates, onUpdate }) {
  const [isMobile, setIsMobile] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newRate, setNewRate] = useState('');

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
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    padding: isMobile ? '12px 15px' : '15px 25px',
    backgroundColor: '#0f172a', // Corporate Dark
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Mobile safety ✅
    backgroundColor: '#ffffff',
    WebkitOverflowScrolling: 'touch', // Smooth touch for mobile
    msOverflowStyle: '-ms-autohiding-scrollbar'
  };

  const thStyle = (align = 'left') => ({
    padding: isMobile ? '12px 15px' : '18px 25px',
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
    padding: isMobile ? '10px 12px' : '14px 25px',
    fontSize: isMobile ? '11.5px' : '13.5px',
    color: isBold ? '#0f172a' : '#475569',
    fontWeight: isBold ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  });

  const editInputStyle = {
    width: '100px',
    padding: '6px 10px',
    border: '1px solid #2563eb',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    fontWeight: '900',
    color: '#2563eb',
    outline: 'none',
    borderRadius: '0px',
    textAlign: 'center'
  };

  const actionBtnStyle = (type) => ({
    backgroundColor: type === 'save' ? '#10b981' : type === 'cancel' ? '#f1f5f9' : 'transparent',
    color: type === 'save' ? '#ffffff' : type === 'cancel' ? '#475569' : '#2563eb',
    border: type === 'cancel' ? '1px solid #e2e8f0' : 'none',
    padding: '6px 12px',
    fontSize: '9px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '0px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
    lineHeight: '1'
  });

  return (
    <div style={{ width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .currency-table-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { height: 4px !important; width: 0px !important; background: transparent !important; }
        .stealth-scroll::-webkit-scrollbar-thumb { background: #e2e8f0 !important; }
        .currency-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="currency-table-wrapper" style={containerStyle}>
        
        {/* 1. TABLE HEADER ✅ */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiDatabase style={{ color: '#3b82f6', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Exchange Rates (Base: USD)
            </h3>
          </div>
          <span style={{ fontSize: '8px', backgroundColor: '#2563eb', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
              Market Logic
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={tableWrapperStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '700px' : '100%' }}>
            <thead>
              <tr>
                <th style={thStyle('left')}>From Currency</th>
                <th style={thStyle('left')}>Target Base</th>
                <th style={thStyle('center')}>Current Exchange Rate</th>
                <th style={thStyle('right')}>Administrative Action</th>
              </tr>
            </thead>
            <tbody>
              {rates && rates.length > 0 ? (
                rates.map((r) => (
                  <tr key={r.id} className="currency-row" style={{ transition: 'all 0.2s' }}>
                    
                    {/* From Currency */}
                    <td style={tdStyle('left', true)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ backgroundColor: '#eff6ff', padding: '6px', display: 'flex' }}>
                            <FiGlobe style={{ color: '#2563eb' }} />
                        </div>
                        <span style={{ fontSize: '14px', letterSpacing: '0.05em' }}>{r.from_currency}</span>
                      </div>
                    </td>

                    {/* To Base */}
                    <td style={tdStyle('left')}>
                      <span style={{ color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>{r.to_currency}</span>
                    </td>

                    {/* Rate Input/Display ✅ */}
                    <td style={{ ...tdStyle('center') }}>
                      {editingId === r.id ? (
                        <input 
                          type="number" 
                          step="0.000001"
                          value={newRate} 
                          onChange={(e) => setNewRate(e.target.value)}
                          style={editInputStyle}
                          placeholder={r.exchange_rate}
                          autoFocus
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <FiTrendingUp style={{ color: '#10b981', fontSize: '12px' }} />
                            <span style={{ fontSize: '16px', fontWeight: '950', color: '#2563eb', fontFamily: 'monospace' }}>
                                {parseFloat(r.exchange_rate).toFixed(6)}
                            </span>
                        </div>
                      )}
                    </td>

                    {/* Actions Group ✅ */}
                    <td style={tdStyle('right')}>
                      {editingId === r.id ? (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button 
                            onClick={() => { onUpdate(r.id, newRate); setEditingId(null); }}
                            style={actionBtnStyle('save')}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
                            onMouseOut={(e) => (e.target.style.backgroundColor = '#10b981')}
                          >
                            <FiSave /> Sync
                          </button>
                          <button 
                            onClick={() => setEditingId(null)}
                            style={actionBtnStyle('cancel')}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#e2e8f0')}
                            onMouseOut={(e) => (e.target.style.backgroundColor = '#f1f5f9')}
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => { setEditingId(r.id); setNewRate(r.exchange_rate); }}
                          style={{ ...actionBtnStyle('edit'), textDecoration: 'none' }}
                          onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                          onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                        >
                          <FiEdit /> Modify Rate
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    * No exchange pairs detecting in global registry *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 3. TABLE FOOTER ✅ Strictly Left Aligned */}
        <div style={{ padding: '12px 25px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9', textAlign: 'left' }}>
           <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
              * Strategic Currency Management: Global market logic synchronization enabled *
           </p>
        </div>

      </div>
    </div>
  );
}