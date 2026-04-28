
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BackButton from '@/components/layout/BackButton/BackButton';
import { FiPlusSquare, FiUserCheck, FiShield } from 'react-icons/fi';

/**
 * Enterprise ProcurementHeader - MOBILE OPTIMIZED EDITION
 * Laptop: Title at Top, Actions (Button & Role) in a Split Row Below. ✅
 * Mobile: Reduced horizontal padding for buttons to ensure layout integrity. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function ProcurementHeader({ selectedSbuId, testUser, setTestUser }) {
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
    flexDirection: 'column',
    gap: isMobile ? '15px' : '25px',
    marginBottom: '35px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '25px',
    width: '100%'
  };

  const topRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%'
  };

  const titleStyle = {
    fontSize: isMobile ? '20px' : '30px',
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    margin: 0,
    letterSpacing: '-0.03em',
    lineHeight: '1'
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
    gap: '6px'
  };

  const actionsRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    // Mobile par gap aur kam kar diya ✅
    gap: isMobile ? '8px' : '15px' 
  };

  const raiseBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    // Mobile par icon aur text ka gap kam kiya ✅
    gap: isMobile ? '4px' : '8px', 
    backgroundColor: '#2563eb',
    color: '#ffffff',
    // Mobile horizontal padding reduced from 12px to 6px ✅
    padding: isMobile ? '8px 6px' : '10px 20px', 
    borderRadius: '0px', 
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '900',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)',
    whiteSpace: 'nowrap'
  };

  const roleSwitcherStyle = {
    display: 'flex',
    alignItems: 'center',
    // Mobile par gap kam kiya ✅
    gap: isMobile ? '3px' : '8px', 
    backgroundColor: '#ffffff',
    border: '1px solid #fed7aa',
    // Mobile horizontal padding reduced from 10px to 5px ✅
    padding: isMobile ? '7px 5px' : '9px 18px', 
    borderRadius: '0px', 
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    height: 'fit-content'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. TOP ROW */}
      <div style={topRowStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <BackButton />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={titleStyle}>Procurement Hub</h1>
                <div style={subLabelStyle}>
                    <FiShield style={{ color: '#2563eb', fontSize: isMobile ? '12px' : '14px' }} />
                    <span>Auth Console: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
                </div>
            </div>
        </div>
      </div>

      {/* 2. BOTTOM ACTIONS ROW: Mobile par left/right side se buttons chote hain ✅ */}
      <div style={actionsRowStyle}>
        
        {/* Raise Requisition */}
        <Link 
          href="/inventory/procurement/create" 
          style={raiseBtnStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        >
          <FiPlusSquare size={isMobile ? 13 : 16} />
          Raise Requisition
        </Link>

        {/* Role Switcher */}
        <div style={roleSwitcherStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <FiUserCheck style={{ color: '#f97316', fontSize: isMobile ? '12px' : '15px' }} />
            <span style={{ fontSize: isMobile ? '8px' : '9.5px', fontWeight: '900', color: '#f97316', textTransform: 'uppercase' }}>Role:</span>
          </div>
          <select 
            value={testUser.role} 
            onChange={(e) => setTestUser({...testUser, role: e.target.value})}
            style={{ 
              fontSize: isMobile ? '10px' : '11px', 
              fontWeight: '900', 
              color: '#334155', 
              border: 'none', 
              outline: 'none', 
              backgroundColor: 'transparent', 
              cursor: 'pointer',
              padding: 0
            }}
          >
            <option value="Staff">Staff</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
          </select>
        </div>

      </div>

    </div>
  );
}