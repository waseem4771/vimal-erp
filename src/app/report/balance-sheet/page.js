
"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { exportToExcel } from '@/utils/exportToExcel';

// MODULAR COMPONENTS IMPORT ✅
import BSHeader from '@/components/reports/BalanceSheet/BSHeader';
import BSFilters from '@/components/reports/BalanceSheet/BSFilters';
import BalanceSheet from '@/components/reports/BalanceSheet/BalanceSheet';
import BSFooter from '@/components/reports/BalanceSheet/BSFooter';

/**
 * Balance Sheet Reporting Page - EXECUTIVE MASTER HUB
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular financial parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 * Logic: 100% Intact (Multi-category Excel Export & API Sync). ✅
 */
export default function BalanceSheetPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Unified Filter State (Default to current date)
  const [filters, setFilters] = useState({
    asOfDate: new Date().toISOString().split('T')[0]
  });

  /**
   * Function: fetchReport
   * Purpose: Retrieves Balance Sheet data via secure API.
   */
  const fetchReport = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const endpoint = `/analytics/balance-sheet?sbu_id=${selectedSbuId}&date=${filters.asOfDate}`;
      const res = await api.get(endpoint);
      setReportData(res.data);
    } catch (err) {
      console.error("BALANCE_SHEET_SYNC_ERROR: Data fetch failed.");
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

    if (typeof window !== 'undefined') {
        fetchReport();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [fetchReport]);

  /**
   * Function: handleDownloadExcel
   * Purpose: Exports Assets, Liabilities, and Equity to a professional XLSX format.
   */
  const handleDownloadExcel = () => {
    if (!reportData) return;

    const { assets, liabilities, equity, totals } = reportData.data;

    const excelRows = [
      { 'Category': 'BALANCE SHEET REPORT', 'Details': `Unit ID: ${selectedSbuId}`, 'Code': 'Date:', 'Value (USD)': reportData.meta.asOfDate },
      { 'Category': '', 'Details': '', 'Code': '', 'Value (USD)': '' }, // Spacer

      // ASSETS
      { 'Category': 'ASSETS', 'Details': 'Account Name', 'Code': 'Account ID', 'Value (USD)': 'Balance' },
      ...assets.map(a => ({ 'Category': 'ASSET', 'Details': a.name, 'Code': a.code, 'Value (USD)': a.amount })),
      { 'Category': 'TOTAL', 'Details': 'TOTAL UNIT ASSETS', 'Code': '-', 'Value (USD)': totals.total_assets },
      
      { 'Category': '', 'Details': '', 'Code': '', 'Value (USD)': '' }, // Spacer

      // LIABILITIES
      { 'Category': 'LIABILITIES', 'Details': 'Account Name', 'Code': 'Account ID', 'Value (USD)': 'Balance' },
      ...liabilities.map(l => ({ 'Category': 'LIABILITY', 'Details': l.name, 'Code': l.code, 'Value (USD)': l.amount })),
      { 'Category': 'TOTAL', 'Details': 'TOTAL LIABILITIES', 'Code': '-', 'Value (USD)': totals.total_liabilities },

      { 'Category': '', 'Details': '', 'Code': '', 'Value (USD)': '' }, // Spacer

      // EQUITY
      { 'Category': 'EQUITY', 'Details': 'Account Name', 'Code': 'Account ID', 'Value (USD)': 'Balance' },
      ...equity.map(e => ({ 'Category': 'EQUITY', 'Details': e.name, 'Code': e.code, 'Value (USD)': e.amount })),
      { 'Category': 'TOTAL', 'Details': 'TOTAL UNIT EQUITY', 'Code': '-', 'Value (USD)': totals.total_equity },

      { 'Category': '', 'Details': '', 'Code': '', 'Value (USD)': '' }, // Spacer

      // VERIFICATION
      { 
        'Category': 'AUDIT CHECK', 
        'Details': 'Accounting Equation (A = L + E)', 
        'Code': 'STATUS', 
        'Value (USD)': (totals.total_assets - (totals.total_liabilities + totals.total_equity)).toFixed(2) === "0.00" ? "BALANCED" : "DISCREPANCY" 
      }
    ];

    exportToExcel(excelRows, `Balance_Sheet_Audit_Unit_${selectedSbuId}`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .bs-report-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .bs-report-container { padding: 40px; }
        }
      `}} />

      <div className="bs-report-container">
        
        {/* 1. MODULAR HEADER (Title & Export Actions) */}
        <BSHeader 
            selectedSbuId={selectedSbuId} 
            onExport={handleDownloadExcel}
            onPrint={() => window.print()}
            loading={loading}
            hasData={!!reportData}
        />

        {/* 2. REPORT FILTERS (Snapshot Date Control) */}
        <BSFilters 
            filters={filters}
            setFilters={setFilters}
            onFetch={fetchReport}
            loading={loading}
        />

        {/* 3. DYNAMIC BALANCE SHEET VIEW */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Calculating Net Financial Position...
                    </p>
                </div>
            ) : (
                <BalanceSheet reportData={reportData} />
            )}
        </section>

        {/* 4. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <BSFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}