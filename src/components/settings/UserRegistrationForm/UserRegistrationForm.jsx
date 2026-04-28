"use client";

import { useState, useEffect } from 'react';
// Professional Icons for User Management ✅
import { FiUser, FiMail, FiShield, FiLock, FiPlus, FiUserPlus, FiLayers } from 'react-icons/fi';

/**
 * UserRegistrationForm Component - EXECUTIVE SHARP EDITION
 * Purpose: Professional UI for Super Admins to enroll new team members.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout (1-column Mobile / Multi-column Laptop). ✅
 * Style: Slate-50 inputs with high-contrast administrative blue accents. ✅
 */
export default function UserRegistrationForm({ sbus, onSubmit, loading }) {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role_id: '2', // Default: SBU Manager
    sbu_id: ''
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Resetting form after submission attempt
    setFormData({ full_name: '', email: '', password: '', role_id: '2', sbu_id: '' });
  };

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '35px 40px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '35px'
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
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
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
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#2563eb', // Executive Blue
    color: '#ffffff',
    padding: isMobile ? '12px 20px' : '16px 40px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    lineHeight: '1',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. COMPONENT HEADER ✅ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #f8fafc', paddingBottom: '15px' }}>
          <FiUserPlus style={{ color: '#2563eb', fontSize: '18px' }} />
          <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Enroll New Team Member
          </h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* 2. IDENTITY SECTION ✅ */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
        }}>
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiUser size={11} /> Full Legal Name</label>
            <input 
              type="text" required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              style={inputStyle}
              placeholder="First & Last Name"
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiMail size={11} /> Corporate Email</label>
            <input 
              type="email" required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={inputStyle}
              placeholder="name@vimal-erp.com"
            />
          </div>
        </div>

        {/* 3. AUTHORIZATION SECTION ✅ */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '30px'
        }}>
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiShield size={11} /> System Role</label>
            <select 
              value={formData.role_id}
              onChange={(e) => setFormData({...formData, role_id: e.target.value})}
              style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}
            >
              <option value="1">Super Admin (Mother Co)</option>
              <option value="2">SBU Manager (Unit Head)</option>
              <option value="3">Accountant / Staff</option>
            </select>
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiLayers size={11} /> Assigned Business Unit</label>
            <select 
              value={formData.sbu_id}
              onChange={(e) => setFormData({...formData, sbu_id: e.target.value})}
              style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}
              required
            >
              <option value="">-- Select Unit --</option>
              {sbus?.map(sbu => (
                <option key={sbu.id} value={sbu.id}>{sbu.sbu_name}</option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiLock size={11} /> Initial Access Key</label>
            <input 
              type="password" required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={inputStyle}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* 4. ACTION TRIGGER ✅ */}
        <button 
          type="submit" 
          disabled={loading}
          style={submitBtnStyle}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
        >
          <FiPlus size={16} />
          <span>{loading ? "Authorizing Identity..." : "Authorize & Create Team Account"}</span>
        </button>
      </form>

      {/* 5. NOTICE FOOTER */}
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', fontStyle: 'italic', margin: 0 }}>
             * Authorized Personnel Recruitment Synchronization Active *
          </p>
      </div>

    </div>
  );
}