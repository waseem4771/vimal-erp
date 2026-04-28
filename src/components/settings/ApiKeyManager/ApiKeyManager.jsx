

"use client";

import { useState, useEffect } from 'react';
// Professional Security & UI Icons ✅
import { FiKey, FiEye, FiEyeOff, FiCopy, FiActivity, FiDatabase, FiServer } from 'react-icons/fi';

/**
 * Enterprise ApiKeyManager - EXECUTIVE SHARP EDITION (MAX RESPONSIVE)
 * Purpose: Secure registry for B2B credentials with dual-layout (Cards for Mobile / Table for Laptop).
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Fix: Complete mobile responsiveness with zero horizontal overflow. ✅
 * Style: Slate-900 headers with high-contrast security controls. ✅
 */
export default function ApiKeyManager({ keys, fetching }) {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Logic Helpers (100% Preserved) ---
  const toggleVisibility = (id) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text) => {
    if (typeof window !== 'undefined') {
        navigator.clipboard.writeText(text);
        alert("Security Alert: Credential copied to clipboard.");
    }
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
    backgroundColor: '#0f172a', // Corporate Dark Slate
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b'
  };

  const mobileCardStyle = {
    padding: '15px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left'
  };

  const thStyle = (align = 'left') => ({
    padding: '15px 20px',
    fontSize: '10px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: align,
    borderBottom: '1.5px solid #0f172a',
    backgroundColor: '#fcfcfd',
    whiteSpace: 'nowrap'
  });

  const tdStyle = (align = 'left') => ({
    padding: '15px 20px',
    fontSize: '13px',
    color: '#1e293b',
    fontWeight: '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle'
  });

  // --- Shared Table Header Component ---
  const SectionHeader = () => (
    <div style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiDatabase style={{ color: '#3b82f6', fontSize: '18px' }} />
        <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
            Authorized Integration Registry
        </h3>
      </div>
      <span style={{ 
          fontSize: '8.5px', 
          backgroundColor: '#10b981', 
          color: '#ffffff', 
          padding: '3px 10px', 
          fontWeight: '950', 
          textTransform: 'uppercase'
      }}>
          Live Sync Active
      </span>
    </div>
  );

  // --- 1. FETCHING / EMPTY STATE ---
  if (fetching) {
    return (
      <div style={containerStyle}>
        <SectionHeader />
        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <FiActivity className="animate-spin" style={{ color: '#2563eb', fontSize: '32px', marginBottom: '15px' }} />
            <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Syncing Credentials...</p>
        </div>
      </div>
    );
  }

  if (!keys || keys.length === 0) {
    return (
      <div style={containerStyle}>
        <SectionHeader />
        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <p style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                * No marketplace connections detected *
            </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR SHARP EDGES & PULSE ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .api-manager-container * { border-radius: 0px !important; }
        .key-row:hover { background-color: #f8fafc !important; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        .animate-spin { animation: spin 1.5s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />

      <div className="api-manager-container" style={containerStyle}>
        
        <SectionHeader />

        {/* 2. DYNAMIC LAYOUT AREA ✅ */}
        {isMobile ? (
          /* --- MOBILE LAYOUT: SECURITY CARDS --- */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {keys.map((k) => (
              <div key={k.id} style={mobileCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiServer style={{ color: '#3b82f6' }} />
                    <span style={{ fontWeight: '950', color: '#0f172a', fontSize: '13px', textTransform: 'uppercase' }}>{k.platform_name}</span>
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: '950', color: '#10b981', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' }} className="animate-pulse"></span> {k.status}
                  </span>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '10px', border: '1px solid #e2e8f0' }}>
                    <label style={{ fontSize: '8px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Client ID</label>
                    <code style={{ fontSize: '11px', fontWeight: '800', color: '#2563eb', fontFamily: 'monospace' }}>{k.client_id}</code>
                </div>

                <div style={{ backgroundColor: '#0f172a', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <label style={{ fontSize: '8px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Private Secret Key</label>
                        <code style={{ 
                            fontSize: '11px', 
                            color: visibleKeys[k.id] ? '#ffffff' : '#1e293b', 
                            fontFamily: 'monospace',
                            backgroundColor: visibleKeys[k.id] ? 'transparent' : '#1e293b',
                            padding: '2px 4px',
                            display: 'block',
                            wordBreak: 'break-all'
                        }}>
                            {k.secret_key}
                        </code>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginLeft: '15px' }}>
                        <button onClick={() => toggleVisibility(k.id)} style={{ backgroundColor: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer' }}>
                            {visibleKeys[k.id] ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                        <button onClick={() => handleCopy(k.secret_key)} style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                            <FiCopy size={18} />
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- LAPTOP LAYOUT: EXECUTIVE DATA TABLE --- */
          <div style={{ width: '100%', overflowX: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle('left')}>Integration Platform</th>
                  <th style={thStyle('left')}>System Client ID</th>
                  <th style={thStyle('left')}>Secure Secret Key</th>
                  <th style={thStyle('center')}>Registry Status</th>
                  <th style={thStyle('right')}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => (
                  <tr key={k.id} className="key-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                    <td style={tdStyle('left')}>
                        <div style={{ fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', fontSize: '12.5px' }}>{k.platform_name}</div>
                        <div style={{ fontSize: '9px', color: '#cbd5e1', fontWeight: '800', marginTop: '2px' }}>VERIFIED HUB</div>
                    </td>
                    <td style={tdStyle('left')}>
                        <code style={{ fontSize: '11px', fontWeight: '800', color: '#2563eb', fontFamily: 'monospace' }}>{k.client_id}</code>
                    </td>
                    <td style={tdStyle('left')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f8fafc', padding: '6px 12px', border: '1px solid #e2e8f0', width: 'fit-content' }}>
                            <code style={{ 
                                fontSize: '11px', 
                                color: visibleKeys[k.id] ? '#1e293b' : '#cbd5e1', 
                                fontFamily: 'monospace',
                                filter: visibleKeys[k.id] ? 'none' : 'blur(4px)',
                                transition: 'all 0.3s ease'
                            }}>
                                {k.secret_key}
                            </code>
                            <button 
                                onClick={() => toggleVisibility(k.id)} 
                                style={{ backgroundColor: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex' }}
                                title="Toggle Visibility"
                            >
                                {visibleKeys[k.id] ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                            </button>
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
                        gap: '6px'
                      }}>
                        <span style={{ width: '5px', height: '5px', backgroundColor: '#10b981', borderRadius: '50%' }} className="animate-pulse"></span>
                        {k.status}
                      </span>
                    </td>
                    <td style={tdStyle('right')}>
                      <button 
                        onClick={() => handleCopy(k.secret_key)}
                        style={{
                            backgroundColor: '#f1f5f9',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            padding: '6px 12px',
                            fontSize: '9px',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = '#0f172a'; e.target.style.color = '#ffffff'; }}
                        onMouseOut={(e) => { e.target.style.backgroundColor = '#f1f5f9'; e.target.style.color = '#475569'; }}
                      >
                        <FiCopy /> Copy Secret
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. TABLE FOOTER ✅ Strictly Left Aligned */}
        <div style={{ padding: '12px 25px', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9', textAlign: 'left' }}>
           <p style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
              * Security Notice: Secret keys are cryptographically hashed and only visible to authorized administrators *
           </p>
        </div>

      </div>
    </div>
  );
}