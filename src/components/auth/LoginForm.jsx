

"use client";

import { useState, useEffect } from 'react';
// Professional Security & UI Icons ✅
import { FiMail, FiLock, FiUserCheck, FiAlertTriangle, FiArrowRight, FiActivity } from 'react-icons/fi';

/**
 * Enterprise LoginForm - EXECUTIVE GLASS EDITION
 * Purpose: Secure credential entry with a semi-transparent glass background.
 * Fix: Changed solid background to transparent/glassy to show the Water Mesh. ✅
 * Fix: Added Backdrop Blur for high-end "Frosted Glass" feel. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function LoginForm({ 
    credentials, 
    setCredentials, 
    handleLogin, 
    loading, 
    errorMsg 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const formWrapperStyle = {
    padding: isMobile ? '25px 20px' : '40px 50px',
    // GLASS EFFECT: Semi-transparent white with blur ✅
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    borderLeft: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#64748b', // Slate for better visibility on glass
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid rgba(15, 23, 42, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly opaque inputs
    fontSize: isMobile ? '13px' : '14px',
    fontWeight: '700',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  };

  const errorBoxStyle = {
    backgroundColor: 'rgba(254, 242, 242, 0.9)',
    padding: '12px 15px',
    borderLeft: '4px solid #ef4444',
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '0px'
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#334155' : '#0f172a',
    color: '#ffffff',
    padding: isMobile ? '14px' : '16px', 
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: loading ? 'none' : '0 10px 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    marginTop: '10px',
    lineHeight: '1',
    whiteSpace: 'nowrap'
  };

  return (
    <div style={formWrapperStyle}>
      
      {/* 1. SECTION HEADER */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid rgba(15, 23, 42, 0.05)', paddingBottom: '15px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.1em' }}>
              Personnel Authentication
          </h2>
      </div>

      {/* 2. DYNAMIC ERROR DISPLAY */}
      {errorMsg && (
        <div style={errorBoxStyle}>
          <FiAlertTriangle style={{ color: '#ef4444', fontSize: '18px' }} />
          <p style={{ fontSize: '10px', fontWeight: '900', color: '#991b1b', textTransform: 'uppercase', margin: 0 }}>
             Error: {errorMsg}
          </p>
        </div>
      )}

      {/* 3. LOGIN FORM WORKSPACE */}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Email Field */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}><FiMail size={11} /> Registered Email Address</label>
          <input 
            type="email" 
            required
            disabled={loading}
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            style={inputStyle}
            placeholder="admin@vimal-erp.com"
            onFocus={(e) => { if(!loading) e.target.style.borderColor = '#2563eb'; e.target.style.backgroundColor = '#ffffff'; }}
            onBlur={(e) => { if(!loading) e.target.style.borderColor = 'rgba(15, 23, 42, 0.1)'; e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; }}
          />
        </div>

        {/* Password Field */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}><FiLock size={11} /> Authorized Access Key</label>
          <input 
            type="password" 
            required
            disabled={loading}
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            style={inputStyle}
            placeholder="••••••••••••"
            onFocus={(e) => { if(!loading) e.target.style.borderColor = '#2563eb'; e.target.style.backgroundColor = '#ffffff'; }}
            onBlur={(e) => { if(!loading) e.target.style.borderColor = 'rgba(15, 23, 42, 0.1)'; e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; }}
          />
        </div>

        {/* Submit Action */}
        <button 
          type="submit" 
          disabled={loading}
          style={submitBtnStyle}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
        >
          {loading ? (
            <>
              <FiActivity size={16} className="animate-pulse-subtle" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <FiUserCheck size={16} />
              <span>Establish Secure Session</span>
              <FiArrowRight size={14} />
            </>
          )}
        </button>

      </form>

      {/* VVIP ANIMATION FOR LOADING ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-pulse-subtle {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}} />

      <div style={{ marginTop: '10px' }}></div>

    </div>
  );
}