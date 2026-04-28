"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiUserCheck, FiCalendar, FiSave, FiUser } from 'react-icons/fi';

/**
 * Enterprise AttendanceForm - EXECUTIVE SHARP EDITION (FIXED)
 * Purpose: Manual entry for daily personnel presence.
 * Fix: Removed undefined function 'getTabButtonStyle' to resolve ReferenceError. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Fully responsive stacked layout (Name on top, Buttons below). ✅
 */
export default function AttendanceForm({ employees, onSave }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // Logic: 100% Preserved ✅
  const [attendanceData, setAttendanceData] = useState(
    employees.map(emp => ({ employee_id: emp.id, name: emp.full_name, status: 'Present' }))
  );
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStatusChange = (empId, newStatus) => {
    setAttendanceData(prev => 
      prev.map(item => item.employee_id === empId ? { ...item, status: newStatus } : item)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(date, attendanceData);
  };

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '30px 35px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    width: '100%',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #f8fafc',
    paddingBottom: '15px',
    gap: '15px'
  };

  const dateInputStyle = {
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '12px',
    fontWeight: '800',
    color: '#2563eb',
    outline: 'none',
    borderRadius: '0px',
    cursor: 'pointer'
  };

  const rowStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    padding: isMobile ? '15px' : '12px 20px',
    backgroundColor: '#fcfcfd',
    border: '1px solid #f1f5f9',
    marginBottom: '8px',
    gap: isMobile ? '12px' : '0px'
  };

  const nameStyle = {
    fontSize: isMobile ? '12px' : '13.5px',
    fontWeight: '800',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.01em',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'left'
  };

  const getBtnStyle = (statusType, currentStatus) => {
    const isActive = currentStatus === statusType;
    let activeColor = '#10b981'; // Present
    if (statusType === 'Absent') activeColor = '#ef4444';
    if (statusType === 'Leave') activeColor = '#f59e0b';

    return {
      flex: isMobile ? 1 : 'none',
      padding: isMobile ? '8px 10px' : '8px 20px',
      backgroundColor: isActive ? activeColor : '#ffffff',
      color: isActive ? '#ffffff' : '#94a3b8',
      border: `1px solid ${isActive ? activeColor : '#e2e8f0'}`,
      borderRadius: '0px',
      fontSize: '9px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: isMobile ? '0' : '90px',
      lineHeight: '1'
    };
  };

  const submitBtnStyle = {
    width: '100%',
    backgroundColor: '#0f172a', // Executive Dark
    color: '#ffffff',
    padding: isMobile ? '12px' : '16px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '25px',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)',
    lineHeight: '1'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. HEADER: TITLE & DATE SELECTOR */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiUserCheck style={{ color: '#2563eb', fontSize: '18px' }} />
          <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
            Daily Presence Authorization
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiCalendar style={{ color: '#94a3b8', fontSize: '14px' }} />
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                style={dateInputStyle}
            />
        </div>
      </div>

      {/* 2. STAFF LISTING */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {attendanceData.map((emp) => (
            <div key={emp.employee_id} style={rowStyle}>
              
              {/* Personnel Identity */}
              <div style={nameStyle}>
                <div style={{ backgroundColor: '#eff6ff', padding: '6px', display: 'flex' }}>
                    <FiUser size={14} style={{ color: '#3b82f6' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                    <span style={{ display: 'block' }}>{emp.name}</span>
                    <span style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800' }}>ID: #{emp.employee_id}</span>
                </div>
              </div>
              
              {/* Status Action Group */}
              <div style={{ display: 'flex', gap: '6px', width: isMobile ? '100%' : 'auto' }}>
                {['Present', 'Absent', 'Leave'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleStatusChange(emp.employee_id, status)}
                    style={getBtnStyle(status, emp.status)}
                  >
                    {status}
                  </button>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* 3. SUBMIT ACTION BUTTON */}
        <button 
          type="submit" 
          style={submitBtnStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#0f172a')}
        >
          <FiSave size={16} />
          <span>Authorize Presence Sheet</span>
        </button>
      </form>

      {/* 4. FOOTER DISCLAIMER */}
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', fontStyle: 'italic', margin: 0 }}>
             * Authorized Personnel Presence Synchronization Active *
          </p>
      </div>

    </div>
  );
}