

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { exportToExcel } from '@/utils/exportToExcel';

// MODULAR COMPONENTS IMPORT ✅
import ApiLogHeader from '@/components/settings/ApiLogs/ApiLogHeader';
import ApiLogTable from '@/components/settings/ApiLogs/ApiLogTable';
import ApiLogFooter from '@/components/settings/ApiLogs/ApiLogFooter';

/**
 * API Traffic Logs Page - EXECUTIVE MASTER HUB
 * Purpose: Monitors real-time inbound requests from external platforms.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function ApiLogsPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [logs, setLogs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Function: fetchLogs
   * Purpose: Retrieves system traffic logs via secure API.
   */
  const fetchLogs = useCallback(async () => {
    if (!selectedSbuId) return;
    setFetching(true);
    try {
      const res = await api.get(`/external/logs?sbu_id=${selectedSbuId}`);
      setLogs(res.data);
    } catch (err) {
      console.error("API_LOG_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setFetching(false);
    }
  }, [selectedSbuId]); 

  // Initial load and hydration safety
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchLogs();
    }
  }, [fetchLogs]);

  /**
   * Function: handleDownloadExcel
   * Purpose: Generates a professional audit report for API traffic.
   */
  const handleDownloadExcel = () => {
    if (logs.length === 0) return;

    const excelRows = logs.map(log => ({
      'Log Timestamp': new Date(log.created_at).toLocaleString('en-CA'),
      'Connected Platform': log.api_keys?.platform_name || 'Generic Source',
      'API Endpoint Hit': log.endpoint_hit,
      'Request Method': log.request_method,
      'HTTP Status': log.response_status + " OK",
      'Origin IP Address': log.ip_address || 'Internal/NA',
      'JSON Payload Received': log.payload_received
    }));

    exportToExcel(excelRows, `API_Traffic_Audit_Unit_${selectedSbuId}`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .api-log-container {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .api-log-container { padding: 40px; }
        }
      `}} />

      <div className="api-log-container">
        
        {/* 1. MODULAR HEADER (Title & Audit Actions) */}
        <ApiLogHeader 
            selectedSbuId={selectedSbuId} 
            onExport={handleDownloadExcel}
            onRefresh={fetchLogs}
            fetching={fetching}
            hasData={logs.length > 0}
        />

        {/* 2. TRAFFIC LEDGER WORKSPACE (Main Table) */}
        <section style={{ marginBottom: '40px' }}>
            <ApiLogTable 
                logs={logs} 
                fetching={fetching} 
                selectedSbuId={selectedSbuId}
            />
        </section>

        {/* 3. SYSTEM FOOTER: Strictly Left-aligned Security Protocol ✅ */}
        <ApiLogFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}