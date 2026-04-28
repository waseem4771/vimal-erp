

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { exportToExcel } from '@/utils/exportToExcel';

// MODULAR COMPONENTS IMPORT ✅
import APHeader from '@/components/reports/APAging/APHeader';
import APAging from '@/components/reports/APAging/APAging';
import APFooter from '@/components/reports/APAging/APFooter';

/**
 * Accounts Payable (AP) Aging Page - EXECUTIVE MASTER HUB
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular financial parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 * Logic: 100% Intact (Professional Excel Export & API Sync). ✅
 */
export default function APAgingPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Function: fetchReport
   * Purpose: Retrieves vendor aging data via secure API.
   */
  const fetchReport = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const endpoint = `/analytics/ap-aging?sbu_id=${selectedSbuId}`;
      const res = await api.get(endpoint);
      setReportData(res.data);
    } catch (err) {
      console.error("AP_AGING_SYNC_ERROR: Data fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]); 

  // Initial load and screen detection
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchReport();
    }
  }, [fetchReport]);

  /**
   * Function: handleDownloadExcel
   * Purpose: Exports the detailed AP aging registry to XLSX format.
   */
  const handleDownloadExcel = () => {
    if (!reportData) return;

    const excelRows = [
      { 'Audit Ledger': 'AP AGING ANALYSIS', 'Details': `Unit ID: ${selectedSbuId}`, 'Status': 'Verified', 'Value (USD)': '' },
      { 'Audit Ledger': '', 'Details': '', 'Status': '', 'Value (USD)': '' }, // Spacer

      // Table Data Mapping
      ...reportData.details.map(vendor => ({
        'Audit Ledger': vendor.name,
        'Details': `Current: ${vendor.current}`,
        'Status': `30d: ${vendor.overdue30} | 60d: ${vendor.overdue60} | 90d+: ${vendor.overdue90}`,
        'Value (USD)': vendor.total
      })),

      { 'Audit Ledger': '', 'Details': '', 'Status': '', 'Value (USD)': '' }, // Spacer

      // Summary Totals
      { 
        'Audit Ledger': 'GRAND TOTAL PAYABLES', 
        'Details': `Current: ${reportData.summary.current}`, 
        'Status': `Total Overdue: ${reportData.summary.total - reportData.summary.current}`, 
        'Value (USD)': reportData.summary.total 
      }
    ];

    exportToExcel(excelRows, `AP_Aging_Audit_Unit_${selectedSbuId}`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .ap-report-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .ap-report-container { padding: 40px; }
        }
      `}} />

      <div className="ap-report-container">
        
        {/* 1. MODULAR HEADER (Title & Actions) */}
        <APHeader 
            selectedSbuId={selectedSbuId} 
            onExport={handleDownloadExcel}
            onPrint={() => window.print()}
            onRefresh={fetchReport}
            loading={loading}
            hasData={!!reportData}
        />

        {/* 2. DYNAMIC AP AGING VIEW (Cards & Table) */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #f43f5e', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Compiling Unit Liability Ledger...
                    </p>
                </div>
            ) : (
                <APAging reportData={reportData} />
            )}
        </section>

        {/* 3. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <APFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}