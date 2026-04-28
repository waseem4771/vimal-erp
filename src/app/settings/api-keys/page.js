

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import ApiKeyHeader from '@/components/settings/ApiKeys/ApiKeyHeader';
import ApiKeyFooter from '@/components/settings/ApiKeys/ApiKeyFooter';
import ApiKeyManager from '@/components/settings/ApiKeyManager/ApiKeyManager';

// Professional Icons for the local form ✅
import { FiServer, FiShield, FiPlus, FiGlobe } from 'react-icons/fi';

/**
 * API Gateway Management Page - EXECUTIVE MASTER HUB (Tier-Ready)
 * Purpose: Centralized hub for managing secure B2B external site connections.
 * Update: Added Webhook URL integration for real-time external syncing. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function ApiKeysPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [keys, setKeys] = useState([]);
  const [platform, setPlatform] = useState('Shopify');
  const [webhookUrl, setWebhookUrl] = useState(''); // New Webhook State ✅
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Function: fetchKeys
   * Purpose: Retrieves authorized marketplace credentials via secure API.
   */
  const fetchKeys = useCallback(async () => {
    if (!selectedSbuId) return;
    setFetching(true);
    try {
      const res = await api.get(`/keys/list?sbu_id=${selectedSbuId}`);
      setKeys(res.data);
    } catch (err) {
      console.error("API_KEY_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setFetching(false);
    }
  }, [selectedSbuId]); 

  // Initial load and screen detection
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    if (typeof window !== 'undefined') {
        fetchKeys();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [fetchKeys]);

  /**
   * Function: handleGenerate
   * Purpose: Authorizes and registers a new marketplace connection with Webhook support.
   */
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const payload = {
        sbu_id: parseInt(selectedSbuId),
        platform_name: platform,
        webhook_url: webhookUrl, // Sending Webhook URL to backend ✅
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/keys/generate', payload);
      alert(`Success: Secure credentials authorized for Unit ${selectedSbuId} with Webhook Sync.`);
      
      setWebhookUrl(''); // Clear input
      fetchKeys(); 
    } catch (err) {
      alert("Error: Unauthorized action. Verify security permissions.");
    } finally {
      setLoading(false);
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
    padding: isMobile ? '20px 15px' : '30px 35px',
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
      
      {/* VVIP GLOBAL STYLE INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; box-sizing: border-box !important; }
        .api-stealth-scroll::-webkit-scrollbar { display: none !important; }
      `}} />

      <div style={mainWrapperStyle}>
        
        {/* 1. MODULAR HEADER */}
        <ApiKeyHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchKeys}
            fetching={fetching}
        />

        {/* 2. SECURE CREDENTIAL GENERATOR WORKSPACE */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
              <FiShield style={{ color: '#2563eb', fontSize: '18px' }} />
              <h3 style={{ fontSize: '13.5px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Authorization Gateway
              </h3>
          </div>

          <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr auto', 
              alignItems: 'end', 
              gap: '20px' 
          }}>
            
            {/* Platform Selection */}
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '9px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiServer size={11} /> Integration Platform
              </label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="Shopify">Shopify E-Commerce</option>
                <option value="WooCommerce">WooCommerce Store</option>
                <option value="MERN_Stack">MERN / Custom Backend</option>
                <option value="WordPress">WordPress / External Site</option>
              </select>
            </div>

            {/* Webhook URL Input - NEW FIELD ✅ */}
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '9px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiGlobe size={11} /> External Sync Webhook (URL)
              </label>
              <input 
                type="url"
                placeholder="https://your-site.com/api/v1/sync"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                style={{ ...inputStyle, fontWeight: '600' }}
              />
            </div>

            {/* Submit Button */}
            <button 
                onClick={handleGenerate}
                disabled={loading}
                style={{
                    backgroundColor: loading ? '#cbd5e1' : '#0f172a',
                    color: '#ffffff',
                    padding: isMobile ? '12px 10px' : '15px 35px',
                    border: 'none',
                    borderRadius: '0px', 
                    fontSize: isMobile ? '9.5px' : '11px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    lineHeight: '1',
                    width: isMobile ? '100%' : 'auto',
                    boxSizing: 'border-box'
                }}
                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
            >
                <FiPlus size={isMobile ? 14 : 16} />
                <span>{loading ? "AUTHORIZING..." : "Initialize Marketplace Access"}</span>
            </button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
              <p style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
                * Webhook URL is used by VIMAL ERP to push stock updates to your external site automatically.
              </p>
          </div>
        </div>

        {/* 3. EXTERNAL CONNECTIONS REGISTRY */}
        <section style={{ marginBottom: '40px' }}>
            <ApiKeyManager 
                keys={keys} 
                fetching={fetching} 
            />
        </section>

        {/* 4. SECURITY & COMPLIANCE FOOTER */}
        <ApiKeyFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}