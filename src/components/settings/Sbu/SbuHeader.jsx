"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for Configuration ✅
import { FiActivity, FiRefreshCw, FiGlobe } from 'react-icons/fi';

/**
 * Enterprise SbuHeader - EXECUTIVE ELITE EDITION (FIXED MOBILE)
 * Purpose: Unified header for Strategic Business Unit (SBU) configuration.
 * Fix: Refresh button reduced in size and forced to Right-align on Mobile. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function SbuHeader({ onRefresh, loading }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    marginBottom: '35px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '20px',
    gap: isMobile ? '15px' : '0px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const titleStyle = {
    fontSize: isMobile ? '19px' : '28px', 
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: '1.2',
    margin: 0
  };

  const subLabelStyle = {
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '850',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '6px',
    textAlign: 'left'
  };

  const syncBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    border: 'none',
    borderBottom: '3px solid #e2e8f0',
    // Mobile horizontal padding reduced from 14px to 10px for smaller size ✅
    padding: isMobile ? '6px 10px' : '10px 22px', 
    borderRadius: '0px', 
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap',
    opacity: loading ? 0.6 : 1
  };

  return (
    <header style={containerStyle}>
      
      {/* 1. LEFT SIDE: NAVIGATION & IDENTITY ✅ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px', textAlign: 'left' }}>
          <h2 style={titleStyle}>Unit Configuration</h2>
          
          <div style={subLabelStyle}>
            {/* Global Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FiGlobe style={{ color: '#2563eb', fontSize: '13px' }} />
                <span>Context: <span style={{ color: '#2563eb', fontWeight: '950' }}>Mother Co.</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            {/* Sync Status ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: '13px' }} />
                <span style={{ color: '#10b981' }}>Network Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: SYNC ACTION (Forced Right-align on Mobile) ✅ */}
      <div style={{ 
          width: isMobile ? '100%' : 'auto', 
          display: 'flex', 
          justifyContent: isMobile ? 'flex-end' : 'center',
          marginTop: isMobile ? '5px' : '0px'
      }}>
        <button
            onClick={onRefresh}
            disabled={loading}
            style={syncBtnStyle}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.borderBottomColor = '#2563eb'; }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.borderBottomColor = '#e2e8f0'; }}
        >
            <FiRefreshCw 
                style={{ width: '13px', height: '13px' }} 
                className={loading ? "animate-spin" : ""}
            />
            {loading ? "Syncing..." : isMobile ? "Refresh" : "Refresh Subsidiaries"}
        </button>
      </div>

      {/* VVIP ANIMATION INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />

    </header>
  );
}