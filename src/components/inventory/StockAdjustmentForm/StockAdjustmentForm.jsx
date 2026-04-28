


"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiAlertOctagon, FiMinusCircle } from 'react-icons/fi';

/**
 * Enterprise StockAdjustmentForm - EXECUTIVE SHARP EDITION
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Mobile: 1-column stack with slim buttons (No thickness). ✅
 * Laptop: Clean 4-column grid. ✅
 */
export default function StockAdjustmentForm({ variants, onAdjust }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    variant_id: '',
    warehouse_id: 1, 
    quantity: 1,
    adjustment_type: 'Damaged',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdjust(formData);
    setFormData({ ...formData, variant_id: '', quantity: 1, reason: '' });
  };

  // --- Inline Style Constants ---
  const inputStyle = {
    width: '100%',
    padding: isMobile ? '10px' : '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '600',
    outline: 'none',
    borderRadius: '0px', // Forced Sharp ✅
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '6px',
    display: 'block',
    textAlign: 'left'
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: isMobile ? '20px 15px' : '25px 30px',
      border: '1px solid #f1f5f9',
      borderRadius: '0px', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
      marginBottom: '35px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* 1. SECTION HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
        <FiAlertOctagon style={{ color: '#ef4444', fontSize: '18px' }} />
        <h2 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Record Damaged / Lost Stock
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        
        {/* 2. RESPONSIVE GRID SYSTEM */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '15px' : '20px',
          alignItems: 'end'
        }}>
          
          {/* Variant Selection */}
          <div style={{ width: '100%' }}>
            <label style={labelStyle}>Inventory Variant</label>
            <select 
              value={formData.variant_id} 
              onChange={(e) => setFormData({...formData, variant_id: e.target.value})}
              style={{ ...inputStyle, cursor: 'pointer' }}
              required
            >
              <option value="">-- Select Product --</option>
              {variants?.map(v => (
                <option key={v.id} value={v.id}>
                    {v.products.name.substring(0, 15)}... | {v.sku}
                </option>
              ))}
            </select>
          </div>

          {/* Adjustment Type */}
          <div style={{ width: '100%' }}>
            <label style={labelStyle}>Reason Type</label>
            <select 
              value={formData.adjustment_type} 
              onChange={(e) => setFormData({...formData, adjustment_type: e.target.value})}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="Damaged">Damaged / Broken</option>
              <option value="Lost">Lost / Missing</option>
              <option value="Expired">Expired Goods</option>
            </select>
          </div>

          {/* Qty to Deduct */}
          <div style={{ width: '100%' }}>
            <label style={labelStyle}>Quantity to Deduct</label>
            <input 
              type="number" min="1"
              value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              style={inputStyle} required
            />
          </div>

          {/* Action Button - Slim on Mobile ✅ */}
          <div style={{ width: '100%' }}>
            <button 
              type="submit" 
              style={{
                width: '100%',
                backgroundColor: '#ef4444', // Alert Red
                color: '#ffffff',
                padding: isMobile ? '10px' : '13px', 
                border: 'none',
                borderRadius: '0px', 
                fontSize: isMobile ? '9px' : '11px',
                fontWeight: '950',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                lineHeight: '1',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
            >
              <FiMinusCircle size={isMobile ? 14 : 16} />
              Remove From Stock
            </button>
          </div>

          {/* Reason Description - Full Width */}
          <div style={{ gridColumn: isMobile ? 'span 1' : 'span 4', marginTop: '10px' }}>
            <label style={labelStyle}>Audit Memo (Detailed Reason)</label>
            <input 
              type="text" 
              placeholder="e.g. Broken screen during warehouse transit" 
              value={formData.reason} 
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              style={{ ...inputStyle, backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} 
              required
            />
          </div>
        </div>
      </form>

      {/* FOOTER NOTICE - Strictly Left Aligned ✅ */}
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
            * This action is irreversible and affects unit valuation logs *
          </p>
      </div>
    </div>
  );
}