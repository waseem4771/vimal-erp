


"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import PayrollHeader from '@/components/hr/Payroll/PayrollHeader';
import PayrollControlBar from '@/components/hr/Payroll/PayrollControlBar';
import PayrollDeptReport from '@/components/hr/PayrollDeptReport/PayrollDeptReport';
import PayrollLedgerTable from '@/components/hr/Payroll/PayrollLedgerTable';
import PayrollFooter from '@/components/hr/Payroll/PayrollFooter';

/**
 * Payroll Management & Analytics Page - EXECUTIVE MASTER HUB
 * Purpose: Orchestrates automated payroll generation and departmental cost reporting.
 * Fix: Added "Pay Salary" disbursement logic with Ledger Sync. ✅
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function PayrollPage() {
  const { selectedSbuId } = useSbu(); 

  const [month, setMonth] = useState(new Date().getMonth() + 1); 
  const [year, setYear] = useState(new Date().getFullYear());   
  const [payrollData, setPayrollData] = useState([]); 
  const [deptReportData, setDeptReportData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Function: syncAllData ✅
   * Purpose: Fetches unit-specific payroll history and departmental distributions.
   */
  const syncAllData = useCallback(async () => {
    if (!selectedSbuId) return;
    setFetching(true);
    try {
      const [historyRes, deptRes] = await Promise.all([
        api.get(`/hr/payroll/history?sbu_id=${selectedSbuId}&month=${month}&year=${year}`),
        api.get(`/hr/payroll/cost-by-department?sbu_id=${selectedSbuId}&month=${month}&year=${year}`)
      ]);
      
      setPayrollData(historyRes.data);
      setDeptReportData(deptRes.data);
    } catch (err) {
      console.warn("ERP_SYNC_NOTICE: Awaiting ledger records.");
      setPayrollData([]);
      setDeptReportData([]);
    } finally {
      setFetching(false);
    }
  }, [selectedSbuId, month, year]);

  /**
   * Function: handleGenerate ✅
   * Purpose: Authorizes and triggers the payroll calculation engine.
   */
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/hr/payroll/generate', { 
        sbu_id: parseInt(selectedSbuId), 
        month: parseInt(month), 
        year: parseInt(year),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      });
      
      alert(`Success: ${res.data.message}`);
      syncAllData(); 
    } catch (err) {
      const serverMessage = err.response?.data?.error || "Transaction Denied: Check unit connectivity.";
      alert(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function: handlePaySalary (NEW ✅)
   * Purpose: Authorizes individual salary disbursement and posts to General Ledger.
   */
  const handlePaySalary = async (payrollId) => {
    if (!window.confirm("Accounting Alert: Authorize salary payment and post to General Ledger?")) return;

    try {
      await api.post('/hr/payroll/pay', {
        payroll_id: payrollId,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1,
        payment_account_id: 1 // Default to Cash on Hand
      });
      
      alert("Success: Disbursement verified and Ledger synchronized.");
      syncAllData(); // Refresh table to show 'Paid' status
    } catch (err) {
      const serverMsg = err.response?.data?.error || "Authorization Error: Payment failed.";
      alert(serverMsg);
    }
  };

  // Sync detection and data load
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    if (typeof window !== 'undefined') {
        syncAllData();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [syncAllData]);

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .payroll-container {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 1024px) {
            .payroll-container { padding: 40px; }
        }
      `}} />

      <div className="payroll-container">
        
        {/* 1. MODULAR HEADER (Title & Context) */}
        <PayrollHeader selectedSbuId={selectedSbuId} />

        {/* 2. CONTROL PANEL (Month/Year & Execution) */}
        <PayrollControlBar 
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            handleGenerate={handleGenerate}
            syncAllData={syncAllData}
            loading={loading}
            fetching={fetching}
        />

        {/* 3. MAIN ANALYTICS WORKSPACE */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2.2fr', 
            gap: isMobile ? '30px' : '40px',
            alignItems: 'start',
            marginBottom: '40px'
        }}>
            
            {/* LEFT COLUMN: Departmental Distribution */}
            <div style={{ width: '100%' }}>
                <PayrollDeptReport reportData={deptReportData} />
            </div>

            {/* RIGHT COLUMN: Personnel Ledger Table ✅ Now with Payment Action */}
            <div style={{ width: '100%' }}>
                <PayrollLedgerTable 
                    payrollData={payrollData}
                    month={month}
                    year={year}
                    selectedSbuId={selectedSbuId}
                    onPaySalary={handlePaySalary}
                />
            </div>

        </div>

        {/* 4. SYSTEM FOOTER: Strictly Left-aligned ✅ */}
        <PayrollFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}