
"use client";

import { useState, useEffect } from 'react';
import { FiCalendar, FiFilter, FiZap } from 'react-icons/fi';
import { getPresetDates } from '@/utils/datePresets';

/**
 * Enterprise PLFilters - EXECUTIVE CONTROL CENTER ✅
 * Purpose: Unified filtering engine for P&L Reporting with strict date sync.
 * Fix: Ensure preset clicks trigger immediate parent state synchronization. ✅
 * Style: 100% Sharp (0px Radius) & Executive Look. ✅
 */
export default function PLFilters({ filters, setFilters, onFetch, loading }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standard Presets according to ERP requirements
  const presets = [
    { label: 'Today', value: 'daily' },
    { label: 'Last 7 Days', value: 'weekly' },
    { label: 'Last Month', value: 'monthly' },
    { label: '3 Months', value: '3months' },
    { label: '6 Months', value: '6months' },
    { label: '1 Year', value: 'yearly' }
  ];

  /**
   * Function: handlePresetClick ✅
   * Logic: Force updates the parent filter state and ensures clean YYYY-MM-DD strings.
   */
  const handlePresetClick = (val) => {
    const dates = getPresetDates(val);
    // Explicitly setting strings to avoid JS Date object timezone shifts
    setFilters({ 
        startDate: String(dates.startDate), 
        endDate: String(dates.endDate) 
    });
  };

  // --- Inline Style Constants (VVIP Master UI) ---
  const mainBoxStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '25px 30px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px !important', // Forced Sharp
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '30px',
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
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '700',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px !important', 
    boxSizing: 'border-box'
  };

  const presetBtnStyle = (isActive) => ({
    backgroundColor: isActive ? '#0f172a' : '#ffffff',
    border: `1px solid ${isActive ? '#0f172a' : '#e2e8f0'}`,
    padding: isMobile ? '8px 10px' : '10px 18px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '900',
    color: isActive ? '#ffffff' : '#475569',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '0px !important',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  });

  const analyzeBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#2563eb', // Accounting Indigo
    color: '#ffffff',
    padding: isMobile ? '14px' : '15px 45px',
    border: 'none',
    borderRadius: '0px !important', 
    fontSize: '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: isMobile ? '100%' : 'auto',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)',
    lineHeight: '1'
  };

  return (
    <div style={mainBoxStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        {/* 1. QUICK PRESETS SECTION */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}><FiZap style={{color: '#f59e0b'}} /> Quick Reporting Presets</label>
          <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px',
              marginTop: '5px' 
          }}>
            {presets.map((p) => {
              const isActive = filters.startDate === getPresetDates(p.value).startDate && filters.endDate === getPresetDates(p.value).endDate;
              return (
                <button 
                  key={p.value} 
                  type="button"
                  onClick={() => handlePresetClick(p.value)} 
                  style={presetBtnStyle(isActive)}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. MANUAL OVERRIDES & ACTION ROW */}
        <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            alignItems: 'flex-end', 
            gap: '20px',
            borderTop: '1px solid #f8fafc',
            paddingTop: '25px'
        }}>
          
          <div style={{ flex: 1, width: '100%', textAlign: 'left' }}>
            <label style={labelStyle}><FiCalendar /> Override Period From</label>
            <input 
              type="date" 
              value={filters.startDate} 
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: 1, width: '100%', textAlign: 'left' }}>
            <label style={labelStyle}><FiCalendar /> Override Period To</label>
            <input 
              type="date" 
              value={filters.endDate} 
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              style={inputStyle}
            />
          </div>

          <button 
            type="button"
            onClick={onFetch} 
            disabled={loading}
            style={analyzeBtnStyle}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
          >
            <FiFilter size={16} />
            {loading ? "AUTHENTICATING..." : "Analyze Statement"}
          </button>

        </div>
      </div>

      {/* VVIP CSS FOR OVERRIDE ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
            filter: invert(0.5);
        }
      `}} />
    </div>
  );
}