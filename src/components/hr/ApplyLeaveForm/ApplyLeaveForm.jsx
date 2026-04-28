"use client";

import { useState, useEffect } from 'react';
import api from '@/utils/axiosConfig';
// Professional Icons for HR ✅
import { FiUser, FiCalendar, FiPlus, FiEdit3, FiLayers } from 'react-icons/fi';

/**
 * ApplyLeaveForm Component - EXECUTIVE SHARP EDITION (FIXED RESPONSIVE)
 * Purpose: Professional interface for recording employee leave requests.
 * Fix: Forced vertical stacking for Date inputs on mobile to prevent overflow. ✅
 * Fix: Applied absolute width constraints and box-sizing to prevent horizontal scroll. ✅
 * Fix: 100% Inline CSS & 0px Border Radius. ✅
 */
export default function ApplyLeaveForm({ sbuId, onLeaveApplied }) {
  const [isMobile, setIsMobile] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Logic: 100% Preserved ✅
  const [formData, setFormData] = useState({
    employee_id: '',
    leave_type: 'Casual',
    start_date: '',
    end_date: '',
    reason: ''
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); // Adjusted breakpoint for better stacking
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const fetchEmployees = async () => {
      try {
        const res = await api.get(`/hr/employees?sbu_id=${sbuId}`);
        setEmployees(res.data);
      } catch (err) {
        console.error("EMP_FETCH_ERROR:", err);
      }
    };
    fetchEmployees();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [sbuId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        sbu_id: parseInt(sbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1
      };
      await api.post('/hr-attendance/leaves/apply', payload);
      alert("Success: Leave application recorded and synchronized.");
      setFormData({ employee_id: '', leave_type: 'Casual', start_date: '', end_date: '', reason: '' });
      if (onLeaveApplied) onLeaveApplied();
    } catch (err) {
      alert("Error: Unauthorized action or network failure.");
    } finally {
      setLoading(false);
    }
  };

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '30px 35px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden' // Overflow check
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
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
    letterSpacing: '0.12em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'left'
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#cbd5e1' : '#0f172a',
    color: '#ffffff',
    padding: isMobile ? '12px 15px' : '14px 30px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(15, 23, 42, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    lineHeight: '1',
    marginTop: isMobile ? '15px' : '0',
    width: isMobile ? '100%' : 'auto',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. SECTION HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
          <FiEdit3 style={{ color: '#4f46e5', fontSize: '18px' }} />
          <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Leave Entry Authorization
          </h3>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {/* 2. RESPONSIVE GRID (Laptop: 3 Col / Mobile: 1 Col) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '15px' : '20px',
          marginBottom: '20px',
          width: '100%'
        }}>
          {/* Employee Selection */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiUser size={12} /> Target Staff Member</label>
            <select 
              value={formData.employee_id} 
              onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
              style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}
              required
            >
              <option value="">-- Choose Personnel --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.full_name}</option>
              ))}
            </select>
          </div>

          {/* Leave Type */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiLayers size={12} /> Leave Classification</label>
            <select 
              value={formData.leave_type} 
              onChange={(e) => setFormData({...formData, leave_type: e.target.value})}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="Casual">Casual Absence</option>
              <option value="Sick">Medical / Sick</option>
              <option value="Annual">Annual Vacation</option>
              <option value="Unpaid">Unpaid / Other</option>
            </select>
          </div>

          {/* Dates Section - Stacks on Mobile ✅ */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: '15px', 
            width: '100%' 
          }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label style={labelStyle}><FiCalendar size={12} /> Start Date</label>
              <input type="date" value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})} style={inputStyle} required />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label style={labelStyle}><FiCalendar size={12} /> End Date</label>
              <input type="date" value={formData.end_date} onChange={(e) => setFormData({...formData, end_date: e.target.value})} style={inputStyle} required />
            </div>
          </div>
        </div>

        {/* 3. MEMO & SUBMIT ROW ✅ */}
        <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            alignItems: isMobile ? 'stretch' : 'flex-end', 
            gap: isMobile ? '10px' : '20px',
            width: '100%'
        }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <label style={labelStyle}>Audit Memo / Reason</label>
            <input 
              type="text" 
              placeholder="e.g. Formal medical leave" 
              value={formData.reason} 
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              style={{ ...inputStyle, backgroundColor: '#ffffff' }}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={submitBtnStyle}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#4f46e5')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
          >
            <FiPlus size={16} />
            <span>{loading ? "Authorizing..." : "Initialize Request"}</span>
          </button>
        </div>
      </form>

      {/* 4. FOOTER TIP */}
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', fontStyle: 'italic', margin: 0 }}>
             * New applications default to PENDING status for director review *
          </p>
      </div>

    </div>
  );
}