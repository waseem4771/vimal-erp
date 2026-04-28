"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Workforce Management ✅
import { FiUserPlus, FiPlus, FiBriefcase, FiDollarSign, FiLayers, FiActivity, FiShield } from 'react-icons/fi';

/**
 * Enterprise EmployeesRegistry - EXECUTIVE SHARP EDITION
 * Purpose: Centralized interface for team enrollment and active personnel directory.
 * Fix: Form section optimized for 100% mobile responsiveness (Vertical Stacking). ✅
 * Fix: Initialize Enrollment button slimmed down for mobile and laptop. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 */
export default function EmployeesRegistry({ 
  formData, 
  handleChange, 
  handleSubmit, 
  loading, 
  employees, 
  departments, 
  selectedSbuId 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const sectionCardStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '30px 35px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '40px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '10px' : '13px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13.5px',
    fontWeight: '600',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'left'
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#10b981', 
    color: '#ffffff',
    // Vertical padding reduced to 10px-12px for slim look ✅
    padding: isMobile ? '10px 18px' : '12px 30px', 
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '9.5px' : '10.5px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(16, 185, 129, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    lineHeight: '1',
    width: isMobile ? '100%' : 'auto', // Mobile par full width
    marginTop: isMobile ? '10px' : '0'
  };

  const thStyle = (align = 'left') => ({
    padding: isMobile ? '12px 15px' : '18px 25px',
    fontSize: isMobile ? '8.5px' : '10px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    textAlign: align,
    borderBottom: '1.5px solid #0f172a',
    backgroundColor: '#fcfcfd',
    whiteSpace: 'nowrap'
  });

  const tdStyle = (align = 'left', isBold = false) => ({
    padding: isMobile ? '12px 15px' : '16px 25px',
    fontSize: isMobile ? '11.5px' : '13px',
    color: isBold ? '#0f172a' : '#475569',
    fontWeight: isBold ? '900' : '600',
    borderBottom: '1px solid #f8fafc',
    textAlign: align,
    verticalAlign: 'middle'
  });

  return (
    <div style={{ width: '100%' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .emp-registry-wrapper * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .emp-row:hover { background-color: #f0fdf4 !important; }
      `}} />

      <div className="emp-registry-wrapper">
        
        {/* 1. ENROLLMENT WORKSPACE (FORM) - Fully Responsive ✅ */}
        <div style={sectionCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
              <FiUserPlus style={{ color: '#10b981', fontSize: '18px' }} />
              <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                  Personnel Enrollment
              </h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* GRID LOCK: Stacks on Mobile, 3 Columns on Laptop ✅ */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              width: '100%'
            }}>
              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiShield size={11} /> Full Legal Name</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="First & Last Name" required style={inputStyle} />
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiBriefcase size={11} /> Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Senior Lead" required style={inputStyle} />
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiLayers size={11} /> Department</label>
                <select name="dept_id" value={formData.dept_id} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}>
                  <option value="">-- Assign Dept --</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.dept_name}</option>
                  ))}
                </select>
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiActivity size={11} /> Joining Date</label>
                <input type="date" name="joining_date" value={formData.joining_date} onChange={handleChange} required style={inputStyle} />
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiDollarSign size={11} /> Net Base Salary</label>
                <input type="number" name="base_salary" value={formData.base_salary} onChange={handleChange} placeholder="0.00" required style={{ ...inputStyle, color: '#10b981', fontWeight: '900' }} />
              </div>

              {/* Action Button Section ✅ */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: isMobile ? 'stretch' : 'flex-start' }}>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={submitBtnStyle}
                  onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#059669')}
                  onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#10b981')}
                >
                  <FiPlus size={15} />
                  <span>{loading ? "Authorizing..." : "Initialize Enrollment"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 2. ACTIVE EMPLOYEE LEDGER (TABLE) */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
          width: '100%'
        }}>
          <div style={{
            padding: isMobile ? '12px 15px' : '18px 25px',
            backgroundColor: '#0f172a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #1e293b'
          }}>
            <h3 style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Active Workforce Directory
            </h3>
            <span style={{ fontSize: '8px', backgroundColor: '#10b981', color: '#ffffff', padding: '2px 8px', fontWeight: '900', textTransform: 'uppercase' }}>
                Unit {selectedSbuId}
            </span>
          </div>

          <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '850px' : '100%' }}>
              <thead>
                <tr>
                  <th style={thStyle('left')}>Personnel Member</th>
                  <th style={thStyle('left')}>Role / Designation</th>
                  <th style={thStyle('center')}>Cost Center</th>
                  <th style={thStyle('center')}>Base Salary</th>
                  <th style={thStyle('right')}>Operational Status</th>
                </tr>
              </thead>
              <tbody>
                {employees && employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id} className="emp-row" style={{ transition: 'all 0.2s' }}>
                      <td style={tdStyle('left', true)}>
                        <div style={{ textTransform: 'uppercase' }}>{emp.full_name}</div>
                        <div style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'monospace', fontWeight: '700', marginTop: '2px' }}>ID: #{emp.id}</div>
                      </td>
                      <td style={tdStyle('left')}>
                        <div style={{ color: '#1e293b', fontWeight: '700' }}>{emp.designation}</div>
                      </td>
                      <td style={{ ...tdStyle('center') }}>
                        <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 10px', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', border: '1px solid #dbeafe' }}>
                          {emp.departments?.dept_name || 'Unassigned'}
                        </span>
                      </td>
                      <td style={{ ...tdStyle('center'), fontFamily: 'monospace', fontWeight: '900', color: '#0f172a', fontSize: '15px' }}>
                        ${parseFloat(emp.base_salary).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td style={tdStyle('right')}>
                        <span style={{
                          backgroundColor: emp.status === 'Active' ? '#ecfdf5' : '#fef2f2',
                          color: emp.status === 'Active' ? '#10b981' : '#ef4444',
                          padding: '3px 12px',
                          fontSize: '9px',
                          fontWeight: '950',
                          textTransform: 'uppercase',
                          border: `1px solid ${emp.status === 'Active' ? '#d1fae5' : '#fee2e2'}`,
                          display: 'inline-block',
                          lineHeight: '1'
                        }}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '100px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                      * No active personnel registered in unit {selectedSbuId} *
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}