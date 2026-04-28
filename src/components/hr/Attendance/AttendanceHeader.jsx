"use client";

import { useState, useEffect } from 'react';
import BackButton from '@/components/layout/BackButton/BackButton';
// Professional Icons for Attendance ✅
import { FiCheckSquare, FiFileText, FiShield } from 'react-icons/fi';

/**
 * Enterprise AttendanceHeader - EXECUTIVE MASTER EDITION
 * Purpose: Unified header with title, context identity and workflow tabs.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout with tactile navigation tabs. ✅
 */
export default function AttendanceHeader({ selectedSbuId, activeTab, setActiveTab }) {
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
    gap: isMobile ? '20px' : '30px',
    marginBottom: '35px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const titleRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '20px',
    gap: '15px',
    width: '100%'
  };

  const titleStyle = {
    fontSize: isMobile ? '18px' : '28px', 
    fontWeight: '950',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
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
    gap: '6px',
    textAlign: 'left'
  };

  const tabContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    backgroundColor: '#ffffff',
    padding: '6px',
    border: '1px solid #e2e8f0',
    borderRadius: '0px', // Forced Sharp ✅
    width: isMobile ? '100%' : 'fit-content',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
  };

  const getTabButtonStyle = (tabValue) => ({
    flex: isMobile ? 1 : 'none',
    padding: isMobile ? '10px 12px' : '12px 30px',
    backgroundColor: activeTab === tabValue ? '#0f172a' : '#ffffff',
    color: activeTab === tabValue ? '#ffffff' : '#64748b',
    border: activeTab === tabValue ? '1px solid #0f172a' : '1px solid transparent',
    borderRadius: '0px', // Sharp ✅
    fontSize: isMobile ? '9px' : '10.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    lineHeight: '1'
  });

  return (
    <div style={containerStyle}>
      
      {/* 1. TOP SECTION: NAVIGATION & IDENTITY ✅ */}
      <div style={titleRowStyle}>
        <BackButton />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <h2 style={titleStyle}>Personnel Attendance</h2>
          
          <div style={subLabelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiShield style={{ color: '#2563eb', fontSize: '14px' }} />
                <span>Unit Authority: <span style={{ color: '#2563eb', fontWeight: '950' }}>ID {selectedSbuId}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. WORKFLOW NAVIGATION TABS ✅ */}
      <div style={tabContainerStyle}>
        <button 
            onClick={() => setActiveTab('mark')}
            style={getTabButtonStyle('mark')}
        >
            <FiCheckSquare size={isMobile ? 14 : 16} />
            {isMobile ? "Entry" : "1. Mark Daily Presence"}
        </button>
        <button 
            onClick={() => setActiveTab('history')}
            style={getTabButtonStyle('history')}
        >
            <FiFileText size={isMobile ? 14 : 16} />
            {isMobile ? "Audit" : "2. Historical Audit Logs"}
        </button>
      </div>

    </div>
  );
}