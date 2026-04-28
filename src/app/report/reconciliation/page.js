

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import ReconHeader from '@/components/reports/ReconciliationTable/ReconHeader';
import ReconAccountSelector from '@/components/reports/ReconciliationTable/ReconAccountSelector';
import ReconciliationTable from '@/components/reports/ReconciliationTable/ReconciliationTable';
import ReconFooter from '@/components/reports/ReconciliationTable/ReconFooter';

/**
 * Bank Reconciliation Page - EXECUTIVE MASTER HUB
 * Purpose: Ledger matching terminal for verifying bank statements. ✅
 * Fix: Added defensive checks for Account ID and SBU context to prevent sync errors. ✅
 * Style: 100% Sharp (0px Radius) via global injection. ✅
 */
export default function BankReconciliationPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /** 
   * Local state for Ledger selection. 
   * Note: Set default to '28' as per your verified database ID ✅ 
   */
  const [accountId, setAccountId] = useState('28'); 

  /**
   * Function: fetchUnreconciled
   * Purpose: Retrieves unmatched transactions. Verified for ID 28 sync. ✅
   */
  const fetchUnreconciled = useCallback(async () => {
    // Safety check: Don't hit API if ID is missing or undefined
    if (!selectedSbuId || selectedSbuId === "undefined" || !accountId) {
        setEntries([]);
        return;
    }

    setLoading(true);
    try {
      const endpoint = `/analytics/reconciliation/unreconciled?sbu_id=${selectedSbuId}&account_id=${accountId}`;
      const res = await api.get(endpoint);
      
      if (res.data) {
        setEntries(res.data);
      }
    } catch (err) {
      // Professional logging for troubleshooting ✅
      console.error("RECONCILIATION_SYNC_ERROR DETAILS:", {
          status: err.response?.status,
          message: err.response?.data?.error || err.message,
          hint: "Ensure the Account ID exists for the current SBU."
      });
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId, accountId]); 

  // Initial load and responsive listener
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Effect Hook: Auto-sync ledger when account or unit context changes. ✅
   */
  useEffect(() => {
    if (isMounted) {
        fetchUnreconciled();
    }
  }, [fetchUnreconciled, isMounted]);

  /**
   * Function: handleMatch
   * Purpose: Marks a transaction as 'Verified' in the ledger.
   */
  const handleMatch = async (entryId) => {
    if (!window.confirm("Accounting Alert: Confirm that this system entry matches your physical bank statement?")) return;

    try {
      const payload = {
        entry_id: entryId,
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/analytics/reconciliation/mark', payload);
      alert("Success: Transaction has been matched and verified.");
      fetchUnreconciled(); // Refresh active list
    } catch (err) {
      const errMsg = err.response?.data?.error || "Authorization Error: Matching action rejected.";
      alert(errMsg);
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .recon-workspace-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .recon-workspace-container { padding: 40px; }
        }
      `}} />

      <div className="recon-workspace-container">
        
        {/* 1. MODULAR HEADER (Context & Refresh) */}
        <ReconHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchUnreconciled} 
            loading={loading}
        />

        {/* 2. ACCOUNT SELECTOR & AUDIT GUIDANCE */}
        <ReconAccountSelector 
            accountId={accountId}
            setAccountId={setAccountId}
            selectedSbuId={selectedSbuId}
        />

        {/* 3. DYNAMIC TRANSACTION TABLE VIEW */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Accessing Verified Ledger for Unit {selectedSbuId}...
                    </p>
                </div>
            ) : (
                <ReconciliationTable 
                    entries={entries} 
                    onMatch={handleMatch} 
                />
            )}
        </section>

        {/* 4. SYSTEM FOOTER: Strictly Left-aligned ✅ */}
        <ReconFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}