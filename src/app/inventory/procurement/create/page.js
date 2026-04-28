

"use client";

import { useState, useEffect } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import RequisitionForm from '@/components/inventory/RequisitionForm/RequisitionForm';

/**
 * Purchase Requisition Generator Page - EXECUTIVE ELITE EDITION
 * Fix: Forced 0px Border Radius via global injection. ✅
 * Fix: Reliable inline styling for full-screen layout. ✅
 * Mobile: Fully responsive padding and scaling. ✅
 * Logic: 100% Intact. ✅
 */
export default function CreatePOPage() {
  const { selectedSbuId } = useSbu(); 
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (amount, resetFormCallback) => {
    setLoading(true);
    try {
      const payload = {
        sbu_id: parseInt(selectedSbuId), 
        supplier_id: 1, 
        total_amount: parseFloat(amount),
        created_by: parseInt(localStorage.getItem('vimal_user_id') || 1),
        order_date: new Date().toISOString().split('T')[0]
      };

      await api.post('/inventory/purchase-order', payload);
      alert(`Success: Requisition for Unit ${selectedSbuId} has been submitted for authorization.`);
      resetFormCallback(); 

    } catch (err) {
      console.error("PO_CREATE_SYNC_ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error: Unauthorized action or invalid amount.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ 
        backgroundColor: '#f8fafc', 
        minHeight: '100vh', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    }}>
      
      {/* VVIP STYLE INJECTION: Ensuring global sharp edges for this module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .page-workspace {
            padding: 20px;
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center; /* Laptop par center mein rahega */
        }
        @media (min-width: 768px) {
            .page-workspace { padding: 40px; }
        }
      `}} />

      <div className="page-workspace">
        {/* 1. MODULAR FORM COMPONENT 
            - Form khud apne andar responsive logic aur sharp UI rakhega.
        */}
        <RequisitionForm 
          selectedSbuId={selectedSbuId} 
          onSubmit={handleSubmit} 
          loading={loading} 
        />

        {/* 2. FOOTER: Always Left-aligned as per your VVIP rule ✅ */}
        <footer style={{ 
            marginTop: '40px', 
            paddingTop: '20px', 
            borderTop: '1px solid #e2e8f0',
            textAlign: 'left' // Explicit Left Alignment ✅
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
                * System Note: Requisition ID will be generated upon authorization by the Strategic Unit Director *
            </p>
        </footer>
      </div>
    </main>
  );
}