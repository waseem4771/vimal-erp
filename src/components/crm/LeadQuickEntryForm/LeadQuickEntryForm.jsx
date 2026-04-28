"use client";

import { useState, useEffect } from 'react';
// Professional Icons for CRM ✅
import { FiUserPlus, FiZap } from 'react-icons/fi';

/**
 * Enterprise LeadQuickEntryForm - EXECUTIVE SHARP EDITION
 * Part 2: High-speed Lead Capture Interface.
 * Fix: Forced 0px Border Radius on all inputs and containers. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Mobile: Fully responsive stacked layout with compact height. ✅
 */
export default function LeadQuickEntryForm({ leadForm, setLeadForm, handleAddLead }) {
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
    padding: isMobile ? '20px 15px' : '30px 25px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', // Forced Sharp Edges ✅
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    borderRadius: '0px', // Sharp Inputs ✅
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
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  const submitBtnStyle = {
    backgroundColor: '#2563eb', // Elite Blue
    color: '#ffffff',
    padding: isMobile ? '11px' : '14px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. SECTION HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
        <FiUserPlus style={{ color: '#2563eb', fontSize: '18px' }} />
        <h2 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Lead Capture
        </h2>
      </div>

      <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Name Fields Row */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
            <div>
                <label style={labelStyle}>First Name</label>
                <input 
                    type="text" placeholder="Legal" 
                    value={leadForm.first_name} 
                    onChange={(e) => setLeadForm({...leadForm, first_name: e.target.value})}
                    style={inputStyle} required 
                />
            </div>
            <div>
                <label style={labelStyle}>Last Name</label>
                <input 
                    type="text" placeholder="Surname" 
                    value={leadForm.last_name} 
                    onChange={(e) => setLeadForm({...leadForm, last_name: e.target.value})}
                    style={inputStyle}
                />
            </div>
        </div>

        {/* Email Field */}
        <div>
            <label style={labelStyle}>Business Email</label>
            <input 
                type="email" placeholder="client@company.com" 
                value={leadForm.email} 
                onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                style={inputStyle} required 
            />
        </div>

        {/* Score & Submit Row */}
        <div style={{ marginTop: '5px' }}>
            <label style={labelStyle}>Potential Score (1-100)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                    type="number" placeholder="50" 
                    value={leadForm.lead_score} 
                    onChange={(e) => setLeadForm({...leadForm, lead_score: e.target.value})}
                    style={{ ...inputStyle, width: '80px', textAlign: 'center' }} required 
                />
                <button 
                    type="submit" 
                    style={submitBtnStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#1d4ed8')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#2563eb')}
                >
                  <FiZap size={14} />
                  Record
                </button>
            </div>
        </div>
      </form>

      {/* FOOTER NOTICE */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'left', margin: 0 }}>
             * Authorized Internal Entry *
          </p>
      </div>

    </div>
  );
}