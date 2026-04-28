"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Fund Operations ✅
import { FiDollarSign, FiZap, FiBriefcase, FiActivity, FiArrowRight, FiTarget, FiCalendar } from 'react-icons/fi';

/**
 * Enterprise FundOperations - EXECUTIVE SHARP EDITION
 * Purpose: Combined interface for manual capital allocation and automated profit sharing.
 * Fix: Dual-form layout (Side-by-side Laptop / Stacked Mobile). ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Style: Deep Slate & Emerald accents for financial authority. ✅
 */
export default function FundOperations({ sbus, onTransfer, onAutoTransfer, loading }) {
  const [isMobile, setIsMobile] = useState(false);

  // Manual Form State (Logic Preserved)
  const [manualForm, setManualForm] = useState({
    sbu_id: '',
    amount: '',
    transfer_type: 'Allocation',
    description: ''
  });

  // Auto Form State (Logic Preserved)
  const [autoForm, setAutoForm] = useState({
    sbu_id: '',
    percentage: '10',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '30px',
    marginBottom: '35px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const cardStyle = (isDark = false) => ({
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    padding: isMobile ? '20px 15px' : '30px 35px',
    border: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    boxSizing: 'border-box'
  });

  const labelStyle = (isDark = false) => ({
    fontSize: '9px',
    fontWeight: '900',
    color: isDark ? '#64748b' : '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  });

  const inputStyle = (isDark = false) => ({
    width: '100%',
    padding: '12px',
    border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
    fontSize: '13px',
    fontWeight: '700',
    color: isDark ? '#ffffff' : '#0f172a',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  });

  const btnStyle = (color) => ({
    backgroundColor: color,
    color: '#ffffff',
    padding: isMobile ? '12px' : '15px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: '10.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    lineHeight: '1',
    marginTop: '10px'
  });

  return (
    <div style={gridContainerStyle}>
      
      {/* 1. MANUAL FUND ALLOCATION FORM (White Card) ✅ */}
      <div style={cardStyle(false)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
            <FiBriefcase style={{ color: '#2563eb', fontSize: '18px' }} />
            <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Manual Capital Transfer
            </h3>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onTransfer(manualForm); }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle(false)}><FiTarget /> Target Unit</label>
              <select 
                value={manualForm.sbu_id} 
                onChange={(e) => setManualForm({...manualForm, sbu_id: e.target.value})}
                style={{ ...inputStyle(false), cursor: 'pointer', fontWeight: '800' }} required
              >
                <option value="">-- Choose Unit --</option>
                {sbus?.map(sbu => <option key={sbu.id} value={sbu.id}>{sbu.sbu_name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle(false)}>Action Type</label>
              <select 
                value={manualForm.transfer_type} 
                onChange={(e) => setManualForm({...manualForm, transfer_type: e.target.value})}
                style={{ ...inputStyle(false), cursor: 'pointer' }}
              >
                <option value="Allocation">Allocation (+)</option>
                <option value="Profit_Return">Return (-)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle(false)}><FiDollarSign /> Net Amount (USD)</label>
            <input 
              type="number" placeholder="0.00" 
              value={manualForm.amount} onChange={(e) => setManualForm({...manualForm, amount: e.target.value})}
              style={{ ...inputStyle(false), color: '#2563eb', fontWeight: '900' }} required 
            />
          </div>

          <div>
            <label style={labelStyle(false)}>Audit Description</label>
            <input 
              type="text" placeholder="Transfer reference / Memo..." 
              value={manualForm.description} onChange={(e) => setManualForm({...manualForm, description: e.target.value})}
              style={inputStyle(false)} required 
            />
          </div>

          <button type="submit" style={btnStyle('#2563eb')} onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}>
            <FiArrowRight size={16} /> Process Transfer
          </button>
        </form>
      </div>

      {/* 2. AUTOMATED PROFIT SHARING ENGINE (Dark Card) ✅ */}
      <div style={cardStyle(true)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
            <FiZap style={{ color: '#10b981', fontSize: '18px' }} />
            <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Profit Sharing Engine
            </h3>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onAutoTransfer(autoForm); }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={labelStyle(true)}><FiTarget /> Strategic Unit</label>
            <select 
                value={autoForm.sbu_id} 
                onChange={(e) => setAutoForm({...autoForm, sbu_id: e.target.value})}
                style={{ ...inputStyle(true), cursor: 'pointer', fontWeight: '800' }} required
            >
                <option value="">-- Select Target --</option>
                {sbus?.map(sbu => <option key={sbu.id} value={sbu.id}>{sbu.sbu_name}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle(true)}>Share %</label>
              <input 
                type="number" min="1" max="100"
                value={autoForm.percentage} onChange={(e) => setAutoForm({...autoForm, percentage: e.target.value})}
                style={{ ...inputStyle(true), color: '#10b981', fontWeight: '900' }} required
              />
            </div>
            <div>
              <label style={labelStyle(true)}><FiCalendar /> Fiscal Month</label>
              <input 
                type="number" min="1" max="12"
                value={autoForm.month} onChange={(e) => setAutoForm({...autoForm, month: e.target.value})}
                style={inputStyle(true)} required
              />
            </div>
          </div>

          <button type="submit" style={btnStyle('#10b981')} onMouseOver={(e) => e.target.style.backgroundColor = '#059669'} onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}>
            <FiActivity size={16} /> Execute Auto-Sync
          </button>
        </form>

        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <p style={{ fontSize: '8px', color: '#475569', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                * System will scan unit P&L and execute transfer *
            </p>
        </div>
      </div>

    </div>
  );
}