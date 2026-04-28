"use client";

import { useState, useEffect } from 'react';
import { FiShield } from 'react-icons/fi';

/**
 * Enterprise ProcurementPolicy - EXECUTIVE COMPACT EDITION (Fix Version)
 * Fix: Resolved style shorthand conflict error (margin vs marginBottom). ✅
 * Fix: Reduced vertical padding (Oopar aur neechay sai size kam). ✅
 * Fix: 100% Left-aligned content. ✅
 * Style: Forced 0px Border Radius. ✅
 */
export default function ProcurementPolicy({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    marginTop: '25px',
    padding: isMobile ? '12px 20px' : '18px 40px', 
    backgroundColor: '#0f172a', 
    border: '1px solid #1e293b',
    borderLeft: '6px solid #2563eb', 
    borderRadius: '0px', 
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? '12px' : '30px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    width: '100%',
    boxSizing: 'border-box'
  };

  const iconBoxStyle = {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    padding: isMobile ? '8px' : '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0px',
    border: '1px solid rgba(37, 99, 235, 0.2)'
  };

  const headerStyle = {
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '900',
    color: '#60a5fa', 
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    // FIX: Removed 'margin: 0' shorthand to avoid conflict ✅
    marginTop: '0px',
    marginRight: '0px',
    marginLeft: '0px',
    marginBottom: '4px',
    textAlign: 'left'
  };

  const descriptionStyle = {
    fontSize: isMobile ? '9px' : '10.5px',
    color: '#94a3b8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    lineHeight: '1.6',
    // FIX: Removed 'margin: 0' shorthand to avoid conflict ✅
    marginTop: '0px',
    marginRight: '0px',
    marginLeft: '0px',
    marginBottom: '0px',
    textAlign: 'left'
  };

  const highlightStyle = (color) => ({
    color: color,
    fontWeight: '950',
    borderBottom: `1px solid ${color}`,
    paddingBottom: '1px'
  });

  return (
    <div style={containerStyle}>
      
      {/* 1. SECURITY ICON */}
      <div style={iconBoxStyle}>
        <FiShield style={{ color: '#3b82f6', fontSize: isMobile ? '20px' : '28px' }} />
      </div>

      {/* 2. POLICY CONTENT (Strictly Left Aligned) ✅ */}
      <div style={{ textAlign: 'left' }}>
        <h4 style={headerStyle}>Authorization Protocol Active</h4>
        <p style={descriptionStyle}>
            Statutory Rule: Requisitions under <span style={highlightStyle('#ffffff')}>$1,000</span> require Managerial sign-off. 
            <br style={{ display: isMobile ? 'none' : 'block' }} />
            Expenditures exceeding <span style={highlightStyle('#10b981')}>$1,000</span> must be authorized by a Director for Unit {selectedSbuId}.
        </p>
      </div>

    </div>
  );
}