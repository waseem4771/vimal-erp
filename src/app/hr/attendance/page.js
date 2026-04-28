

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import AttendanceHeader from '@/components/hr/Attendance/AttendanceHeader';
import AttendanceForm from '@/components/hr/AttendanceForm/AttendanceForm';
import AttendanceHistory from '@/components/hr/Attendance/AttendanceHistory';
import AttendanceFooter from '@/components/hr/Attendance/AttendanceFooter';

/**
 * Attendance Management & Reporting Page - EXECUTIVE MASTER HUB
 * Purpose: Professional interface for managers to record and audit staff presence.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function AttendancePage() {
  const { selectedSbuId } = useSbu(); 
  
  const [employees, setEmployees] = useState([]);
  const [history, setHistory] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // Navigation State: 'mark' for entry, 'history' for auditing ✅
  const [activeTab, setActiveTab] = useState('mark');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);

  /**
   * Function: fetchEmployees
   * Purpose: Retrieves active personnel for enrollment.
   */
  const fetchEmployees = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const res = await api.get(`/hr/employees?sbu_id=${selectedSbuId}`);
      setEmployees(res.data);
    } catch (err) {
      console.error("STAFF_FETCH_ERROR: Connection failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

  /**
   * Function: fetchAttendanceReport
   * Purpose: Retrieves historical presence logs for auditing.
   */
  const fetchAttendanceReport = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const res = await api.get(`/hr-attendance/report?sbu_id=${selectedSbuId}&date=${reportDate}`);
      setHistory(res.data);
    } catch (err) {
      console.error("REPORT_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId, reportDate]);

  // Synchronize data based on the active UI tab
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        if (activeTab === 'mark') fetchEmployees();
        else fetchAttendanceReport();
    }
  }, [activeTab, fetchEmployees, fetchAttendanceReport]);

  /**
   * Function: handleSaveAttendance
   * Purpose: Submits the bulk attendance sheet and triggers UI state change.
   */
  const handleSaveAttendance = async (date, attendance_records) => {
    try {
      const payload = {
        sbu_id: parseInt(selectedSbuId),
        date: date,
        attendance_records: attendance_records,
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/hr-attendance/mark', payload);
      alert(`Success: Attendance for Unit ${selectedSbuId} has been recorded.`);
      
      setActiveTab('history'); // Switch to audit view after save ✅
    } catch (err) {
      alert("Error: Unauthorized action. Verify HR permissions.");
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .attendance-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .attendance-container { padding: 40px; }
        }
      `}} />

      <div className="attendance-container">
        
        {/* 1. MODULAR HEADER (Navigation Tabs Included) */}
        <AttendanceHeader 
            selectedSbuId={selectedSbuId} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
        />

        {/* 2. DYNAMIC WORKSPACE AREA */}
        <section style={{ marginBottom: '40px' }}>
            {activeTab === 'mark' ? (
                /* ENTRY WORKSPACE */
                <div className="animate-in fade-in slide-in-from-bottom duration-500">
                    {loading ? (
                        <div style={{ padding: '100px 0', textAlign: 'center' }}>
                            <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                            <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                                Syncing Workforce Metadata...
                            </p>
                        </div>
                    ) : employees.length > 0 ? (
                        <AttendanceForm employees={employees} onSave={handleSaveAttendance} />
                    ) : (
                        <div style={{ backgroundColor: '#ffffff', padding: '100px 20px', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#94a3b8', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em' }}>
                            * No active staff detected in Unit {selectedSbuId}. Please use the Staff Directory to enroll members. *
                        </div>
                    )}
                </div>
            ) : (
                /* AUDIT WORKSPACE */
                <AttendanceHistory 
                    reportDate={reportDate}
                    setReportDate={setReportDate}
                    fetchAttendanceReport={fetchAttendanceReport}
                    history={history}
                    selectedSbuId={selectedSbuId}
                />
            )}
        </section>

        {/* 3. SYSTEM FOOTER: Strictly Left-aligned ✅ */}
        <AttendanceFooter selectedSbuId={selectedSbuId} />

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </main>
  );
}