

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import PricingHeader from '@/components/hr/settings/Pricing/PricingHeader';
import PricingFooter from '@/components/hr/settings/Pricing/PricingFooter';
import CouponManager from '@/components/settings/CouponManager/CouponManager';

// Professional Icons for the local form ✅
import { FiTag, FiDollarSign, FiPackage, FiInfo, FiEdit3, FiLayers } from 'react-icons/fi';

/**
 * Pricing & Discounts Settings Page - EXECUTIVE MASTER HUB (Tier-Ready)
 * Purpose: Manages unit-specific price books (by Customer Tier) and promotional coupons.
 * Update: Integrated Tier-based pricing (Retail, Wholesale, VIP). ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function PricingSettingsPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [coupons, setCoupons] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Local state for the SBU-specific Price Book override form (Updated with Tier ✅)
  const [priceBookForm, setPriceBookForm] = useState({
    variant_id: '',
    price: '',
    tier: 'Retail' // Default tier
  });

  /**
   * Function: fetchAllData
   * Purpose: Retrieves active coupons and SKU variants via secure API.
   */
  const fetchAllData = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const [couponRes, variantRes] = await Promise.all([
        api.get(`/pricing/coupons/list?sbu_id=${selectedSbuId}`),
        api.get(`/inventory/all-variants?sbu_id=${selectedSbuId}`)
      ]);
      setCoupons(couponRes.data);
      setVariants(variantRes.data);
    } catch (err) {
      console.error("PRICING_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]); 

  // Initial load and screen detection
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    if (typeof window !== 'undefined') {
        fetchAllData();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [fetchAllData]);

  /**
   * Function: handleAddCoupon
   */
  const handleAddCoupon = async (couponData) => {
    try {
      await api.post('/pricing/coupons/add', {
        ...couponData,
        sbu_id: parseInt(selectedSbuId), 
        user_id: localStorage.getItem('vimal_user_id') || 1 
      });
      alert(`Success: Promotional coupon authorized for Unit ${selectedSbuId}.`);
      fetchAllData(); 
    } catch (err) {
      alert("Error: Unauthorized action. Verify permissions.");
    }
  };

  /**
   * Function: handlePriceUpdate
   * Logic: Authorizes Tier-specific price override. ✅
   */
  const handlePriceUpdate = async (e) => {
    e.preventDefault();
    if (!priceBookForm.variant_id) return alert("Action Required: Select a variant.");

    try {
      const payload = {
        variant_id: parseInt(priceBookForm.variant_id),
        price: parseFloat(priceBookForm.price),
        tier: priceBookForm.tier, // New Tier logic sent to backend ✅
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/pricing/price-book/upsert', payload);
      alert(`Success: Custom ${priceBookForm.tier} price verified for Unit ${selectedSbuId}.`);
      setPriceBookForm({ variant_id: '', price: '', tier: 'Retail' }); 
      fetchAllData(); 
    } catch (err) {
      alert("Error: Authorization Denied. Ensure the database schema is synced.");
    }
  };

  // --- Inline Styles for Local Components ---
  const mainWrapperStyle = {
    padding: isMobile ? '15px 12px' : '40px',
    maxWidth: '1450px',
    margin: '0 auto',
    boxSizing: 'border-box',
    width: '100%',
    overflowX: 'hidden'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '30px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13.5px',
    fontWeight: '600',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px',
    boxSizing: 'border-box'
  };

  const labelStyle = { 
    fontSize: '9px', 
    fontWeight: '900', 
    color: '#94a3b8', 
    textTransform: 'uppercase', 
    marginBottom: '6px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '5px', 
    letterSpacing: '0.1em' 
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; box-sizing: border-box !important; }
        .pricing-grid {
            display: grid;
            grid-template-columns: 1fr 2.2fr;
            gap: 40px;
            align-items: start;
        }
        @media (max-width: 1024px) {
            .pricing-grid {
                grid-template-columns: 1fr;
                gap: 25px;
            }
        }
      `}} />

      <div style={mainWrapperStyle}>
        
        {/* 1. MODULAR HEADER */}
        <PricingHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchAllData} 
            loading={loading}
        />

        {/* 2. MAIN WORKSPACE GRID ✅ Fully Responsive Stacking */}
        <div className="pricing-grid">
            
            {/* LEFT COLUMN: SBU PRICE BOOK OVERRIDE */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
                    <FiEdit3 style={{ color: '#4f46e5', fontSize: '18px' }} />
                    <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                        Strategic Price Book
                    </h3>
                </div>

                <form onSubmit={handlePriceUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    
                    {/* Tier Selection - NEW FIELD ✅ */}
                    <div style={{ textAlign: 'left' }}>
                        <label style={labelStyle}>
                            <FiLayers size={11} /> Target Customer Tier
                        </label>
                        <select 
                            value={priceBookForm.tier} 
                            onChange={(e) => setPriceBookForm({...priceBookForm, tier: e.target.value})}
                            style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800', color: '#2563eb', borderLeft: '4px solid #2563eb' }}
                            required
                        >
                            <option value="Retail">Retail Client</option>
                            <option value="Wholesale">Wholesale Entity</option>
                            <option value="VIP">VIP / Partner</option>
                        </select>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={labelStyle}>
                            <FiPackage size={11} /> Inventory SKU
                        </label>
                        <select 
                            value={priceBookForm.variant_id} 
                            onChange={(e) => setPriceBookForm({...priceBookForm, variant_id: e.target.value})}
                            style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}
                            required
                        >
                            <option value="">-- Choose Variant --</option>
                            {variants.map(v => (
                                <option key={v.id} value={v.id}>
                                    {isMobile ? v.products?.name.substring(0, 20) + '...' : v.products?.name} ({v.variant_name})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={labelStyle}>
                            <FiDollarSign size={11} /> Custom Tier Price (USD)
                        </label>
                        <input 
                            type="number" step="0.01" value={priceBookForm.price} 
                            onChange={(e) => setPriceBookForm({...priceBookForm, price: e.target.value})}
                            style={{ ...inputStyle, fontWeight: '900', color: '#10b981' }}
                            placeholder="0.00" required
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: '#0f172a', color: '#ffffff', border: 'none', 
                            padding: isMobile ? '12px' : '15px',
                            fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer',
                            transition: 'all 0.3s ease', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            width: '100%', lineHeight: '1'
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#4f46e5')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#0f172a')}
                    >
                        Authorize Tier Price
                    </button>
                </form>

                <div style={{ marginTop: '25px', padding: '12px', backgroundColor: '#f0fdf4', border: '1px solid #dcfce7', display: 'flex', gap: '10px' }}>
                    <FiInfo style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '9px', color: '#166534', fontWeight: '700', lineHeight: '1.4', margin: 0 }}>
                        Tier Logic: Prices defined here override the base rate ONLY for customers linked to the selected tier in Unit {selectedSbuId}.
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: REUSABLE COUPON MANAGER WORKSPACE */}
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <CouponManager 
                    key={selectedSbuId}
                    coupons={coupons} 
                    onAdd={handleAddCoupon} 
                    loading={loading} 
                />
            </div>

        </div>

        {/* 3. SYSTEM FOOTER: Strictly Left-aligned */}
        <PricingFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}