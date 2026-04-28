"use client";

import { useState, useEffect } from 'react';
import { FiCalendar, FiFilter, FiZap } from 'react-icons/fi';
import { getPresetDates } from '@/utils/datePresets';

/**
 * Enterprise CashFlowFilters - EXECUTIVE CONTROL CENTER
 * Purpose: Unified filtering engine for Cash Flow Monitoring.
 * Fix: Combined Presets and Manual Date Inputs into a single Sharp UI block. ✅
 * Fix: High-priority Inline Styles & 0px Border Radius. ✅
 * Mobile: Fully responsive stacked layout for small screens. ✅
 */
export default function CashFlowFilters({ filters, setFilters, onFetch, loading }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standard Presets from the requirements
  const presets = [
    { label: 'Today', value: 'daily' },
    { label: 'Last 7 Days', value: 'weekly' },
    { label: 'Last Month', value: 'monthly' },
    { label: '3 Months', value: '3months' },
    { label: '6 Months', value: '6months' },
    { label: '1 Year', value: 'yearly' }
  ];

  const handlePresetClick = (val) => {
    const dates = getPresetDates(val);
    setFilters({ startDate: dates.startDate, endDate: dates.endDate });
  };

  // --- Inline Style Constants ---
  const mainBoxStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '15px' : '20px 25px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', // Forced Sharp ✅
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
    textAlign: 'left' // Strictly Left Aligned ✅
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

  const presetBtnStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    padding: '6px 12px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '800',
    color: '#475569',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '0px',
    transition: 'all 0.2s ease'
  };

  const analyzeBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#0ea5e9', // Blue theme for Liquidity
    color: '#ffffff',
    padding: isMobile ? '12px' : '14px 30px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: isMobile ? '100%' : 'auto',
    boxShadow: '0 4px 10px rgba(14, 165, 233, 0.15)'
  };

  return (
    <div style={mainBoxStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* 1. QUICK PRESETS (Left Aligned Labels) ✅ */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}><FiZap style={{color: '#f59e0b'}} /> Quick Period Presets</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {presets.map((p) => (
              <button 
                key={p.value} 
                onClick={() => handlePresetClick(p.value)} 
                style={presetBtnStyle}
                onMouseOver={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.color = '#0ea5e9'; }}
                onMouseOut={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.color = '#475569'; }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. MANUAL DATE OVERRIDES & ACTION ROW */}
        <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            alignItems: 'flex-end', 
            gap: '20px',
            borderTop: '1px solid #f8fafc',
            paddingTop: '20px'
        }}>
          
          {/* Start Date */}
          <div style={{ flex: 1, width: '100%', textAlign: 'left' }}>
            <label style={labelStyle}><FiCalendar /> Override Start</label>
            <input 
              type="date" 
              value={filters.startDate} 
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              style={inputStyle}
            />
          </div>

          {/* End Date */}
          <div style={{ flex: 1, width: '100%', textAlign: 'left' }}>
            <label style={labelStyle}><FiCalendar /> Override End</label>
            <input 
              type="date" 
              value={filters.endDate} 
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              style={inputStyle}
            />
          </div>

          {/* Generate Analysis Button */}
          <button 
            onClick={onFetch} 
            disabled={loading}
            style={analyzeBtnStyle}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#0284c7')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0ea5e9')}
          >
            <FiFilter size={16} />
            {loading ? "Reconciling..." : "Generate Analysis"}
          </button>

        </div>
      </div>
    </div>
  );
}