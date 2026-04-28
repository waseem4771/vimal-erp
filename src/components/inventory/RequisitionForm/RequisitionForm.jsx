"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
import { FiShield, FiDollarSign, FiSend } from 'react-icons/fi';

/**
 * Enterprise RequisitionForm Component - EXECUTIVE SHARP EDITION (Compact)
 * Fix: Reduced button padding for both Mobile and Laptop. ✅
 * Fix: Reduced card vertical padding for Laptop view. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function RequisitionForm({ selectedSbuId, onSubmit, loading }) {
  const [amount, setAmount] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit(amount, () => setAmount('')); 
  };

  // --- Inline Style Constants ---
  const cardStyle = {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '550px',
    // Laptop vertical padding reduced from 50px to 30px ✅
    padding: isMobile ? '20px 20px' : '30px 60px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '15px 15px 15px 45px' : '20px 20px 20px 55px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    fontSize: isMobile ? '24px' : '42px',
    fontWeight: '950',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
    letterSpacing: '-0.04em'
  };

  const submitBtnStyle = {
    width: '100%',
    backgroundColor: loading || !amount ? '#cbd5e1' : '#0f172a',
    color: '#ffffff',
    // Button padding significantly reduced for both screens ✅
    padding: isMobile ? '10px 0' : '18px 0', 
    border: 'none',
    borderRadius: '0px',
    fontSize: isMobile ? '10px' : '13px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    cursor: loading || !amount ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '25px',
    lineHeight: '1'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      
      {/* 1. TOP NAVIGATION & IDENTITY */}
      <div style={{ width: '100%', maxWidth: '550px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>
                New Requisition
            </h1>
            <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
                Unit Context: <span style={{ color: '#2563eb' }}>ID {selectedSbuId}</span>
            </p>
        </div>
      </div>

      {/* 2. REQUISITION WORKSPACE CARD */}
      <div style={cardStyle}>
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '25px' : '35px' }}>
            <div style={{ color: '#2563eb', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                <FiDollarSign size={isMobile ? 35 : 55} strokeWidth={1} />
            </div>
            <h2 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '950', color: '#1e293b', textTransform: 'uppercase', margin: 0 }}>Expenditure Request</h2>
            <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginTop: '5px' }}>Authorized Revenue Operations</p>
        </div>

        <form onSubmit={handleLocalSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '9px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '8px', textAlign: 'left' }}>
                Requested Amount (USD)
            </label>
            <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: isMobile ? '15px' : '20px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1', fontWeight: '900', fontSize: isMobile ? '20px' : '32px' }}>$</span>
                <input 
                    type="number" step="0.01" placeholder="0.00" 
                    value={amount} onChange={(e) => setAmount(e.target.value)}
                    style={inputStyle} required
                />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !amount}
            style={submitBtnStyle}
            onMouseOver={(e) => !loading && amount && (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => !loading && amount && (e.target.style.backgroundColor = '#0f172a')}
          >
            <FiSend size={isMobile ? 14 : 18} />
            <span>{loading ? "Authorizing..." : "Submit for Authorization"}</span>
          </button>
        </form>

        {/* 3. POLICY REMINDER BUBBLE */}
        <div style={{
            marginTop: '25px',
            padding: '12px',
            backgroundColor: '#fff7ed',
            border: '1px solid #ffedd5',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
        }}>
            <FiShield style={{ color: '#f97316', fontSize: '16px', marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: '9px', color: '#9a3412', fontWeight: '800', textTransform: 'uppercase', textAlign: 'left', lineHeight: '1.5', margin: 0 }}>
                Threshold: Requisitions exceeding <span style={{ textDecoration: 'underline', color: '#7c2d12' }}>$1,000</span> require Unit Director verification.
            </p>
        </div>

      </div>

      {/* FOOTER */}
      <div style={{ width: '100%', maxWidth: '550px', marginTop: '30px', textAlign: 'left' }}>
         <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>
            * Global Financial Integrity Standards *
         </p>
      </div>

    </div>
  );
}