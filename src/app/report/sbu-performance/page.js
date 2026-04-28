

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import dynamic from 'next/dynamic'; 
import { useSbu } from '@/context/SbuContext'; 

// GLOBAL COMPONENTS
import ReportFilters from '@/components/reports/ReportFilters/ReportFilters';

// MODULAR COMPONENTS IMPORT ✅
import SbuPerformanceHeader from '@/components/reports/SbuPerformance/SbuPerformanceHeader';
import SbuTopProducts from '@/components/reports/SbuPerformance/SbuTopProducts';
import SbuRecentActivity from '@/components/reports/SbuPerformance/SbuRecentActivity';
import SbuPerformanceFooter from '@/components/reports/SbuPerformance/SbuPerformanceFooter';

/**
 * Nuclear Fix: PerformanceChart ko dynamic import ke zariye SSR se disable rakha gaya hai.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 */
const PerformanceChart = dynamic(
  () => import('@/components/reports/PerformanceChart/PerformanceChart'),
  { 
    ssr: false, 
    loading: () => <div style={{ height: '350px', width: '100%', backgroundColor: '#f8fafc', border: '1px dashed #e2e8f0' }} /> 
  }
);

export default function SbuPerformancePage() {
  const { selectedSbuId } = useSbu(); 
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: ''
  });

  /**
   * Function: fetchSbuReport
   * Purpose: Syncs unit performance metrics via secure API.
   */
  const fetchSbuReport = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const { startDate, endDate } = filters;
      let url = `/analytics/sbu-report?sbu_id=${selectedSbuId}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const res = await api.get(url);
      setReport(res.data);
    } catch (err) {
      console.error("SBU_SYNC_ERROR: Ledger fetch failed.");
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
        fetchSbuReport();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [fetchSbuReport]);

  const handlePresetApply = (dates) => {
    setFilters({ startDate: dates.startDate, endDate: dates.endDate });
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .performance-container {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .performance-container { padding: 40px; }
        }
      `}} />

      <div className="performance-container">
        
        {/* 1. MODULAR HEADER (Title & Refresh) */}
        <SbuPerformanceHeader 
            sbuName={report?.sbu_name}
            selectedSbuId={selectedSbuId}
            onRefresh={fetchSbuReport}
            loading={loading}
        />

        {/* 2. ANALYTICS PERIOD PRESETS */}
        <ReportFilters onApply={handlePresetApply} />

        {loading ? (
            <div style={{ padding: '100px 0', textAlign: 'center' }}>
                <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                    Compiling Strategic Intelligence...
                </p>
            </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* TOP GRID: Chart & Products */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                gap: '30px',
                alignItems: 'stretch'
            }}>
                {/* Sales Velocity Chart */}
                <div style={{ backgroundColor: '#ffffff', padding: '25px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '950', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                        Unit Sales Velocity (Periodic)
                    </h3>
                    <PerformanceChart data={report?.daily_trend || []} />
                </div>

                {/* Top Selling Ranking */}
                <SbuTopProducts topProducts={report?.top_products} />
            </div>

            {/* BOTTOM SECTION: Transaction Ledger */}
            <SbuRecentActivity 
                activityData={report?.recent_activity} 
                selectedSbuId={selectedSbuId} 
            />

          </div>
        )}

        {/* 3. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <SbuPerformanceFooter selectedSbuId={selectedSbuId} />

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