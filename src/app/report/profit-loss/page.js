

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { exportToExcel } from '@/utils/exportToExcel';

// MODULAR COMPONENTS IMPORT ✅
import PLHeader from '@/components/reports/PLStatement/PLHeader';
import PLFilters from '@/components/reports/PLStatement/PLFilters';
import PLStatement from '@/components/reports/PLStatement/PLStatement';
import PLFooter from '@/components/reports/PLStatement/PLFooter';

/**
 * Profit & Loss Reporting Page - EXECUTIVE MASTER HUB
 * Purpose: Orchestrates automated P&L generation with multi-currency sync.
 * Fix: Forced strict parameter passing for absolute date-time accuracy. ✅
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 */
export default function ProfitLossPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Unified Filter State for date persistence
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: ''
  });

  /**
   * Function: fetchReport ✅
   * Purpose: Retrieves P&L data via secure API with explicit parameter passing.
   */
  const fetchReport = useCallback(async () => {
    if (!selectedSbuId || selectedSbuId === "undefined") return;
    
    setLoading(true);
    try {
      // Building query string with explicit check for date-picker values
      let url = `/analytics/profit-loss?sbu_id=${selectedSbuId}`;
      
      if (filters.startDate) {
          url += `&startDate=${filters.startDate}`;
      }
      if (filters.endDate) {
          url += `&endDate=${filters.endDate}`;
      }

      // Hitting the fixed backend controller
      const res = await api.get(url);
      setReportData(res.data);
    } catch (err) {
      console.error("PL_SYNC_ERROR DETAILS:", err.response?.data || err.message);
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId, filters]);

  // Initial load and screen detection
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Trigger fetch when SBU identity changes or local filters are modified.
   * This ensures the ledger is always in sync with the selected context. ✅
   */
  useEffect(() => {
    if (isMounted) {
        fetchReport();
    }
  }, [isMounted, selectedSbuId, filters, fetchReport]);

  /**
   * Function: handleDownloadExcel
   * Purpose: Exports the multi-section P&L ledger to professional audit-ready XLSX.
   */
  const handleDownloadExcel = () => {
    if (!reportData) return;

    const excelRows = [
      // 1. Operating Income Section
      { 'Reporting Category': 'INCOME SOURCE', 'Account Name': 'LEDGER NAME', 'Account Code': 'ID', 'Amount (USD)': 'VALUE' },
      ...reportData.income.map(i => ({ 
        'Reporting Category': 'OPERATING INCOME', 'Account Name': i.name, 'Account Code': i.code, 'Amount (USD)': i.amount 
      })),
      
      { 'Reporting Category': '', 'Account Name': '', 'Account Code': '', 'Amount (USD)': '' }, // Spacer

      // 2. Operating Expenses Section
      { 'Reporting Category': 'EXPENSE SOURCE', 'Account Name': 'LEDGER NAME', 'Account Code': 'ID', 'Amount (USD)': 'VALUE' },
      ...reportData.expenses.map(e => ({ 
        'Reporting Category': 'OPERATING EXPENSE', 'Account Name': e.name, 'Account Code': e.code, 'Amount (USD)': e.amount 
      })),

      { 'Reporting Category': '', 'Account Name': '', 'Account Code': '', 'Amount (USD)': '' }, // Spacer

      // 3. Consolidated Totals
      { 'Reporting Category': 'TOTALS', 'Account Name': 'GROSS REVENUE', 'Account Code': '-', 'Amount (USD)': reportData.totals.total_income },
      { 'Reporting Category': 'TOTALS', 'Account Name': 'TOTAL EXPENDITURE', 'Account Code': '-', 'Amount (USD)': reportData.totals.total_expense },
      { 'Reporting Category': 'FINAL', 'Account Name': 'NET PERFORMANCE', 'Account Code': '-', 'Amount (USD)': reportData.totals.net_profit },
    ];

    exportToExcel(excelRows, `Profit_Loss_Audit_Unit_${selectedSbuId}`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring global sharp edges for the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; box-sizing: border-box !important; }
        .pl-report-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .pl-report-container { padding: 40px; }
        }
      `}} />

      <div className="pl-report-container">
        
        {/* 1. MODULAR HEADER (Title, Identity & Actions) */}
        <PLHeader 
            selectedSbuId={selectedSbuId} 
            onExport={handleDownloadExcel}
            onPrint={() => window.print()}
            loading={loading}
            hasData={!!reportData}
        />

        {/* 2. REPORT FILTERS (Presets & Custom Date Entry) */}
        <PLFilters 
            filters={filters}
            setFilters={setFilters}
            onFetch={fetchReport}
            loading={loading}
        />

        {/* 3. DYNAMIC P&L STATEMENT VIEW (Data Visualizer) */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #10b981', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Reconciling Unit Ledger Balances...
                    </p>
                </div>
            ) : (
                <PLStatement reportData={reportData} />
            )}
        </section>

        {/* 4. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <PLFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}