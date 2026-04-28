


"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { exportToExcel } from '@/utils/exportToExcel';

// MODULAR COMPONENTS IMPORT ✅
import TaxationHeader from '@/components/reports/TaxationReport/TaxationHeader';
import ReportFilters from '@/components/reports/ReportFilters/ReportFilters';
import TaxationFilterBar from '@/components/reports/TaxationReport/TaxationFilterBar';
import TaxationReport from '@/components/reports/TaxationReport/TaxationReport';
import TaxationFooter from '@/components/reports/TaxationReport/TaxationFooter';

/**
 * Taxation & Audit Report Page - EXECUTIVE MASTER HUB
 * Purpose: Monitors VAT/GST liabilities and ensures tax compliance per Business Unit.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular financial parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function TaxationPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Unified Filter State
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: ''
  });

  /**
   * Function: fetchReport
   * Purpose: Retrieves tax ledger data via secure API.
   */
  const fetchReport = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      let url = `/analytics/taxation?sbu_id=${selectedSbuId}`;
      if (filters.startDate) url += `&startDate=${filters.startDate}`;
      if (filters.endDate) url += `&endDate=${filters.endDate}`;

      const res = await api.get(url);
      setReportData(res.data);
    } catch (err) {
      console.error("TAX_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId, filters]); 

  // Initial load and screen detection
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchReport();
    }
  }, [fetchReport]);

  /**
   * Function: handlePresetApply
   * Logic: Updates state with calculated dates from preset buttons.
   */
  const handlePresetApply = (dates) => {
    setFilters({
      startDate: dates.startDate,
      endDate: dates.endDate
    });
  };

  /**
   * Function: handleDownloadExcel
   * Purpose: Exports the taxation breakdown to professional XLSX format.
   */
  const handleDownload = () => {
    if (!reportData || !reportData.tax_details) return;
    
    const excelRows = [
      { 'Audit Ledger': 'TAXATION COMPLIANCE REPORT', 'Details': `Unit ID: ${selectedSbuId}`, 'Status': 'Verified', 'Value (USD)': '' },
      { 'Audit Ledger': '', 'Details': '', 'Status': '', 'Value (USD)': '' }, // Spacer

      ...reportData.tax_details.map(t => ({
        'Audit Ledger': t.code,
        'Details': t.name,
        'Status': 'Tax Liability',
        'Value (USD)': t.amount
      })),

      { 'Audit Ledger': '', 'Details': '', 'Status': '', 'Value (USD)': '' }, // Spacer

      { 
        'Audit Ledger': 'NET TAX LIABILITY', 
        'Details': 'Consolidated Period Total', 
        'Status': 'AUDIT READY', 
        'Value (USD)': reportData.total_tax_liability 
      }
    ];

    exportToExcel(excelRows, `Tax_Audit_Report_Unit_${selectedSbuId}`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .tax-page-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .tax-page-container { padding: 40px; }
        }
      `}} />

      <div className="tax-page-container">
        
        {/* 1. MODULAR HEADER (Title & Export/Print Actions) */}
        <TaxationHeader 
            selectedSbuId={selectedSbuId} 
            onExport={handleDownload}
            onPrint={() => window.print()}
            loading={loading}
            hasData={!!reportData}
        />

        {/* 2. QUICK REPORT PRESETS (Existing Global Component) */}
        <ReportFilters onApply={handlePresetApply} />

        {/* 3. MANUAL OVERRIDE & SYNC BAR */}
        <TaxationFilterBar 
            filters={filters}
            setFilters={setFilters}
            onFetch={fetchReport}
            loading={loading}
        />

        {/* 4. DYNAMIC DATA VIEW (Card & Table) */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Reconciling Regulatory Records...
                    </p>
                </div>
            ) : (
                <TaxationReport reportData={reportData} />
            )}
        </section>

        {/* 5. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <TaxationFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}