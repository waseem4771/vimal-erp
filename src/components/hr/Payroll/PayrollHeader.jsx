"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for Payroll Analytics ✅
import { FiBriefcase, FiActivity, FiShield } from 'react-icons/fi';

/**
 * Enterprise PayrollHeader - EXECUTIVE ELITE EDITION
 * Purpose: Unified header for payroll orchestration and departmental cost analytics.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout with precision alignment. ✅
 */
export default function PayrollHeader({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
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
    width: '100%'
  };

  const titleStyle = {
    fontSize: isMobile ? '20px' : '28px', 
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: '1.2',
    margin: 0
  };

  const subLabelStyle = {
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '850',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '8px',
    textAlign: 'left'
  };

  return (
    <header style={containerStyle}>
      
      {/* LEFT SIDE: NAVIGATION & IDENTITY ✅ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px', textAlign: 'left' }}>
          <h2 style={titleStyle}>HR: Payroll Engine</h2>
          
          <div style={subLabelStyle}>
            {/* Payroll Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiBriefcase style={{ color: '#2563eb', fontSize: isMobile ? '12px' : '14px' }} />
                <span>Unit Identity: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
            </div>
            
            <span style={{ color: '#e2e8f0' }}>|</span>

            {/* Performance/Sync Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiActivity className="animate-pulse" style={{ color: '#10b981', fontSize: isMobile ? '12px' : '14px' }} />
                <span style={{ color: '#10b981' }}>Authorized Cost Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: STATUS INDICATOR (Optional visual anchor) */}
      {!isMobile && (
        <div style={{ 
            padding: '8px 15px', 
            backgroundColor: '#f8fafc', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <FiShield style={{ color: '#64748b', fontSize: '14px' }} />
            <span style={{ fontSize: '9px', fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Fiscal Integrity Active
            </span>
        </div>
      )}

      {/* VVIP ANIMATION INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}} />

    </header>
  );
}