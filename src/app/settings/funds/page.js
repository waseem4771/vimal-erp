

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import FundHeader from '@/components/settings/Funds/FundHeader';
import FundOperations from '@/components/settings/Funds/FundOperations';
import FundHistoryTable from '@/components/settings/Funds/FundHistoryTable';
import FundFooter from '@/components/settings/Funds/FundFooter';

/**
 * Capital & Fund Management Page - EXECUTIVE MASTER HUB
 * Purpose: Manages inter-company fund allocations and automated profit sharing.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function FundManagementPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [sbus, setSbus] = useState([]); 
  const [history, setHistory] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Function: fetchData ✅
   * Purpose: Syncs SBU registry and capital movement history via secure API.
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetching SBU breakdown for forms
      const sbuRes = await api.get('/analytics/summary');
      setSbus(sbuRes.data.sbu_breakdown);

      // 2. Fetching history (Filtered by SBU if selected)
      const endpoint = selectedSbuId 
        ? `/funds/history?sbu_id=${selectedSbuId}`
        : `/funds/history`;
        
      const historyRes = await api.get(endpoint);
      setHistory(historyRes.data);
    } catch (err) {
      console.error("FUND_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]); 

  // Initial load and screen detection
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchData();
    }
  }, [fetchData]);

  /**
   * Function: handleTransfer ✅
   * Purpose: Executes manual fund allocation.
   */
  const handleTransfer = async (transferData) => {
    try {
      const payload = {
        ...transferData,
        mother_company_id: 1, 
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/funds/transfer', payload);
      alert(`Success: Capital movement authorized and verified.`);
      fetchData(); 
    } catch (err) {
      alert("Error: Unauthorized action. Verify financial rights.");
    }
  };

  /**
   * Function: handleAutoTransfer ✅
   * Purpose: Authorizes the automated profit sharing engine.
   */
  const handleAutoTransfer = async (autoData) => {
    try {
      const payload = {
        ...autoData,
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      const res = await api.post('/funds/auto-profit-share', payload);
      alert(`Success: ${res.data.message}`);
      fetchData(); 
    } catch (err) {
      const serverMessage = err.response?.data?.error || "Error: Engine sync failed.";
      alert(serverMessage);
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; box-sizing: border-box !important; }
        .fund-page-container {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .fund-page-container { padding: 40px; }
        }
      `}} />

      <div className="fund-page-container">
        
        {/* 1. MODULAR HEADER (Title & Context Sync) */}
        <FundHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchData}
            loading={loading}
        />

        {/* 2. OPERATIONAL WORKSPACE (Manual & Auto Forms Combined) */}
        <section style={{ marginBottom: '40px' }}>
            <FundOperations 
                sbus={sbus} 
                onTransfer={handleTransfer} 
                onAutoTransfer={handleAutoTransfer} 
                loading={loading}
            />
        </section>

        {/* 3. TRANSACTION LEDGER (Table / Mobile Cards with Pagination) */}
        <section style={{ marginBottom: '40px' }}>
            <FundHistoryTable 
                history={history} 
                loading={loading} 
                selectedSbuId={selectedSbuId}
            />
        </section>

        {/* 4. COMPLIANCE FOOTER: Strictly Left-aligned Regulatory Notice ✅ */}
        <FundFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}