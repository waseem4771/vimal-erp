
"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import LeavesHeader from '@/components/hr/Leaves/LeavesHeader';
import ApplyLeaveForm from '@/components/hr/ApplyLeaveForm/ApplyLeaveForm';
import LeaveTable from '@/components/hr/LeaveTable/LeaveTable';
import LeavesFooter from '@/components/hr/Leaves/LeavesFooter';

/**
 * Leave Management Page - EXECUTIVE MASTER HUB
 * Purpose: Allows HR to manage leave applications via a professional modular UI.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function LeaveManagementPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Function: fetchLeaves
   * Purpose: Synchronizes leave applications via secure API.
   */
  const fetchLeaves = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const res = await api.get(`/hr-attendance/leaves/list?sbu_id=${selectedSbuId}`);
      setRequests(res.data);
    } catch (err) {
      console.error("LEAVE_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

  // Initial load and screen detection
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchLeaves();
    }
  }, [fetchLeaves]);

  /**
   * Function: handleUpdateStatus
   * Purpose: Authorizes or Rejects a leave request via secure API.
   */
  const handleUpdateStatus = async (leaveId, newStatus) => {
    try {
      const payload = {
        id: leaveId,
        status: newStatus,
        user_id: localStorage.getItem('vimal_user_id') || 1,
        sbu_id: selectedSbuId 
      };

      await api.patch('/hr-attendance/leaves/status', payload);
      alert(`Success: Employee leave request has been ${newStatus.toLowerCase()}.`);
      fetchLeaves(); 
    } catch (err) {
      alert("Error: Unauthorized action. Verify administrative rights.");
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .leaves-page-container {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .leaves-page-container { padding: 40px; }
        }
      `}} />

      <div className="leaves-page-container">
        
        {/* 1. MODULAR HEADER (Title & Refresh Action) */}
        <LeavesHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchLeaves} 
            loading={loading}
        />

        {/* 2. APPLY LEAVE WORKSPACE (Top Form) */}
        <section style={{ marginBottom: '35px' }}>
            <ApplyLeaveForm 
                sbuId={selectedSbuId} 
                onLeaveApplied={fetchLeaves} 
            />
        </section>

        {/* 3. DATA LEDGER VIEW (Applications Table) */}
        <section style={{ marginBottom: '40px' }}>
            <LeaveTable 
                key={selectedSbuId}
                requests={requests} 
                loading={loading} 
                onUpdateStatus={handleUpdateStatus} 
            />
        </section>

        {/* 4. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <LeavesFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}