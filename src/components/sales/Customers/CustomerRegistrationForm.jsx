
"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiUserPlus, FiPlus, FiLayers } from 'react-icons/fi';

/**
 * Enterprise CustomerRegistrationForm - EXECUTIVE SHARP EDITION (Tier-Ready)
 * Fix: Added Customer Tier selection (Retail, Wholesale, VIP). ✅
 * Fix: Button thickness on mobile minimized by reducing vertical padding and font-size. ✅
 * Fix: Forced 0px Border Radius on all inputs and containers. ✅
 * Mobile: Fully responsive 1-column stack. ✅
 * Laptop: Balanced 5-column horizontal grid for precision alignment. ✅
 */
export default function CustomerRegistrationForm({ formData, handleChange, handleSubmit, loading, selectedSbuId }) {
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
    padding: isMobile ? '20px 15px' : '30px 35px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '35px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '10px' : '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
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
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    textAlign: 'left'
  };

  const submitBtnStyle = {
    width: '100%',
    backgroundColor: loading ? '#cbd5e1' : '#0f172a', // Executive Dark
    color: '#ffffff',
    padding: isMobile ? '9px 8px' : '14px', 
    border: 'none',
    borderRadius: '0px',
    fontSize: isMobile ? '8.5px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: isMobile ? '0.05em' : '0.2em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '6px' : '10px',
    marginTop: '25px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    whiteSpace: 'nowrap',
    lineHeight: '1',
    overflow: 'hidden'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. SECTION HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
        <FiUserPlus style={{ color: '#2563eb', fontSize: '18px' }} />
        <h2 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Entity Enrollment Workspace
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 2. RESPONSIVE GRID SYSTEM (5 Columns on Laptop) ✅ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
          gap: isMobile ? '15px' : '15px'
        }}>
          
          {/* Customer Name */}
          <div>
            <label style={labelStyle}>Legal Entity Name</label>
            <input
              type="text" name="customer_name" placeholder="Full name / Company"
              value={formData.customer_name} onChange={handleChange} required
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Business Email</label>
            <input
              type="email" name="email" placeholder="example@domain.com"
              value={formData.email} onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Contact */}
          <div>
            <label style={labelStyle}>Contact Number</label>
            <input
              type="text" name="phone" placeholder="+1 (XXX) XXX-XXXX"
              value={formData.phone} onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Tier Selection - NEW FIELD ✅ */}
          <div>
            <label style={labelStyle}><FiLayers size={10} /> Strategic Tier</label>
            <select 
                name="tier" 
                value={formData.tier || 'Retail'} 
                onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800', color: '#2563eb' }}
            >
                <option value="Retail">Retail Client</option>
                <option value="Wholesale">Wholesale Entity</option>
                <option value="VIP">VIP / Partner</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label style={labelStyle}>Billing Location</label>
            <input
              type="text" name="address" placeholder="City, State, Zip"
              value={formData.address} onChange={handleChange}
              style={inputStyle}
            />
          </div>

        </div>

        {/* 3. SUBMIT ACTION BUTTON (Mobile Slim Version) */}
        <button 
            type="submit" 
            disabled={loading} 
            style={submitBtnStyle}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
        >
          <FiPlus size={isMobile ? 14 : 16} />
          <span>{loading ? "Authenticating..." : `Authorize & Enroll Entity for Unit ${selectedSbuId}`}</span>
        </button>
      </form>
    </div>
  );
}