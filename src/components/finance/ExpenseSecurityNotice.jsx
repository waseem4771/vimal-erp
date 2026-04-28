"use client";

import { useState, useEffect } from 'react';
// Professional Security Icon ✅
import { FiLock } from 'react-icons/fi';

/**
 * Enterprise ExpenseSecurityNotice - EXECUTIVE SLIM EDITION
 * Fix: Reduced vertical padding for ultra-compact height (Laptop & Mobile). ✅
 * Fix: Tightened internal gaps to minimize vertical footprint. ✅
 * Style: 100% Sharp (0px Radius) & High-priority Inline Styles. ✅
 */
export default function ExpenseSecurityNotice({ selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    marginTop: '20px',
    backgroundColor: '#0f172a', // Corporate Deep Slate
    // Vertical padding significantly reduced: 8px Mobile / 10px Laptop ✅
    padding: isMobile ? '8px 15px' : '10px 25px',
    border: '1px solid #1e293b',
    borderLeft: '5px solid #3b82f6', // Security Blue Accent
    borderRadius: '0px', // Forced Sharp Edges ✅
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px', // Internal gap reduced ✅
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '4px' // Header padding reduced ✅
  };

  const titleStyle = {
    fontSize: isMobile ? '9px' : '10px',
    fontWeight: '900',
    color: '#60a5fa', // Bright Blue
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    margin: 0
  };

  const messageStyle = {
    fontSize: isMobile ? '10px' : '11px',
    color: '#94a3b8',
    fontWeight: '600',
    lineHeight: '1.4', // Line height tightened ✅
    fontStyle: 'italic',
    margin: 0
  };

  return (
    <div style={containerStyle}>
        
        {/* 1. SECURITY HEADER (Compact) */}
        <div style={headerStyle}>
            <FiLock style={{ color: '#60a5fa', fontSize: '13px' }} />
            <h4 style={titleStyle}>
                Security Protocol Active
            </h4>
        </div>

        {/* 2. NOTICE CONTENT (Slim Layout) */}
        <p style={messageStyle}>
            Administrative Notice: All outgoing financial requests are guarded by 
            <span style={{ color: '#ffffff', fontWeight: '800', notItalic: true }}> RBAC Middleware</span>. 
            Unauthorized access attempts linked to 
            <span style={{ color: '#3b82f6', fontWeight: '900', textDecoration: 'underline' }}> Unit {selectedSbuId} </span> 
            are automatically flagged in the audit trail.
        </p>

    </div>
  );
}