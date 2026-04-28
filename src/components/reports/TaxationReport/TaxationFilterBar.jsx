"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Filtering ✅
import { FiCalendar, FiFilter, FiSearch } from 'react-icons/fi';

/**
 * Enterprise TaxationFilterBar - EXECUTIVE CONTROL CENTER
 * Purpose: Manual period overrides and compliance check trigger.
 * Fix: Run button size reduced specifically for mobile screens. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function TaxationFilterBar({ filters, setFilters, onFetch, loading }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const mainBoxStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '15px' : '25px 30px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '35px',
    width: '100%',
    boxSizing: 'border-box'
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
    width: '100%',
    padding: isMobile ? '10px' : '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '700',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  const actionBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#2563eb',
    color: '#ffffff',
    // Mobile par button ko mazeed slim aur chota kiya gaya hai ✅
    padding: isMobile ? '10px 20px' : '14px 35px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '9px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: isMobile ? '100%' : 'auto',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)',
    lineHeight: '1',
    whiteSpace: 'nowrap'
  };

  return (
    <div style={mainBoxStyle}>
      <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          alignItems: 'flex-end', 
          gap: isMobile ? '15px' : '20px',
          width: '100%'
      }}>
        
        {/* PERIOD START INPUT */}
        <div style={{ flex: 1, width: '100%', textAlign: 'left' }}>
          <label style={labelStyle}>
            <FiCalendar /> Audit Period From
          </label>
          <input 
            type="date" 
            value={filters.startDate} 
            onChange={(e) => setFilters({...filters, startDate: e.target.value})}
            style={inputStyle}
          />
        </div>

        {/* PERIOD END INPUT */}
        <div style={{ flex: 1, width: '100%', textAlign: 'left' }}>
          <label style={labelStyle}>
            <FiCalendar /> Audit Period To
          </label>
          <input 
            type="date" 
            value={filters.endDate} 
            onChange={(e) => setFilters({...filters, endDate: e.target.value})}
            style={inputStyle}
          />
        </div>

        {/* EXECUTION TRIGGER - SLIM ON MOBILE ✅ */}
        <button 
          onClick={onFetch} 
          disabled={loading}
          style={actionBtnStyle}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
        >
          <FiSearch size={isMobile ? 14 : 16} />
          {loading ? "Syncing..." : isMobile ? "Check Audit" : "Run Compliance Check"}
        </button>

      </div>
    </div>
  );
}