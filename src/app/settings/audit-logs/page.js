

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import AuditHeader from '@/components/settings/Audit/AuditHeader';
import AuditLogsTable from '@/components/dashboard/AuditLogsTable/AuditLogsTable';
import AuditFooter from '@/components/settings/Audit/AuditFooter';

/**
 * Internal Audit Trail Page - EXECUTIVE MASTER HUB
 * Purpose: Monitors all organizational actions and system modifications.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Integrated Pagination Logic (7 Records per Page). ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function InternalAuditPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- PAGINATION STATE ✅ ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 

  /**
   * Function: fetchAuditLogs
   * Purpose: Retrieves internal activity logs from the analytics engine.
   */
  const fetchAuditLogs = useCallback(async () => {
    if (!selectedSbuId && selectedSbuId !== null) return;
    setLoading(true);
    try {
      const endpoint = selectedSbuId 
        ? `/analytics/internal-logs?sbu_id=${selectedSbuId}`
        : `/analytics/internal-logs`;

      const res = await api.get(endpoint);
      setLogs(res.data);
      setCurrentPage(1); // Reset to first page on new data sync
    } catch (err) {
      console.error("AUDIT_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]); 

  // Sync detection and data load
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    if (typeof window !== 'undefined') {
        fetchAuditLogs();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [fetchAuditLogs]);

  // --- PAGINATION CALCULATION ✅ ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogsSlice = logs.slice(indexOfFirstItem, indexOfLastItem);

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .audit-page-container {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .audit-page-container { padding: 40px; }
        }
      `}} />

      <div className="audit-page-container">
        
        {/* 1. MODULAR HEADER (Title & Security Context) */}
        <AuditHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchAuditLogs} 
            loading={loading}
        />

        {/* 2. AUDIT LOGS DATA WORKSPACE ✅ */}
        <section style={{ marginBottom: '40px' }}>
            <AuditLogsTable 
                key={selectedSbuId}
                logs={currentLogsSlice} // Passing the paginated slice
                loading={loading} 
                currentPage={currentPage}
                totalItems={logs.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </section>

        {/* 3. SYSTEM FOOTER: Regulatory Compliance Notices ✅ */}
        <AuditFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}