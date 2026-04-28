"use client";

import { useState, useEffect } from 'react';
// Professional Info Icon ✅
import { FiInfo } from 'react-icons/fi';

/**
 * Enterprise QuotesNotice - EXECUTIVE SHARP EDITION
 * Fix: Reduced vertical padding (Slim design). ✅
 * Fix: Forced 0px Border Radius on all sides. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Layout: 100% Left-aligned for professional consistency. ✅
 */
export default function QuotesNotice({ selectedSbuId }) {
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
    // Vertical padding reduced to keep it slim and compact ✅
    padding: isMobile ? '15px' : '20px 30px',
    border: '1px solid #f1f5f9',
    borderLeft: '8px solid #4f46e5', // Indigo Sales Accent
    borderRadius: '0px', // Forced Sharp Edges ✅
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? '12px' : '20px',
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  const iconBoxStyle = {
    backgroundColor: '#eef2ff',
    color: '#4f46e5',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0px',
    border: '1px solid #e0e7ff'
  };

  const textStyle = {
    fontSize: isMobile ? '9.5px' : '11px',
    color: '#475569',
    fontWeight: '600',
    lineHeight: '1.6',
    fontStyle: 'italic',
    margin: 0
  };

  const highlightStyle = {
    color: '#4f46e5',
    fontWeight: '900',
    textDecoration: 'underline',
    textUnderlineOffset: '2px'
  };

  return (
    <div style={containerStyle}>
        
        {/* 1. INFORMATION ICON (Left Aligned) */}
        <div style={iconBoxStyle}>
            <FiInfo size={isMobile ? 18 : 22} />
        </div>

        {/* 2. AUDIT NOTICE CONTENT (Strictly Left Aligned) ✅ */}
        <p style={textStyle}>
            Unit Isolation Notice: Quotations are legally binding pro-forma documents specific to 
            <span style={highlightStyle}> Unit {selectedSbuId} </span> operations. 
            All conversion events are securely logged for financial reconciliation and internal audit compliance.
        </p>

    </div>
  );
}