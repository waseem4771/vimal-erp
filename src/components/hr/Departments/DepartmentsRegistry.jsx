

"use client";

import { useState, useEffect } from 'react';
// Professional Icons for HR ✅
import { FiPlus, FiTrash2, FiShield } from 'react-icons/fi';

/**
 * Enterprise DepartmentsRegistry - EXECUTIVE SHARP EDITION
 * Purpose: Combined interface for department enrollment and registry management.
 * Fix: Integrated 'handleDelete' function to enable "Revoke Access" button. ✅
 * Fix: Save Department button reduced in size and text/icon aligned in one line. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Responsive form stacking and stealth-scroll ledger. ✅
 */
export default function DepartmentsRegistry({ 
  deptName, 
  setDeptName, 
  handleSubmit, 
  handleDelete, // New prop received ✅
  loading, 
  fetching, 
  departments, 
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
  const sectionCardStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '25px 35px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '30px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    flex: 1,
    padding: isMobile ? '10px' : '12px',
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
    fontSize: '9.5px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textAlign: 'left'
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#0f172a',
    color: '#ffffff',
    padding: isMobile ? '10px 18px' : '11px 25px', 
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '9.5px' : '10.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    lineHeight: '1',
    width: isMobile ? '100%' : 'auto'
  };

  const thStyle = (align = 'left') => ({
    padding: isMobile ? '12px 15px' : '18px 25px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: align,
    borderBottom: '1.5px solid #0f172a',
    backgroundColor: '#fcfcfd',
    whiteSpace: 'nowrap'
  });

  const tdStyle = (align = 'left', isBold = false) => ({
    padding: isMobile ? '12px 15px' : '16px 25px',
    fontSize: isMobile ? '11.5px' : '13px',
    color: isBold ? '#0f172a' : '#475569',
    fontWeight: isBold ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle'
  });

  return (
    <div style={{ width: '100%' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .dept-registry-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .dept-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="dept-registry-wrapper">
        
        {/* 1. INITIALIZE DEPARTMENT FORM */}
        <div style={sectionCardStyle}>
          <label style={labelStyle}>
            <FiShield style={{ color: '#2563eb' }} />
            Authorize New Department Designation
          </label>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px', alignItems: isMobile ? 'stretch' : 'center' }}>
            <input 
              type="text" 
              value={deptName} 
              onChange={(e) => setDeptName(e.target.value)}
              placeholder="e.g. Operations, Logistics, Corporate Finance" 
              required
              style={inputStyle}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={submitBtnStyle}
              onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
            >
              <FiPlus size={isMobile ? 13 : 15} />
              <span>{loading ? "Authorizing..." : "Save Department"}</span>
            </button>
          </form>
        </div>

        {/* 2. ACTIVE DEPARTMENT LEDGER */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
          width: '100%'
        }}>
          {/* Table Header */}
          <div style={{
            padding: isMobile ? '12px 15px' : '15px 25px',
            backgroundColor: '#0f172a',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Authorized Unit Registry
            </h3>
            <span style={{ fontSize: '8px', backgroundColor: '#2563eb', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
                Unit {selectedSbuId}
            </span>
          </div>

          <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '600px' : '100%' }}>
              <thead>
                <tr>
                  <th style={thStyle('left')}>Reference ID</th>
                  <th style={thStyle('left')}>Department Designation</th>
                  <th style={thStyle('right')}>Administrative Action</th>
                </tr>
              </thead>
              <tbody>
                {fetching ? (
                  <tr>
                    <td colSpan="3" style={{ padding: '60px', textAlign: 'center' }}>
                        <div className="animate-spin" style={{ display: 'inline-block', height: '24px', width: '24px', border: '3px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '10px' }}></div>
                        <p style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Synchronizing Ledger...</p>
                    </td>
                  </tr>
                ) : departments.length > 0 ? (
                  departments.map((d) => (
                    <tr key={d.id} className="dept-row" style={{ transition: 'all 0.2s' }}>
                      <td style={{ ...tdStyle('left'), fontFamily: 'monospace', color: '#94a3b8' }}>
                        #{d.id}
                      </td>
                      <td style={tdStyle('left', true)}>
                        {d.dept_name}
                      </td>
                      <td style={tdStyle('right')}>
                        {/* REFIXED: Added handleDelete call here ✅ */}
                        <button 
                          onClick={() => handleDelete(d.id)}
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #fee2e2',
                            color: '#ef4444',
                            padding: '6px 12px',
                            fontSize: '9px',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                          onMouseOver={(e) => { e.target.style.backgroundColor = '#ef4444'; e.target.style.color = '#ffffff'; }}
                          onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ef4444'; }}
                        >
                          <FiTrash2 /> Revoke Access
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                      * No active departments detection in unit {selectedSbuId} *
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}