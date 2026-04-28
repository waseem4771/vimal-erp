"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for Sales ✅
import { FiShoppingCart, FiShield } from 'react-icons/fi';

/**
 * Enterprise OrderHeader - EXECUTIVE ELITE EDITION
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Mobile: Fully responsive stacked layout with precision alignment. ✅
 */
export default function OrderHeader({ selectedSbuId }) {
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
    fontSize: isMobile ? '20px' : '30px',
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.03em',
    lineHeight: '1',
    margin: 0
  };

  const subLabelStyle = {
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '850',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '8px'
  };

  return (
    <div style={containerStyle}>
      
      {/* LEFT SIDE: NAVIGATION & PAGE TITLE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2px' }}>
          <h1 style={titleStyle}>Create Sales Invoice</h1>
          
          <div style={subLabelStyle}>
            {/* Real Sales Icon ✅ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiShoppingCart style={{ color: '#2563eb', fontSize: isMobile ? '12px' : '14px' }} />
                <span>Entry Type: <span style={{ color: '#2563eb', fontWeight: '950' }}>Authorized Revenue</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: UNIT CONTEXT (Mobile par Title ke niche aayega) */}
      <div style={{ 
          marginTop: isMobile ? '5px' : '0px',
          padding: '8px 15px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
      }}>
        <FiShield style={{ color: '#64748b', fontSize: '14px' }} />
        <span style={{ fontSize: '10px', fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Active Context: <span style={{ color: '#2563eb' }}>Unit ID {selectedSbuId}</span>
        </span>
      </div>

    </div>
  );
}