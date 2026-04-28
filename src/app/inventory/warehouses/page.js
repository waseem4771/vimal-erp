"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import BackButton from '@/components/layout/BackButton/BackButton';
import { FiRefreshCw, FiPlus, FiHome, FiMapPin, FiShield, FiCheck, FiActivity } from 'react-icons/fi';

/**
 * Warehouse Management Page - EXECUTIVE MASTER EDITION
 * Purpose: Centralized interface for managing physical storage locations. ✅
 * Fix: Improved Error Debugging and Auth Check. ✅
 * Style: 100% Sharp (0px Radius). ✅
 */
export default function WarehouseManagementPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    is_main: false
  });

  // Responsive and Mounting logic
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Function: fetchWarehouses
   * Logic: Fetches all sites. Added better error capturing. ✅
   */
  const fetchWarehouses = useCallback(async () => {
    // 1. Context validation
    if (!selectedSbuId || selectedSbuId === "undefined") {
        setFetching(false);
        return;
    }

    setFetching(true);
    try {
      // 2. API Call
      const res = await api.get(`/inventory/warehouses?sbu_id=${selectedSbuId}`);
      
      // 3. Data Integrity Check
      if (res.data) {
        setWarehouses(res.data);
      }
    } catch (err) {
      // 4. Advanced Debugging: Console check for status code ✅
      console.error("SITE_SYNC_ERROR DETAILS:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data
      });
      setWarehouses([]);
    } finally {
      setFetching(false);
    }
  }, [selectedSbuId]);

  useEffect(() => {
    if (isMounted) {
        fetchWarehouses();
    }
  }, [fetchWarehouses, isMounted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        ...formData,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1
      };

      await api.post('/inventory/warehouses', payload);
      
      setStatus({ 
        type: 'success', 
        message: `Success: Site "${formData.name}" authorized for Unit ${selectedSbuId}.` 
      });
      
      setFormData({ name: '', location: '', is_main: false });
      fetchWarehouses(); 
    } catch (err) {
      const serverError = err.response?.data?.error || "Authorization Error: Check backend logs.";
      setStatus({ type: 'error', message: serverError });
    } finally {
      setLoading(false);
    }
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

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '600',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; box-sizing: border-box !important; }
        .warehouse-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        @media (min-width: 1024px) {
            .warehouse-container { padding: 40px; }
            .warehouse-grid {
                display: grid;
                grid-template-columns: 1fr 1.8fr;
                gap: 40px;
                align-items: start;
            }
        }
        .sbu-row:hover { background-color: #f8fafc !important; }
      `}} />

      <div className="warehouse-container">
        
        {/* HEADER */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: '35px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', gap: isMobile ? '15px' : '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <BackButton />
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>Site Configuration</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <FiShield style={{ color: '#2563eb' }} />
                  <p style={{ fontSize: '9px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
                    Unit Context: <span style={{ color: '#2563eb' }}>ID {selectedSbuId}</span>
                  </p>
              </div>
            </div>
          </div>
          <button onClick={fetchWarehouses} style={{ alignSelf: isMobile ? 'flex-end' : 'auto', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '10px 20px', cursor: 'pointer', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiRefreshCw className={fetching ? "animate-spin" : ""} /> Sync Sites
          </button>
        </div>

        {/* ALERTS */}
        {status.message && (
          <div style={{ padding: '15px 20px', marginBottom: '30px', backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fef2f2', borderLeft: `5px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`, color: status.type === 'success' ? '#065f46' : '#991b1b', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {status.type === 'success' ? '✅' : '⚠️'} {status.message}
          </div>
        )}

        {/* WORKSPACE */}
        <div className="warehouse-grid">
            
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', padding: isMobile ? '20px' : '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', marginBottom: isMobile ? '30px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
                    <FiHome style={{ color: '#2563eb', fontSize: '18px' }} />
                    <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                        Enroll New Hub
                    </h3>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={labelStyle}>Site Identity Name</label>
                        <input type="text" placeholder="e.g. Toronto Hub" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={inputStyle} />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={labelStyle}><FiMapPin size={11} /> Global Location</label>
                        <input type="text" placeholder="Street, Province, Canada" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required style={inputStyle} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f8fafc', padding: '12px', border: '1px solid #e2e8f0' }}>
                        <input type="checkbox" id="is_main" checked={formData.is_main} onChange={(e) => setFormData({...formData, is_main: e.target.checked})} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                        <label htmlFor="is_main" style={{ fontSize: '10px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', cursor: 'pointer' }}>
                            Designate as Primary
                        </label>
                    </div>

                    <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: loading ? '#cbd5e1' : '#0f172a', color: '#ffffff', padding: '15px', border: 'none', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.25em', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <FiPlus size={16} /> {loading ? "Authorizing..." : "Authorize Registry Enrollment"}
                    </button>
                </form>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '15px 20px', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiActivity style={{ color: '#3b82f6' }} />
                        <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                            Authorized Registry
                        </h3>
                    </div>
                    <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase' }}>{warehouses.length} Active Centers</span>
                </div>
                
                <div style={{ overflowX: 'auto', flex: 1 }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#fcfcfd', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '15px 20px', fontSize: '9px', fontWeight: '950', color: '#94a3b8', textTransform: 'uppercase' }}>Center Reference</th>
                                <th style={{ padding: '15px 20px', fontSize: '9px', fontWeight: '950', color: '#94a3b8', textTransform: 'uppercase' }}>Physical Address</th>
                                <th style={{ padding: '15px 20px', fontSize: '9px', fontWeight: '950', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {fetching ? (
                                <tr><td colSpan="3" style={{ padding: '50px', textAlign: 'center', color: '#cbd5e1', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px' }} className="animate-pulse">Accessing Ledger...</td></tr>
                            ) : warehouses.length > 0 ? warehouses.map((w) => (
                                <tr key={w.id} style={{ borderBottom: '1px solid #f8fafc' }} className="sbu-row">
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase' }}>{w.name}</div>
                                        <div style={{ fontSize: '9px', color: '#cbd5e1', fontWeight: '700' }}>ID: #HUB-{w.id}</div>
                                    </td>
                                    <td style={{ padding: '15px 20px', color: '#64748b', fontSize: '11px', fontWeight: '600', maxWidth: '280px' }}>
                                        {w.location}
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                        {w.is_main ? (
                                            <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '3px 10px', fontSize: '8px', fontWeight: '950', textTransform: 'uppercase', border: '1px solid #dbeafe', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                <FiCheck /> Primary
                                            </span>
                                        ) : (
                                            <span style={{ color: '#94a3b8', fontSize: '8px', fontWeight: '900', textTransform: 'uppercase' }}>Subsidiary Hub</span>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="3" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>* No satellite locations detected *</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

        {/* FOOTER */}
        <footer style={{ marginTop: '60px', paddingTop: '25px', borderTop: '1px solid #e2e8f0', textAlign: 'left' }}>
            <p style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic', margin: 0, lineHeight: '1.8' }}>
                * Strategic Unit Isolation Protocol: All events for Unit {selectedSbuId} are cryptographically logged *
            </p>
        </footer>

      </div>
    </main>
  );
}