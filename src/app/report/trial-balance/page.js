

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { exportToExcel } from '@/utils/exportToExcel';

// MODULAR COMPONENTS IMPORT ✅
import TBHeader from '@/components/reports/TrialBalance/TBHeader';
import TrialBalance from '@/components/reports/TrialBalance/TrialBalance';
import TBFooter from '@/components/reports/TrialBalance/TBFooter';

/**
 * Trial Balance Reporting Page - EXECUTIVE MASTER HUB
 * Fix: Added safety guard for SBU ID to prevent validation failures. ✅
 * Fix: Improved error transparency in console for easier debugging. ✅
 * Style: 100% Sharp (0px Radius) & VVIP UI Standards. ✅
 */
export default function TrialBalancePage() {
  const { selectedSbuId } = useSbu(); 
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Function: fetchReport ✅
   * Logic: Defensively fetches ledger data only if a valid Unit ID is provided.
   */
  const fetchReport = useCallback(async () => {
    // Safety Check: ID missing ya undefined ho toh request na bhejo
    if (!selectedSbuId || selectedSbuId === "undefined") {
        setLoading(false);
        return;
    }

    setLoading(true);
    try {
      // Hitting the secure analytics engine
      const res = await api.get(`/analytics/trial-balance?sbu_id=${selectedSbuId}`);
      
      if (res.data) {
        setReportData(res.data);
      }
    } catch (err) {
      // Precise error logging for audit purposes ✅
      console.error("TRIAL_BALANCE_SYNC_ERROR DETAILS:", {
          status: err.response?.status,
          message: err.response?.data?.error || err.message
      });
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

  // Initial load and mounting detection
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Effect Hook: Triggers fetch when component is ready and SBU context is synced. ✅
   */
  useEffect(() => {
    if (isMounted) {
        fetchReport();
    }
  }, [isMounted, fetchReport]);

  /**
   * Function: handleDownloadExcel
   * Purpose: Exports the trial balance audit ledger to professional XLSX.
   */
  const handleDownloadExcel = () => {
    if (!reportData) return;

    const excelRows = [
      { 'Audit Info': 'TRIAL BALANCE REPORT', 'Description': `Unit ID: ${selectedSbuId}`, 'Type': 'As of Date:', 'Debit (USD)': reportData.meta.asOfDate, 'Credit (USD)': '' },
      { 'Audit Info': '', 'Description': '', 'Type': '', 'Debit (USD)': '', 'Credit (USD)': '' }, 

      { 'Audit Info': 'ACCOUNT CODE', 'Description': 'LEDGER DESCRIPTION', 'Type': 'CATEGORY', 'Debit (USD)': 'DEBIT', 'Credit (USD)': 'CREDIT' },
      
      ...reportData.accounts.map(a => ({
        'Audit Info': a.account_code,
        'Description': a.account_name,
        'Type': a.account_type,
        'Debit (USD)': a.total_debit,
        'Credit (USD)': a.total_credit
      })),

      { 'Audit Info': '', 'Description': '', 'Type': '', 'Debit (USD)': '', 'Credit (USD)': '' }, 

      { 
        'Audit Info': 'GRAND TOTAL', 
        'Description': '', 
        'Type': '', 
        'Debit (USD)': reportData.totals.grand_total_debit, 
        'Credit (USD)': reportData.totals.grand_total_credit 
      },
      { 
        'Audit Info': 'INTEGRITY STATUS', 
        'Description': reportData.totals.is_balanced ? 'VERIFIED BALANCED' : 'IMBALANCE DETECTED', 
        'Type': '', 
        'Debit (USD)': '', 
        'Credit (USD)': '' 
      }
    ];

    exportToExcel(excelRows, `Trial_Balance_Audit_Unit_${selectedSbuId}`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; box-sizing: border-box !important; }
        .tb-report-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .tb-report-container { padding: 40px; }
        }
      `}} />

      <div className="tb-report-container">
        
        {/* 1. MODULAR HEADER (Title, Actions & Status Bar Included) */}
        <TBHeader 
            selectedSbuId={selectedSbuId} 
            onExport={handleDownloadExcel}
            onPrint={() => window.print()}
            onRefresh={fetchReport}
            loading={loading}
            hasData={!!reportData}
        />

        {/* 2. DYNAMIC TRIAL BALANCE DATA VIEW */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Accessing Organization Ledger Registry...
                    </p>
                </div>
            ) : (
                <TrialBalance reportData={reportData} />
            )}
        </section>

        {/* 3. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <TBFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}
