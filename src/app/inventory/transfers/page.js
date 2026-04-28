"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import BackButton from '@/components/layout/BackButton/BackButton';
import { FiRefreshCw, FiArrowRight, FiBox, FiHome, FiSend } from 'react-icons/fi';

/**
 * Stock Transfer Page - EXECUTIVE MASTER EDITION
 * Logic: Transfers inventory between warehouses/units. ✅
 * Fix: Fetching warehouses from dedicated endpoint instead of stock report. ✅
 * Style: 100% Sharp (0px Radius). ✅
 * Mobile: Responsive buttons (Sync right-aligned, Execute compact). ✅
 */
export default function StockTransferPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [variants, setVariants] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Form State
  const [formData, setFormData] = useState({
    from_warehouse_id: '',
    to_warehouse_id: '',
    variant_id: '',
    quantity: 1
  });

  // Handle screen resize for responsiveness
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Function: fetchData
   * Updated Logic: Hits the /warehouses endpoint directly to get all sites. ✅
   */
  const fetchData = useCallback(async () => {
    if (!selectedSbuId) return;
    setFetching(true);
    try {
      // Parallel fetch variants and all registered warehouses for the unit
      const [varRes, warehouseRes] = await Promise.all([
        api.get(`/inventory/all-variants?sbu_id=${selectedSbuId}`),
        api.get(`/inventory/warehouses?sbu_id=${selectedSbuId}`) // Fixed: Real Site Registry ✅
      ]);
      
      setVariants(varRes.data);
      setWarehouses(warehouseRes.data); // Directly setting all sites (Toronto, Edmonton, etc.)

    } catch (err) {
      console.log("Sync Status: Waiting for Unit Connectivity...");
    } finally {
      setFetching(false);
    }
  }, [selectedSbuId]);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') fetchData();
  }, [fetchData, isMounted]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (formData.from_warehouse_id === formData.to_warehouse_id) {
        return setStatus({ type: 'error', message: "Error: Source and Destination warehouses must be different." });
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        ...formData,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1
      };

      await api.post('/inventory/transfer', payload);
      
      setStatus({ 
        type: 'success', 
        message: `Success: Inventory moved and verified for Unit ID ${selectedSbuId}.` 
      });
      
      setFormData({ from_warehouse_id: '', to_warehouse_id: '', variant_id: '', quantity: 1 });
      fetchData(); 
    } catch (err) {
      const serverError = err.response?.data?.error || "Transaction Denied: Check stock levels or permissions.";
      setStatus({ type: 'error', message: serverError });
    } finally {
      setLoading(false);
    }
  };

  // --- Style Constants ---
  const inputStyle = {
    width: '100%',
    padding: isMobile ? '10px' : '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '600',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '6px',
    display: 'block',
    textAlign: 'left'
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .transfer-container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 1024px) {
            .transfer-container { padding: 40px; }
        }
      `}} />

      <div className="transfer-container">
        
        {/* 1. HEADER */}
        <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'flex-start' : 'center', 
            marginBottom: '35px', 
            borderBottom: '1px solid #e2e8f0', 
            paddingBottom: '20px',
            gap: isMobile ? '15px' : '0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <BackButton />
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: isMobile ? '18px' : '26px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>Stock Transfer</h1>
              <p style={{ fontSize: '8.5px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', marginTop: '4px' }}>
                Unit: <span style={{ color: '#2563eb' }}>ID {selectedSbuId}</span>
              </p>
            </div>
          </div>
          
          <button 
            onClick={fetchData} 
            style={{ 
                alignSelf: isMobile ? 'flex-end' : 'auto',
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0', 
                padding: isMobile ? '6px 12px' : '12px 20px', 
                cursor: 'pointer', 
                fontSize: isMobile ? '8px' : '10px', 
                fontWeight: '900', 
                textTransform: 'uppercase', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px' 
            }}
          >
            <FiRefreshCw className={fetching ? "animate-spin" : ""} /> Sync
          </button>
        </div>

        {/* 2. DYNAMIC ALERTS */}
        {status.message && (
          <div style={{ padding: '12px 20px', marginBottom: '30px', backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fef2f2', borderLeft: `5px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`, color: status.type === 'success' ? '#065f46' : '#991b1b', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {status.type === 'success' ? '✅' : '⚠️'} {status.message}
          </div>
        )}

        {/* 3. MAIN WORKSPACE */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', padding: isMobile ? '20px' : '35px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                gap: isMobile ? '20px' : '30px', 
                marginBottom: '30px' 
            }}>
              
              <div>
                <label style={labelStyle}><FiBox /> Asset Variant</label>
                <select style={inputStyle} value={formData.variant_id} onChange={(e) => setFormData({...formData, variant_id: e.target.value})} required>
                  <option value="">-- Choose Item from Catalog --</option>
                  {variants.map(v => (
                    <option key={v.id} value={v.id}>{v.products.name} ({v.sku})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Relocate Qty</label>
                <input type="number" min="1" style={{ ...inputStyle, fontWeight: '900', color: '#2563eb' }} value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} required />
              </div>

              <div>
                <label style={labelStyle}><FiHome /> Source</label>
                <select style={inputStyle} value={formData.from_warehouse_id} onChange={(e) => setFormData({...formData, from_warehouse_id: e.target.value})} required>
                  <option value="">-- Choose Origin Site --</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}><FiArrowRight /> Destination</label>
                <select style={inputStyle} value={formData.to_warehouse_id} onChange={(e) => setFormData({...formData, to_warehouse_id: e.target.value})} required>
                  <option value="">-- Choose Target Site --</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                  alignSelf: isMobile ? 'center' : 'stretch',
                  width: isMobile ? 'fit-content' : '100%', 
                  backgroundColor: loading ? '#cbd5e1' : '#0f172a', 
                  color: '#ffffff', 
                  padding: isMobile ? '10px 25px' : '18px', 
                  border: 'none', 
                  fontSize: isMobile ? '9px' : '11px', 
                  fontWeight: '900', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.2em', 
                  cursor: loading ? 'not-allowed' : 'pointer', 
                  transition: 'all 0.3s ease', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px' 
              }}
            >
              <FiSend /> {loading ? "Authenticating..." : "Authorize & Execute"}
            </button>
          </form>
        </div>

        {/* 4. FOOTER */}
        <footer style={{ marginTop: '60px', paddingTop: '25px', borderTop: '1px solid #e2e8f0', textAlign: 'left' }}>
          <p style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic', margin: 0, lineHeight: '1.8' }}>
            * Strategic unit isolation protocol is active for Unit {selectedSbuId} * <br />
            Internal asset relocation is cryptographically logged in the general ledger audit trail.
          </p>
        </footer>

      </div>
    </main>
  );
}