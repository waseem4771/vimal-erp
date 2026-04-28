

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import ProcurementTable from '@/components/inventory/ProcurementTable/ProcurementTable';
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT
import ProcurementHeader from '@/components/inventory/ProcurementHeader/ProcurementHeader';
import ProcurementPolicy from '@/components/inventory/ProcurementPolicy/ProcurementPolicy';
// Professional Icons for the Modal ✅
import { FiX, FiCheckSquare, FiBox, FiHome } from 'react-icons/fi';

/**
 * Procurement Hub - EXECUTIVE ELITE EDITION
 * Fix: Removed ugly prompt() and integrated a Professional Receive Stock Modal. ✅
 * Fix: Forced 0px Border Radius via CSS Injection. ✅
 * Mobile: Full responsiveness with fluid padding and optimized footer. ✅
 */
export default function ProcurementPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [orders, setOrders] = useState([]);
  const [variants, setVariants] = useState([]);
  const [warehouses, setWarehouses] = useState([{ id: 1, name: 'Main Warehouse' }]); // Default fallback
  
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const[status, setStatus] = useState({ type: '', message: '' }); 
  const [isMobile, setIsMobile] = useState(false);

  // Simulation Role Switcher
  const [testUser, setTestUser] = useState({ id: 1, role: 'Manager' });

  // --- MODAL STATE FOR RECEIVE STOCK ---
  const[receiveModal, setReceiveModal] = useState({ isOpen: false, poId: null });
  const[receiveData, setReceiveData] = useState({ variant_id: '', quantity: '', warehouse_id: '1' });
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Parallel fetch: POs, Variants (for dropdown), and Stock (to extract warehouses)
      const [poRes, varRes, stockRes] = await Promise.all([
          api.get(`/inventory/purchase-report?sbu_id=${selectedSbuId}`),
          api.get(`/inventory/all-variants?sbu_id=${selectedSbuId}`),
          api.get(`/inventory/stock-report?sbu_id=${selectedSbuId}`)
      ]);
      
      setOrders(poRes.data);
      setVariants(varRes.data);

      // Extract unique warehouses from stock report for the dropdown
      const uniqueWarehouses =[];
      const map = new Map();
      stockRes.data.forEach(item => {
          if(item.warehouses && !map.has(item.warehouses.id)){
              map.set(item.warehouses.id, true);
              uniqueWarehouses.push(item.warehouses);
          }
      });
      if (uniqueWarehouses.length > 0) {
          setWarehouses(uniqueWarehouses);
      }

    } catch (err) {
      console.log("Sync Status: Reconnecting to Procurement DB...");
    } finally {
      setLoading(false);
    }
  },[selectedSbuId]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchData();
    }
  }, [fetchData]);

  // --- 1. AUTHORIZE PO LOGIC ---
  const handleApprove = async (poId) => {
    setStatus({ type: '', message: '' });
    try {
      const payload = {
        po_id: poId,
        user_id: localStorage.getItem('vimal_user_id') || testUser.id,
        user_role: testUser.role 
      };
      const res = await api.patch('/procurement/approve', payload);
      setStatus({ type: 'success', message: `Approval Granted: ${res.data.message}` });
      fetchData(); 
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Authorization Error: Insufficient Role Rights.";
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  // --- 2. OPEN RECEIVE MODAL (Replaces prompt) ✅ ---
  const openReceiveModal = (poId) => {
    setStatus({ type: '', message: '' });
    setReceiveData({ variant_id: '', quantity: '', warehouse_id: warehouses[0]?.id || '1' });
    setReceiveModal({ isOpen: true, poId });
  };

  // --- 3. SUBMIT RECEIVE STOCK ---
  const submitReceiveStock = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const payload = {
        po_id: receiveModal.poId,
        variant_id: parseInt(receiveData.variant_id),
        warehouse_id: parseInt(receiveData.warehouse_id), 
        quantity: parseInt(receiveData.quantity),
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1
      };
      await api.post('/inventory/receive-po', payload);
      
      setStatus({ type: 'success', message: `Fulfillment Verified: Inventory synchronized for Unit ${selectedSbuId}.` });
      setReceiveModal({ isOpen: false, poId: null });
      fetchData(); 
    } catch (err) {
      alert(err.response?.data?.error || "Fulfillment Failed: Check input data.");
    } finally {
      setModalLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; box-sizing: border-box !important; }
        .procurement-wrapper {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        @media (min-width: 768px) {
            .procurement-wrapper { padding: 40px; }
        }
      `}} />

      <div className="procurement-wrapper">
        
        {/* 1. MODULAR HEADER */}
        <ProcurementHeader 
          selectedSbuId={selectedSbuId} 
          testUser={testUser} 
          setTestUser={setTestUser} 
        />

        {/* 2. DYNAMIC SYSTEM FEEDBACK ALERTS */}
        {status.message && (
            <div style={{ marginBottom: '30px', padding: '15px 20px', backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fef2f2', borderLeft: `5px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`, borderTop: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', color: status.type === 'success' ? '#065f46' : '#991b1b', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {status.type === 'success' ? '✅' : '⚠️'} {status.message}
            </div>
        )}

        {/* 3. PROCUREMENT LEDGER REPOSITORY */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ py: '80px', textAlign: 'center' }}>
                    <div className="animate-spin" style={{ display: 'inline-block', height: '40px', width: '40px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>Authenticating Requisition Ledger...</p>
                </div>
            ) : (
                <ProcurementTable 
                    key={selectedSbuId}
                    orders={orders} 
                    loading={loading} 
                    onApprove={handleApprove} 
                    onReceive={openReceiveModal} // Now opens modal instead of prompt ✅
                    userRole={testUser.role}
                />
            )}
        </section>

        {/* 4. MODULAR STATUTORY POLICY SECTION */}
        <ProcurementPolicy selectedSbuId={selectedSbuId} />

        {/* 5. SYSTEM FOOTER */}
        <footer style={{ marginTop: '60px', paddingTop: '25px', borderTop: '1px solid #e2e8f0', textAlign: isMobile ? 'left' : 'center' }}>
            <p style={{ fontSize: '8.5px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic', margin: 0, lineHeight: '1.8' }}>
                * Requisition and authorization actions are recorded in the Unit {selectedSbuId} immutable audit trail *
            </p>
        </footer>

      </div>

      {/* --- PROFESSIONAL RECEIVE STOCK MODAL ✅ --- */}
      {receiveModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '450px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                
                {/* Modal Header */}
                <div style={{ backgroundColor: '#0f172a', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, color: '#ffffff', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Fulfill Stock: PO #{receiveModal.poId}
                    </h3>
                    <button onClick={() => setReceiveModal({ isOpen: false, poId: null })} style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <FiX size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={submitReceiveStock} style={{ padding: '25px' }}>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '9px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FiBox /> Select Received Item
                        </label>
                        <select 
                            value={receiveData.variant_id} 
                            onChange={(e) => setReceiveData({...receiveData, variant_id: e.target.value})}
                            style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '12px', fontWeight: '600', color: '#0f172a', outline: 'none', cursor: 'pointer' }}
                            required
                        >
                            <option value="">-- Choose Product SKU --</option>
                            {variants.map(v => (
                                <option key={v.id} value={v.id}>{v.products.name} ({v.sku})</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                        <div>
                            <label style={{ fontSize: '9px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', display: 'block' }}>
                                Quantity Received
                            </label>
                            <input 
                                type="number" min="1" 
                                value={receiveData.quantity} 
                                onChange={(e) => setReceiveData({...receiveData, quantity: e.target.value})}
                                style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontSize: '14px', fontWeight: '900', color: '#2563eb', outline: 'none' }}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '9px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FiHome /> Target Site
                            </label>
                            <select 
                                value={receiveData.warehouse_id} 
                                onChange={(e) => setReceiveData({...receiveData, warehouse_id: e.target.value})}
                                style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '11px', fontWeight: '600', color: '#0f172a', outline: 'none', cursor: 'pointer' }}
                                required
                            >
                                {warehouses.map(w => (
                                    <option key={w.id} value={w.id}>{w.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={modalLoading}
                        style={{ width: '100%', backgroundColor: modalLoading ? '#cbd5e1' : '#10b981', color: '#ffffff', padding: '15px', border: 'none', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: modalLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s' }}
                    >
                        <FiCheckSquare size={16} />
                        {modalLoading ? 'Syncing Ledger...' : 'Verify & Add to Stock'}
                    </button>

                </form>
            </div>
        </div>
      )}

    </main>
  );
}