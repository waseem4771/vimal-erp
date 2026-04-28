

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import CurrencyHeader from '@/components/settings/Currency/CurrencyHeader';
import CurrencyFooter from '@/components/settings/Currency/CurrencyFooter';
import CurrencyTable from '@/components/settings/CurrencyTable/CurrencyTable';

// Professional Icons for the local registration form ✅
import { FiPlus, FiGlobe, FiTrendingUp, FiEdit3 } from 'react-icons/fi';

/**
 * Currency Management Page - EXECUTIVE MASTER HUB
 * Purpose: Manages global exchange rates used for multi-currency consolidation.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function CurrencySettingsPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Local state for registering a new currency pair (Preserved) ✅
  const [formData, setFormData] = useState({
    from_currency: '',
    exchange_rate: ''
  });

  /**
   * Function: fetchRates
   * Purpose: Retrieves all active exchange rates via secure API.
   */
  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/currencies');
      setRates(res.data);
    } catch (err) {
      console.error("CURRENCY_FETCH_ERROR: Connection failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and screen detection
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    if (typeof window !== 'undefined') {
        fetchRates();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [fetchRates]);

  /**
   * Function: handleUpdate
   * Purpose: Authorizes and modifies an existing rate with SBU audit context.
   */
  const handleUpdate = async (id, rate) => {
    try {
      const payload = {
        id: id,
        exchange_rate: rate,
        user_id: localStorage.getItem('vimal_user_id') || 1,
        sbu_id: parseInt(selectedSbuId) 
      };

      await api.patch('/currencies/update', payload);
      alert("Success: Global exchange rate has been synchronized.");
      fetchRates(); 
    } catch (err) {
      alert("Error: Unauthorized action. Rate modification failed.");
    }
  };

  /**
   * Function: handleSubmit
   * Purpose: Registers a new currency definition linked to active SBU.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
          ...formData,
          user_id: localStorage.getItem('vimal_user_id') || 1,
          sbu_id: parseInt(selectedSbuId) 
      };

      await api.post('/currencies/add', payload);
      alert("Success: New currency definition authorized.");
      setFormData({ from_currency: '', exchange_rate: '' }); 
      fetchRates(); 
    } catch (err) {
      alert("Error: Failed to authorize new currency pair.");
    }
  };

  // --- Inline Styles for Local Form Card ---
  const mainWrapperStyle = {
    padding: isMobile ? '15px 12px' : '40px',
    maxWidth: '1200px', // Focused width for settings
    margin: '0 auto',
    boxSizing: 'border-box',
    width: '100%',
    overflowX: 'hidden'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '30px 40px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
    marginBottom: '35px',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13.5px',
    fontWeight: '700',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px',
    boxSizing: 'border-box'
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; box-sizing: border-box !important; }
      `}} />

      <div style={mainWrapperStyle}>
        
        {/* 1. MODULAR HEADER (Title & Context) */}
        <CurrencyHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchRates}
            loading={loading}
        />

        {/* 2. INITIALIZE NEW CURRENCY WORKSPACE ✅ Fully Responsive */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
              <FiEdit3 style={{ color: '#2563eb', fontSize: '18px' }} />
              <h3 style={{ fontSize: '13.5px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Initialize New Currency Pair
              </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                alignItems: isMobile ? 'stretch' : 'flex-end', 
                gap: '20px' 
            }}>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <label style={{ fontSize: '9px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiGlobe size={11} /> ISO Alpha-3 Code
                </label>
                <input 
                  type="text" maxLength={3} placeholder="e.g. GBP"
                  value={formData.from_currency} 
                  onChange={(e) => setFormData({...formData, from_currency: e.target.value.toUpperCase()})}
                  style={inputStyle} required
                />
              </div>

              <div style={{ flex: 1, textAlign: 'left' }}>
                <label style={{ fontSize: '9px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiTrendingUp size={11} /> Rate (1 USD = ?)
                </label>
                <input 
                  type="number" step="0.000001" placeholder="1.00"
                  value={formData.exchange_rate} 
                  onChange={(e) => setFormData({...formData, exchange_rate: e.target.value})}
                  style={{ ...inputStyle, color: '#2563eb' }} required
                />
              </div>

              <button 
                  type="submit" 
                  style={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      padding: isMobile ? '12px 15px' : '14px 40px',
                      border: 'none',
                      borderRadius: '0px', 
                      fontSize: '11px',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      whiteSpace: 'nowrap',
                      lineHeight: '1',
                      width: isMobile ? '100%' : 'auto'
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#0f172a')}
              >
                  <FiPlus size={16} />
                  <span>Authorize Conversion</span>
              </button>
            </div>
          </form>
        </div>

        {/* 3. GLOBAL RATES REGISTRY (Integrated Table) */}
        <section style={{ marginBottom: '40px' }}>
            {loading ? (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                    <div className="animate-spin-vip" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #2563eb', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
                    <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
                        Syncing Market Data...
                    </p>
                </div>
            ) : (
                <CurrencyTable rates={rates} onUpdate={handleUpdate} />
            )}
        </section>

        {/* 4. FINANCIAL INTEGRITY FOOTER: Strictly Left-aligned ✅ */}
        <CurrencyFooter selectedSbuId={selectedSbuId} />

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spinVip { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-vip { animation: spinVip 1s linear infinite; }
      `}} />
    </main>
  );
}