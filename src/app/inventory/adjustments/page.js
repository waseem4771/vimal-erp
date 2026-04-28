
"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import StockAdjustmentForm from '@/components/inventory/StockAdjustmentForm/StockAdjustmentForm';
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT
import AdjustmentsHeader from '@/components/inventory/AdjustmentsHeader/AdjustmentsHeader';
import AdjustmentsNotice from '@/components/inventory/AdjustmentsNotice/AdjustmentsNotice';

/**
 * Inventory Adjustments Page - EXECUTIVE ELITE EDITION
 * Fix: Unified sharp design (0px Radius) via VVIP CSS Injection. ✅
 * Fix: Reliable inline styling for status alerts (Tailwind bypass). ✅
 * Fix: Strictly Left-aligned footer for branding consistency. ✅
 * Mobile: Full responsiveness and optimized vertical spacing. ✅
 * Logic: 100% Intact. ✅
 */
export default function AdjustmentsPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/inventory/all-variants?sbu_id=${selectedSbuId}`);
      setVariants(res.data);
    } catch (err) {
      console.log("Sync Status: Awaiting Backend Connectivity...");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchData();
    }
  }, [fetchData]);

  const handleAdjustment = async (adjustmentData) => {
    setStatus({ type: '', message: '' });
    try {
      const payload = {
        ...adjustmentData,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/inventory/adjust', payload);
      
      setStatus({ 
        type: 'success', 
        message: `Success: Inventory synchronized for Unit ID ${selectedSbuId}.` 
      });
      
      fetchData(); 
    } catch (err) {
      const serverError = err.response?.data?.error || "Transaction Denied: Insufficient stock or permission error.";
      setStatus({ type: 'error', message: serverError });
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring global sharp edges (0px Radius) ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .adjustments-wrapper {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .adjustments-wrapper { padding: 40px; }
        }
      `}} />

      <div className="adjustments-wrapper">
        
        {/* 1. MODULAR HEADER (Back / Title / Sync) */}
        <AdjustmentsHeader 
          selectedSbuId={selectedSbuId} 
          onRefresh={fetchData} 
        />

        {/* 2. DYNAMIC SYSTEM FEEDBACK ALERTS (Sharp & Executive Style) ✅ */}
        {status.message && (
            <div style={{
                marginBottom: '30px',
                padding: '15px 20px',
                backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fef2f2',
                borderLeft: `5px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`,
                borderTop: '1px solid rgba(0,0,0,0.05)',
                borderRight: '1px solid rgba(0,0,0,0.05)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                color: status.type === 'success' ? '#065f46' : '#991b1b',
                fontSize: '10px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            }}>
                {status.type === 'success' ? '✅' : '⚠️'} {status.message}
            </div>
        )}

        {/* 3. ADJUSTMENT WORKSPACE SECTION (The Form) */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                   <div className="animate-spin" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                   <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                      Authenticating Unit Assets...
                   </p>
                </div>
            ) : (
                <StockAdjustmentForm 
                    key={selectedSbuId} 
                    variants={variants} 
                    onAdjust={handleAdjustment} 
                />
            )}
        </section>

        {/* 4. MODULAR REGULATORY NOTICE BANNERS */}
        <AdjustmentsNotice selectedSbuId={selectedSbuId} />

        {/* 5. SYSTEM FOOTER: Optimized & Strictly Left Aligned ✅ */}
        <footer style={{ 
            marginTop: '60px', 
            paddingTop: '25px', 
            borderTop: '1px solid #e2e8f0',
            textAlign: 'left' // Full Left Alignment ✅
        }}>
            <p style={{ 
                fontSize: '8.5px', 
                color: '#94a3b8', 
                fontWeight: '800', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em', 
                fontStyle: 'italic',
                margin: 0
            }}>
                * Strategic Business Unit isolation protocol is active for Unit {selectedSbuId} warehouse integrity *
            </p>
        </footer>

      </div>
    </main>
  );
}