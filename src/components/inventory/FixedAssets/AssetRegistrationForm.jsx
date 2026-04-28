

"use client";

import { useState, useEffect } from 'react';
import { FiPlus, FiBriefcase } from 'react-icons/fi';

/**
 * AssetRegistrationForm Component - EXECUTIVE SHARP EDITION
 * Fix: Button thickness on mobile locked by forcing single-line text. ✅
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Layout: 1 col Mobile / 4 col Laptop. ✅
 */
export default function AssetRegistrationForm({ onSubmit, loading }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    asset_name: '',
    asset_type: 'Electronics',
    purchase_date: '',
    purchase_price: '',
    salvage_value: '0',
    useful_life: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => {
      setFormData({
        asset_name: '',
        asset_type: 'Electronics',
        purchase_date: '',
        purchase_price: '',
        salvage_value: '0',
        useful_life: ''
      });
    });
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
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: isMobile ? '8px' : '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '5px',
    display: 'block'
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: isMobile ? '20px' : '30px',
      border: '1px solid #f1f5f9',
      borderRadius: '0px', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
      marginBottom: '35px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* 1. SECTION HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '10px' }}>
        <FiBriefcase style={{ color: '#2563eb', fontSize: '16px' }} />
        <h2 style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
            Asset Enrollment Workspace
        </h2>
      </div>

      <form onSubmit={handleFormSubmit}>
        {/* 2. RESPONSIVE GRID SYSTEM */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '15px' : '20px',
          marginBottom: '25px'
        }}>
          
          <div>
            <label style={labelStyle}>Asset Description</label>
            <input 
              type="text" name="asset_name" placeholder="e.g. Macbook M3 Max" 
              value={formData.asset_name} onChange={handleChange} 
              style={inputStyle} required 
            />
          </div>

          <div>
            <label style={labelStyle}>Classification</label>
            <select 
              name="asset_type" value={formData.asset_type} onChange={handleChange} 
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="Electronics">Electronics / IT</option>
              <option value="Furniture">Office Furniture</option>
              <option value="Machinery">Industrial Machinery</option>
              <option value="Vehicles">Company Vehicles</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Acquisition Date</label>
            <input 
              type="date" name="purchase_date" 
              value={formData.purchase_date} onChange={handleChange} 
              style={inputStyle} required 
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Net Cost ($)</label>
              <input 
                type="number" step="0.01" name="purchase_price" placeholder="0.00" 
                value={formData.purchase_price} onChange={handleChange} 
                style={{ ...inputStyle, color: '#2563eb', fontWeight: '900' }} required 
              />
            </div>
            <div>
              <label style={labelStyle}>Life (Y)</label>
              <input 
                type="number" name="useful_life" placeholder="5" 
                value={formData.useful_life} onChange={handleChange} 
                style={{ ...inputStyle, textAlign: 'center' }} required 
              />
            </div>
          </div>
        </div>

        {/* 3. SUBMIT BUTTON - FIXED HEIGHT ON MOBILE ✅ */}
        <button 
          type="submit" 
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: loading ? '#cbd5e1' : '#2563eb',
            color: '#ffffff',
            // Mobile padding tightly controlled to prevent "mota" look ✅
            padding: isMobile ? '10px 8px' : '15px', 
            border: 'none',
            borderRadius: '0px', 
            // Text size reduced on mobile for single-line fit ✅
            fontSize: isMobile ? '9px' : '11px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: isMobile ? '0.1em' : '0.2em',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)',
            transition: 'background 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            // High priority rules to prevent text wrapping and thickness growth ✅
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            lineHeight: '1'
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
        >
          <FiPlus size={isMobile ? 14 : 16} />
          <span>{loading ? "Syncing..." : "Register Asset & Finalize Sync"}</span>
        </button>
      </form>
    </div>
  );
}