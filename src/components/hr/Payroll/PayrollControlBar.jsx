"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Payroll Controls ✅
import { FiSettings, FiZap, FiSearch, FiCalendar } from 'react-icons/fi';

/**
 * Enterprise PayrollControlBar - EXECUTIVE CONTROL CENTER
 * Purpose: Configuration of fiscal period and triggering of calculation engine.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout for period inputs and action triggers. ✅
 * Style: Slate-50 inputs with high-contrast executive action buttons. ✅
 */
export default function PayrollControlBar({ 
    month, 
    setMonth, 
    year, 
    setYear, 
    handleGenerate, 
    syncAllData, 
    loading, 
    fetching 
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
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '25px 30px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '35px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'stretch' : 'flex-end',
    gap: '20px'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'left'
  };

  const inputStyle = {
    width: isMobile ? '100%' : 'auto',
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '13.5px',
    fontWeight: '900',
    color: '#2563eb', // Executive Blue for selections
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  const executeBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#2563eb',
    color: '#ffffff',
    padding: isMobile ? '12px 20px' : '14px 35px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: '10.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    whiteSpace: 'nowrap',
    lineHeight: '1'
  };

  const analyzeBtnStyle = {
    backgroundColor: fetching ? '#cbd5e1' : '#0f172a',
    color: '#ffffff',
    padding: isMobile ? '12px 20px' : '14px 35px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: '10.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: fetching ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    whiteSpace: 'nowrap',
    lineHeight: '1'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. FISCAL PERIOD CONFIGURATION ✅ */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', flex: 1 }}>
        <div style={{ flex: isMobile ? 'none' : '0 1 150px', textAlign: 'left' }}>
            <label style={labelStyle}><FiCalendar size={11} /> Select Month</label>
            <input 
                type="number" min="1" max="12" 
                value={month} onChange={(e) => setMonth(e.target.value)} 
                style={{ ...inputStyle, width: '100%' }}
            />
        </div>
        <div style={{ flex: isMobile ? 'none' : '0 1 150px', textAlign: 'left' }}>
            <label style={labelStyle}><FiSettings size={11} /> Fiscal Year</label>
            <input 
                type="number" 
                value={year} onChange={(e) => setYear(e.target.value)} 
                style={{ ...inputStyle, width: '100%' }}
            />
        </div>
      </div>

      {/* 2. ENGINE ACTION TRIGGER GROUP ✅ */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '12px' }}>
        <button 
            onClick={handleGenerate} 
            disabled={loading}
            style={executeBtnStyle}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
        >
            <FiZap size={14} />
            <span>{loading ? "Authorizing..." : "Execute Payroll"}</span>
        </button>

        <button 
            onClick={syncAllData} 
            disabled={fetching}
            style={analyzeBtnStyle}
            onMouseOver={(e) => !fetching && (e.target.style.backgroundColor = '#1e293b')}
            onMouseOut={(e) => !fetching && (e.target.style.backgroundColor = '#0f172a')}
        >
            <FiSearch size={14} />
            <span>{fetching ? "Syncing..." : "Analyze Expenditures"}</span>
        </button>
      </div>

    </div>
  );
}