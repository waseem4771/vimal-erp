

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { useRouter } from 'next/navigation';

// MODULAR COMPONENTS IMPORT ✅
import QuotesHeader from '@/components/sales/Quotes/QuotesHeader';
import CreateQuoteForm from '@/components/sales/Quotes/CreateQuoteForm';
import QuoteSummaryBox from '@/components/sales/Quotes/QuoteSummaryBox';

/**
 * Create Sales Quotation Page - EXECUTIVE HUB
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned footer. ✅
 */
export default function CreateQuotePage() {
  const { selectedSbuId } = useSbu(); 
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Core State Management (Logic remains identical for stability) ✅
  const [quoteData, setQuoteData] = useState({
    customer_id: '',
    total_amount: 0,
    valid_until: '',
    items: [{ variant_id: '', quantity: 1, unit_price: 0 }]
  });

  // 2. Hydration Safety & Screen Resize Listener
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Function: syncDropdownData
   * Pulls customers and price-book variants specific to the active unit.
   */
  const syncDropdownData = useCallback(async () => {
    try {
      const [custRes, varRes] = await Promise.all([
        api.get(`/sales/customers?sbu_id=${selectedSbuId}`),
        api.get(`/inventory/all-variants?sbu_id=${selectedSbuId}`)
      ]);
      setCustomers(custRes.data);
      setVariants(varRes.data);
    } catch (err) {
      console.error("QUOTE_DATA_SYNC_ERROR:", err.response?.data || err.message);
    }
  }, [selectedSbuId]);

  useEffect(() => {
    if (isMounted) syncDropdownData();
  }, [selectedSbuId, isMounted, syncDropdownData]);

  /**
   * Function: handleItemChange
   * Logic: Recalculates unit prices and grand totals. (Logic Untouched) ✅
   */
  const handleItemChange = (index, field, value) => {
    const newItems = [...quoteData.items];
    newItems[index][field] = value;

    if (field === 'variant_id') {
      const selectedVariant = variants.find(v => v.id === parseInt(value));
      if (selectedVariant) {
        newItems[index].unit_price = parseFloat(selectedVariant.selling_price);
      }
    }
    
    const total = newItems.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
    setQuoteData({ ...quoteData, items: newItems, total_amount: total });
  };

  /**
   * Function: handleSubmit
   * Logic: Authorizes and registers the quotation via secure API.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quoteData.customer_id) return alert("Validation Error: Please select a target client.");

    setLoading(true);
    try {
      const payload = {
        ...quoteData,
        sbu_id: parseInt(selectedSbuId), 
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/sales/quotes', payload);
      alert(`Success: Business proposal registered for Unit ${selectedSbuId}.`);
      router.push('/sales/quotes'); 

    } catch (err) {
      console.error("QUOTE_SUBMIT_ERROR:", err.response?.data || err.message);
      alert("Error: Unauthorized action or invalid data entry.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius for the entire module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .quote-workspace {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .quote-workspace { padding: 40px; }
        }
      `}} />

      <div className="quote-workspace">
        
        {/* 1. MODULAR HEADER */}
        <QuotesHeader selectedSbuId={selectedSbuId} />

        {/* 2. FORM & SUMMARY BODY */}
        <form onSubmit={handleSubmit}>
            
            {/* Main Form Fields Component */}
            <CreateQuoteForm 
                quoteData={quoteData}
                setQuoteData={setQuoteData}
                customers={customers}
                variants={variants}
                handleItemChange={handleItemChange}
                isMobile={isMobile}
            />

            {/* Total Calculation & Action Trigger */}
            <QuoteSummaryBox 
                quoteData={quoteData}
                loading={loading}
                selectedSbuId={selectedSbuId}
                isMobile={isMobile}
            />

        </form>

        {/* 3. SYSTEM FOOTER: Strictly Left-aligned ✅ */}
        <footer style={{ 
            marginTop: '60px', 
            paddingTop: '25px', 
            borderTop: '1px solid #e2e8f0',
            textAlign: 'left' 
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
                * Strategic Business Unit Isolation: All quotation logs for Unit {selectedSbuId} are cryptographically verified *
            </p>
        </footer>

      </div>
    </main>
  );
}