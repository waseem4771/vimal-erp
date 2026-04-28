
"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Marketing/Coupons ✅
import { FiTag, FiPlus, FiActivity, FiDatabase } from 'react-icons/fi';

/**
 * Enterprise CouponManager - EXECUTIVE SHARP EDITION (FIXED)
 * Purpose: Centralized promotional engine for creating and monitoring discount codes.
 * Fix: Defined missing 'tableWrapperStyle' to resolve ReferenceError. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive grid for form and stealth-scroll for ledger. ✅
 */
export default function CouponManager({ coupons, onAdd, loading }) {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'Percentage',
    discount_value: '',
    expiry_date: ''
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ code: '', discount_type: 'Percentage', discount_value: '', expiry_date: '' });
  };

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
    padding: isMobile ? '15px' : '20px 25px',
    backgroundColor: '#0f172a', // Corporate Dark
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  const formSectionStyle = {
    padding: isMobile ? '20px 15px' : '25px 30px',
    backgroundColor: '#fcfcfd',
    borderBottom: '1px solid #f1f5f9'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '600',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'left'
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#10b981', // Emerald for Marketing
    color: '#ffffff',
    padding: isMobile ? '12px' : '13px 30px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: '10.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(16, 185, 129, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    lineHeight: '1',
    marginTop: isMobile ? '10px' : '0',
    width: isMobile ? '100%' : 'auto'
  };

  // --- FIXED: Defined missing style variable ✅ ---
  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Enables Mobile stealth scroll
    backgroundColor: '#ffffff'
  };

  const thStyle = (align = 'left') => ({
    padding: isMobile ? '12px 15px' : '18px 25px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: align,
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#fcfcfd',
    whiteSpace: 'nowrap'
  });

  const tdStyle = (align = 'left', isBold = false) => ({
    padding: isMobile ? '12px 15px' : '16px 25px',
    fontSize: isMobile ? '11.5px' : '13px',
    color: isBold ? '#0f172a' : '#1e293b',
    fontWeight: isBold ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  });

  return (
    <div style={containerStyle}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .coupon-manager-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .coupon-row:hover { background-color: #f0fdf4 !important; }
      `}} />

      {/* 1. COMPONENT HEADER ✅ */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiTag style={{ color: '#10b981', fontSize: '18px' }} />
          <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Active Discount Coupons
          </h3>
        </div>
        <span style={{ fontSize: '8px', backgroundColor: '#10b981', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
            Marketing Engine
        </span>
      </div>

      {/* 2. ADD NEW COUPON WORKSPACE ✅ */}
      <div style={formSectionStyle}>
        <form onSubmit={handleSubmit}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                gap: '15px',
                alignItems: 'end'
            }}>
                <div style={{ textAlign: 'left' }}>
                    <label style={labelStyle}>Coupon Code</label>
                    <input 
                        type="text" placeholder="e.g. SAVE50"
                        value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        style={inputStyle} required
                    />
                </div>

                <div style={{ textAlign: 'left' }}>
                    <label style={labelStyle}>Discount Nature</label>
                    <select 
                        value={formData.discount_type} onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                        style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}
                    >
                        <option value="Percentage">Percentage (%)</option>
                        <option value="Fixed">Fixed Amount ($)</option>
                    </select>
                </div>

                <div style={{ textAlign: 'left' }}>
                    <label style={labelStyle}>Value</label>
                    <input 
                        type="number" placeholder="0"
                        value={formData.discount_value} onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
                        style={{ ...inputStyle, fontWeight: '900', color: '#10b981' }} required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={submitBtnStyle}
                    onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#059669')}
                    onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#10b981')}
                >
                    <FiPlus size={16} />
                    <span>{loading ? "Saving..." : "Create Coupon"}</span>
                </button>
            </div>
        </form>
      </div>

      {/* 3. COUPONS LIST LEDGER (TABLE) ✅ FIXED tableWrapperStyle */}
      <div className="stealth-scroll" style={tableWrapperStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '650px' : '100%' }}>
          <thead>
            <tr>
              <th style={thStyle('left')}>Promo Code</th>
              <th style={thStyle('left')}>Discount Specification</th>
              <th style={thStyle('center')}>Fulfillment</th>
              <th style={thStyle('right')}>Authorized Date</th>
            </tr>
          </thead>
          <tbody>
            {coupons && coupons.length > 0 ? (
              coupons.map((c) => (
                <tr key={c.id} className="coupon-row" style={{ transition: 'all 0.2s' }}>
                  <td style={tdStyle('left')}>
                    <span style={{ fontWeight: '900', fontFamily: 'monospace', color: '#2563eb', backgroundColor: '#eff6ff', padding: '3px 10px', border: '1px solid #dbeafe', fontSize: '12px' }}>
                      {c.code}
                    </span>
                  </td>
                  <td style={tdStyle('left', true)}>
                    <div style={{ textTransform: 'uppercase' }}>
                      {c.discount_type === 'Percentage' ? `${c.discount_value}% OFF` : `$${parseFloat(c.discount_value).toLocaleString()} FLAT`}
                    </div>
                  </td>
                  <td style={{ ...tdStyle('center') }}>
                    <span style={{
                      backgroundColor: '#ecfdf5',
                      color: '#10b981',
                      padding: '3px 12px',
                      fontSize: '9px',
                      fontWeight: '950',
                      textTransform: 'uppercase',
                      border: '1px solid #d1fae5',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <FiActivity size={10} className="animate-pulse" />
                      Active
                    </span>
                  </td>
                  <td style={{ ...tdStyle('right'), color: '#94a3b8', fontSize: '11px', fontFamily: 'monospace' }}>
                    {new Date(c.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: '2-digit' })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  * No active coupons detected in registry *
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. COMPLIANCE NOTE ✅ Strictly Left Aligned */}
      <div style={{ padding: '12px 25px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9', textAlign: 'left' }}>
         <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
            * Verified against Strategic Marketing Rules *
         </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}} />

    </div>
  );
}