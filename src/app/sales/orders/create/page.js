

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import { useRouter } from 'next/navigation';

// MODULAR COMPONENTS IMPORT ✅
import OrderHeader from '@/components/sales/Orders/OrderHeader';
import OrderCreateForm from '@/components/sales/Orders/OrderCreateForm';
import OrderSummary from '@/components/sales/Orders/OrderSummary';

/**
 * Create Sales Order Page - EXECUTIVE HUB (Tier-Aware Edition)
 * Purpose: Authorizes new sales invoices with dynamic tier-based pricing logic.
 * Fix: Integrated automatic price resolution based on selected customer tier. ✅
 * Style: Unified sharp design (0px Radius). ✅
 */
export default function CreateOrderPage() {
  const { selectedSbuId } = useSbu(); 
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); 

  // Core State Management
  const [orderData, setOrderData] = useState({
    customer_id: '',
    total_amount: 0,
    items: [{ variant_id: '', warehouse_id: 1, quantity: 1, unit_price: 0 }]
  });

  /**
   * Function: syncDropdownData
   * Retrieves SBU-specific customers and smart-price variants from the backend.
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
      console.error("SYNC_ERROR: Unit connectivity offline.");
    }
  }, [selectedSbuId]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        syncDropdownData();
    }
  }, [syncDropdownData]);

  /**
   * Logic: Tier Re-calculation ✅
   * Triggered when customer_id changes to ensure existing items match new client tier.
   */
  useEffect(() => {
    if (orderData.customer_id && orderData.items[0].variant_id) {
        const selectedCustomer = customers.find(c => c.id === parseInt(orderData.customer_id));
        const tier = selectedCustomer?.tier || 'Retail';
        
        const updatedItems = orderData.items.map(item => {
            if (!item.variant_id) return item;
            const variant = variants.find(v => v.id === parseInt(item.variant_id));
            const newPrice = variant?.tier_prices?.[tier] || variant?.base_selling_price || 0;
            return { ...item, unit_price: parseFloat(newPrice) };
        });

        const total = updatedItems.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
        setOrderData(prev => ({ ...prev, items: updatedItems, total_amount: total }));
    }
  }, [orderData.customer_id, customers, variants]);

  /**
   * Function: handleItemChange
   * Logic: Dynamically resolves price based on the current selected customer's tier. ✅
   */
  const handleItemChange = (index, field, value) => {
    const newItems = [...orderData.items];
    newItems[index][field] = value;

    // Pehle check karein customer selected hai ya nahi taake tier pata chale
    const selectedCustomer = customers.find(c => c.id === parseInt(orderData.customer_id));
    const tier = selectedCustomer?.tier || 'Retail';

    if (field === 'variant_id') {
      const selectedVariant = variants.find(v => v.id === parseInt(value));
      if (selectedVariant) {
        // Logic: Agar Price Book mein is Tier ki price hai toh wo uthao, warna global base price ✅
        const tierPrice = selectedVariant.tier_prices?.[tier];
        newItems[index].unit_price = tierPrice !== undefined ? parseFloat(tierPrice) : parseFloat(selectedVariant.base_selling_price);
      }
    }
    
    const total = newItems.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
    setOrderData({ ...orderData, items: newItems, total_amount: total });
  };

  /**
   * Function: handleSubmit
   * Finalizes the sale and posts entries to the Unit General Ledger.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' }); 

    if (!orderData.customer_id) {
        return setStatus({ type: 'error', message: 'Action Required: Please select a registered customer.' });
    }

    setLoading(true);
    try {
      const payload = {
        ...orderData,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/sales/orders', payload);
      
      setStatus({ 
        type: 'success', 
        message: `Success: Sales Invoice generated for Tier [${customers.find(c => c.id === parseInt(orderData.customer_id))?.tier || 'Retail'}].` 
      });

      setTimeout(() => router.push('/sales/orders'), 2000);

    } catch (err) {
      const serverMessage = err.response?.data?.error || "Transaction Denied: Unit ledger error.";
      setStatus({ type: 'error', message: serverMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .order-workspace {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .order-workspace { padding: 40px; }
        }
      `}} />

      <div className="order-workspace">
        
        {/* 1. MODULAR HEADER */}
        <OrderHeader selectedSbuId={selectedSbuId} />

        {/* 2. DYNAMIC SYSTEM NOTIFICATIONS */}
        {status.message && (
            <div style={{
                marginBottom: '30px',
                padding: '15px 20px',
                backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fef2f2',
                borderLeft: `5px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`,
                color: status.type === 'success' ? '#065f46' : '#991b1b',
                fontSize: '10px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            }}>
                {status.type === 'success' ? '✅' : '⚠️'} {status.message}
            </div>
        )}

        {/* 3. INVOICE GENERATION BODY */}
        <form onSubmit={handleSubmit}>
            
            <OrderCreateForm 
                orderData={orderData}
                setOrderData={setOrderData}
                customers={customers}
                variants={variants}
                handleItemChange={handleItemChange}
            />

            <OrderSummary 
                orderData={orderData}
                loading={loading}
                selectedSbuId={selectedSbuId}
            />

        </form>

        {/* 4. SYSTEM FOOTER */}
        <footer style={{ marginTop: '60px', paddingTop: '25px', borderTop: '1px solid #e2e8f0', textAlign: 'left' }}>
            <p style={{ fontSize: '8.5px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic', margin: 0 }}>
                * Strategic Business Unit Isolation: This sales entry will impact the General Ledger for Unit {selectedSbuId} *
            </p>
        </footer>

      </div>
    </main>
  );
}