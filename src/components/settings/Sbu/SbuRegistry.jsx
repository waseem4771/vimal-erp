
"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Configuration ✅
import { FiPlus, FiBriefcase, FiMapPin, FiDollarSign, FiShield, FiTrendingUp, FiActivity, FiGlobe, FiPercent } from 'react-icons/fi';

/**
 * Enterprise SbuRegistry - EXECUTIVE MASTER RESPONSIVE EDITION (Automation Ready)
 * Purpose: Centralized interface for Strategic Business Unit enrollment and global registry.
 * Update: Fixed Profit Share Percentage visibility in both Mobile and Laptop views. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 * Mobile: Full-width stacking with premium data cards. ✅
 */
export default function SbuRegistry({ 
  formData, 
  handleChange, 
  handleSubmit, 
  loading, 
  sbus,
  selectedSbuId 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    display: isMobile ? 'flex' : 'grid',
    flexDirection: isMobile ? 'column' : 'row',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 2.2fr',
    gap: isMobile ? '20px' : '30px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflowX: 'hidden'
  };

  const sectionCardStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '15px 12px' : '30px 35px',
    border: '1px solid #e2e8f0',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13.5px',
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
    letterSpacing: '0.15em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'left'
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#0f172a',
    color: '#ffffff',
    padding: isMobile ? '12px 10px' : '15px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '9.5px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box'
  };

  const mobileCardStyle = {
    padding: '15px 12px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'left',
    boxSizing: 'border-box'
  };

  const thStyle = {
    padding: '15px 20px', 
    fontSize: '10px', 
    fontWeight: '950', 
    color: '#94a3b8', 
    textTransform: 'uppercase', 
    textAlign: 'left', 
    borderBottom: '1.5px solid #0f172a', 
    backgroundColor: '#fcfcfd'
  };

  return (
    <div style={containerStyle}>
      
      {/* VVIP CSS INJECTION FOR SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .sbu-registry-container * { border-radius: 0px !important; box-sizing: border-box !important; }
        .sbu-row:hover { background-color: #f8fafc !important; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}} />

      {/* 1. INITIALIZATION FORM SECTION ✅ */}
      <div style={sectionCardStyle} className="sbu-registry-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
            <FiBriefcase style={{ color: '#2563eb', fontSize: '18px' }} />
            <h3 style={{ fontSize: isMobile ? '12px' : '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Strategic Enrollment
            </h3>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiShield size={11} /> Business Identity Name</label>
            <input type="text" name="sbu_name" value={formData.sbu_name} onChange={handleChange} placeholder="e.g. Ontario Logistics Hub" required style={inputStyle} />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiGlobe size={11} /> Operating Model</label>
            <select name="sbu_type" value={formData.sbu_type} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}>
              <option value="Online_Store">Digital E-Commerce Platform</option>
              <option value="Physical_Branch">Physical Retail Location</option>
              <option value="Service_Unit">Consultancy & Service Unit</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiDollarSign size={11} /> Currency</label>
                <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="CAD" maxLength={3} required style={{ ...inputStyle, fontWeight: '900', color: '#2563eb' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiPercent size={11} /> Share %</label>
                <input type="number" step="0.01" name="profit_share_percentage" value={formData.profit_share_percentage} onChange={handleChange} placeholder="10.00" required style={{ ...inputStyle, fontWeight: '900', color: '#10b981' }} />
              </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiMapPin size={11} /> Headquarters Location</label>
            <textarea name="location" value={formData.location} onChange={handleChange} rows="2" placeholder="Full physical address..." style={{ ...inputStyle, height: 'auto', resize: 'none', lineHeight: '1.4' }} />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={submitBtnStyle}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
          >
            <FiPlus size={16} />
            <span>{loading ? "Authorizing..." : "Initialize Business Unit"}</span>
          </button>
        </form>
      </div>

      {/* 2. SUBSIDIARY LEDGER SECTION ✅ */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }} className="sbu-registry-container">
        
        <div style={{
          padding: isMobile ? '12px' : '18px 25px',
          backgroundColor: '#0f172a',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid #1e293b',
          gap: isMobile ? '8px' : '0'
        }}>
          <h3 style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Authorized Business Units
          </h3>
          <span style={{ fontSize: '8px', backgroundColor: '#2563eb', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
              Mother Company Hub
          </span>
        </div>

        {isMobile ? (
          /* --- MOBILE LAYOUT --- */
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {sbus && sbus.length > 0 ? sbus.map((sbu) => (
              <div key={sbu.id} style={mobileCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: '950', color: '#0f172a', fontSize: '13px', textTransform: 'uppercase' }}>{sbu.sbu_name}</div>
                        <div style={{ display: 'flex', gap: '5px', marginTop: '4px' }}>
                             <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '1px 6px', fontSize: '8px', fontWeight: '900', border: '1px solid #e2e8f0' }}>{sbu.local_currency}</span>
                             <span style={{ backgroundColor: '#ecfdf5', color: '#10b981', padding: '1px 6px', fontSize: '8px', fontWeight: '900', border: '1px solid #d1fae5' }}>
                                 {/* Displaying value in Mobile cards ✅ */}
                                 {parseFloat(sbu.profit_share_percentage || 0).toFixed(2)}% Share
                             </span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px', paddingTop: '8px', borderTop: '1px solid #f8fafc' }}>
                    <span style={{ fontSize: '8px', color: '#64748b', fontWeight: '900', textTransform: 'uppercase' }}>Net Revenue:</span>
                    <span style={{ fontWeight: '950', color: '#2563eb', fontSize: '14px', fontFamily: 'monospace' }}>
                        ${parseFloat(sbu.revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                </div>
              </div>
            )) : (
              <p style={{ padding: '40px', textAlign: 'center', color: '#cbd5e1', fontSize: '10px', textTransform: 'uppercase', fontWeight: '800' }}>* Zero Subsidiaries *</p>
            )}
          </div>
        ) : (
          /* --- LAPTOP LAYOUT --- */
          <div style={{ width: '100%', overflowX: 'hidden', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Unit Identity</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Currency</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Share (%)</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Net Revenue (USD)</th>
                </tr>
              </thead>
              <tbody>
                {sbus && sbus.length > 0 ? sbus.map((sbu) => (
                  <tr key={sbu.id} className="sbu-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    <td style={{ padding: '15px 20px', textAlign: 'left' }}>
                        <div style={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', fontSize: '13px' }}>{sbu.sbu_name}</div>
                        <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FiActivity size={8} className="animate-pulse" style={{ color: '#10b981' }} /> Subsidiary Entity
                        </div>
                    </td>
                    <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                      <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 12px', fontSize: '10px', fontWeight: '900', border: '1px solid #e2e8f0', fontFamily: 'monospace' }}>
                        {sbu.local_currency}
                      </span>
                    </td>
                    <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                      <span style={{ color: '#10b981', fontWeight: '950', fontSize: '13px', fontFamily: 'monospace' }}>
                        {/* Displaying value in Laptop table ✅ */}
                        {parseFloat(sbu.profit_share_percentage || 0).toFixed(2)}%
                      </span>
                    </td>
                    <td style={{ padding: '15px 20px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '950', color: '#2563eb', fontSize: '16px' }}>
                      ${parseFloat(sbu.revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" style={{ padding: '100px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No entities in registry *</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. FOOTER ANALYTICS NOTICE ✅ */}
        <div style={{ padding: '12px 15px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9', textAlign: 'left' }}>
           <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiTrendingUp style={{ color: '#cbd5e1' }} /> Real-time organizational data distribution
           </p>
        </div>
      </div>

    </div>
  );
}