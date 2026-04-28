
"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { exportToExcel } from '@/utils/exportToExcel';

// MODULAR COMPONENTS IMPORT ✅
import CashFlowHeader from '@/components/reports/CashFlowStatement/CashFlowHeader';
import CashFlowFilters from '@/components/reports/CashFlowStatement/CashFlowFilters';
import CashFlowStatement from '@/components/reports/CashFlowStatement/CashFlowStatement';
import CashFlowFooter from '@/components/reports/CashFlowStatement/CashFlowFooter';

/**
 * Cash Flow Management Page - EXECUTIVE MASTER HUB
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular financial parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 * Logic: 100% Intact (Professional Excel Export & API Sync). ✅
 */
export default function CashFlowPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Unified Filter State
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: ''
  });

  /**
   * Function: fetchReport
   * Purpose: Retrieves Cash Flow data via secure API.
   */
  const fetchReport = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      let url = `/analytics/cash-flow?sbu_id=${selectedSbuId}`;
      if (filters.startDate) url += `&startDate=${filters.startDate}`;
      if (filters.endDate) url += `&endDate=${filters.endDate}`;

      const res = await api.get(url);
      setReportData(res.data);
    } catch (err) {
      console.error("CASH_FLOW_SYNC_ERROR: Data fetch failed.");
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
   * Purpose: Exports transaction timeline and liquidity summary to XLSX.
   */
  const handleDownloadExcel = () => {
    if (!reportData) return;

    const excelRows = [
      { 'Status': 'CASH FLOW AUDIT', 'Details': `Unit ID: ${selectedSbuId}`, 'Account': 'Period:', 'Type': reportData.meta.startDate, 'Value': reportData.meta.endDate },
      { 'Status': '', 'Details': '', 'Account': '', 'Type': '', 'Value': '' }, // Spacer

      // Summary Header
      { 'Status': 'SUMMARY', 'Details': 'Total Inflow', 'Account': 'Total Outflow', 'Type': 'Net Change', 'Value': '' },
      { 
        'Status': 'USD', 
        'Details': reportData.summary.total_inflow, 
        'Account': reportData.summary.total_outflow, 
        'Type': reportData.summary.net_cash_change, 
        'Value': '' 
      },

      { 'Status': '', 'Details': '', 'Account': '', 'Type': '', 'Value': '' }, // Spacer

      // Activities Table
      { 'Status': 'DATE', 'Details': 'DESCRIPTION', 'Account': 'LEDGER ACCOUNT', 'Type': 'NATURE', 'Value': 'AMOUNT (USD)' },
      ...reportData.activities.map(act => ({
        'Status': new Date(act.date).toLocaleDateString('en-CA'),
        'Details': act.description,
        'Account': act.account,
        'Type': act.type,
        'Value': act.amount
      }))
    ];

    exportToExcel(excelRows, `Cash_Flow_Audit_Unit_${selectedSbuId}`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .cashflow-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .cashflow-container { padding: 40px; }
        }
      `}} />

      <div className="cashflow-container">
        
        {/* 1. MODULAR HEADER (Title & Export Actions) */}
        <CashFlowHeader 
            selectedSbuId={selectedSbuId} 
            onExport={handleDownloadExcel}
            onPrint={() => window.print()}
            loading={loading}
            hasData={!!reportData}
        />

        {/* 2. REPORT FILTERS (Presets & Manual Control) */}
        <CashFlowFilters 
            filters={filters}
            setFilters={setFilters}
            onFetch={fetchReport}
            loading={loading}
        />

        {/* 3. DYNAMIC CASH FLOW VIEW */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #0ea5e9', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Scanning Banking & Cash Ledgers...
                    </p>
                </div>
            ) : (
                <CashFlowStatement reportData={reportData} />
            )}
        </section>

        {/* 4. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <CashFlowFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}