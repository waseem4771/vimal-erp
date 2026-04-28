

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { exportToExcel } from '@/utils/exportToExcel';

// MODULAR COMPONENTS IMPORT ✅
import ARHeader from '@/components/reports/ARAging/ARHeader';
import ARSummaryCards from '@/components/reports/ARAging/ARSummaryCards';
import ARTable from '@/components/reports/ARAging/ARTable';
import ARFooter from '@/components/reports/ARAging/ARFooter';

/**
 * AR Aging Analysis Page - EXECUTIVE MASTER HUB
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular debt analysis parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 * Logic: 100% Intact (Professional Excel Export & API Sync). ✅
 */
export default function ARAgingPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Function: fetchReport
   * Purpose: Retrieves customer aging data via secure API.
   */
  const fetchReport = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const endpoint = `/analytics/ar-aging?sbu_id=${selectedSbuId}`;
      const res = await api.get(endpoint);
      setReportData(res.data);
    } catch (err) {
      console.error("AR_AGING_SYNC_ERROR: Data fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

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
   * Purpose: Exports detailed customer debt registry to XLSX.
   */
  const handleDownloadExcel = () => {
    if (!reportData) return;

    const excelRows = [
      { 'Audit Ledger': 'AR AGING ANALYSIS', 'Details': `Unit ID: ${selectedSbuId}`, 'Status': 'Verified', 'Value (USD)': '' },
      { 'Audit Ledger': '', 'Details': '', 'Status': '', 'Value (USD)': '' }, // Spacer

      // Table Header
      { 
        'Audit Ledger': 'CUSTOMER ENTITY', 
        'Details': 'CURRENT (0-30)', 
        'Status': 'OVERDUE CATEGORY', 
        'Value (USD)': 'TOTAL BALANCE' 
      },
      
      // Data Mapping
      ...reportData.details.map(cust => ({
        'Audit Ledger': cust.name,
        'Details': cust.current,
        'Status': `30d: ${cust.overdue30} | 60d: ${cust.overdue60} | 90d+: ${cust.overdue90}`,
        'Value (USD)': cust.total
      })),

      { 'Audit Ledger': '', 'Details': '', 'Status': '', 'Value (USD)': '' }, // Spacer

      // Summary Row
      { 
        'Audit Ledger': 'GRAND CONSOLIDATED TOTAL', 
        'Details': reportData.summary.current, 
        'Status': `Total Overdue: ${reportData.summary.total - reportData.summary.current}`, 
        'Value (USD)': reportData.summary.total 
      }
    ];

    exportToExcel(excelRows, `AR_Aging_Audit_Unit_${selectedSbuId}`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .ar-aging-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .ar-aging-container { padding: 40px; }
        }
      `}} />

      <div className="ar-aging-container">
        
        {/* 1. MODULAR HEADER (Title & Actions) */}
        <ARHeader 
            selectedSbuId={selectedSbuId} 
            onExport={handleDownloadExcel}
            onPrint={() => window.print()}
            onRefresh={fetchReport}
            loading={loading}
            hasData={!!reportData}
        />

        {/* 2. AGING SUMMARY SCORECARDS (Emerald to Red Buckets) */}
        <section style={{ marginBottom: '10px' }}>
            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: '15px' }}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} style={{ height: '100px', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }} className="animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <ARSummaryCards summary={reportData?.summary} />
            )}
        </section>

        {/* 3. DYNAMIC CUSTOMER DEBT TABLE VIEW */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Compiling Receivables Ledger...
                    </p>
                </div>
            ) : (
                <ARTable reportData={reportData} />
            )}
        </section>

        {/* 4. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <ARFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}