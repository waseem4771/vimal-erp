

"use client";

import { useState, useEffect } from 'react';
import api from '@/utils/axiosConfig';
// Professional Icons ✅
import { FiFlag, FiTarget, FiDollarSign, FiPlus, FiZap, FiInfo } from 'react-icons/fi';

/**
 * Enterprise CampaignForm - EXECUTIVE SHARP EDITION (Integration Ready)
 * Part 4: Marketing Expenditure & Budget Allocation.
 * Fix: Added dynamic notice for Live Email Integration. ✅
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Mobile: Fully responsive stacked layout with slim buttons. ✅
 */
export default function CampaignForm({ sbuId, onCampaignAdded }) {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    campaign_name: '',
    campaign_type: 'Email',
    budget: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Confirmation for Live Email trigger
    if (formData.campaign_type === 'Email') {
        const confirmSend = window.confirm("Authorization Required: Launching this campaign will trigger automated marketing emails to all active leads. Proceed?");
        if (!confirmSend) return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        sbu_id: parseInt(sbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };
      const res = await api.post('/crm/campaigns', payload);
      alert(res.data.message || "Success: Marketing campaign has been initiated.");
      setFormData({ campaign_name: '', campaign_type: 'Email', budget: '', start_date: '', end_date: '' });
      if (onCampaignAdded) onCampaignAdded();
    } catch (error) {
      console.error("CAMPAIGN_POST_ERROR:", error.response?.data || error.message);
      alert("Error: Failed to register campaign. Verify your marketing permissions.");
    } finally {
      setLoading(false);
    }
  };

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '30px 25px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '10px' : '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
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
    letterSpacing: '0.12em',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'left' 
  };

  const submitBtnStyle = {
    backgroundColor: loading ? '#334155' : '#0f172a', 
    color: '#ffffff',
    padding: isMobile ? '11px' : '14px',
    border: 'none',
    borderRadius: '0px', 
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    marginTop: '10px',
    lineHeight: '1'
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. SECTION HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
        <FiFlag style={{ color: '#2563eb', fontSize: '18px' }} />
        <h2 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Initiate Campaign
        </h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Campaign Name */}
        <div>
          <label style={labelStyle}><FiTarget size={12} /> Campaign Identity</label>
          <input 
            type="text" 
            placeholder="e.g. Q4 Global Outreach"
            value={formData.campaign_name}
            onChange={(e) => setFormData({...formData, campaign_name: e.target.value})}
            style={inputStyle}
            required
          />
        </div>

        {/* Platform & Budget Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px' }}>
            <div>
                <label style={labelStyle}>Platform Type</label>
                <select 
                    value={formData.campaign_type}
                    onChange={(e) => setFormData({...formData, campaign_type: e.target.value})}
                    style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}
                >
                    <option value="Email">Email Marketing</option>
                    <option value="Social_Media">Social Media</option>
                    <option value="Cold_Call">Cold Calling</option>
                    <option value="Event">Physical Event</option>
                </select>
            </div>
            <div>
                <label style={labelStyle}><FiDollarSign size={12} /> Budget ($)</label>
                <input 
                    type="number" 
                    placeholder="0.00"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    style={{ ...inputStyle, fontWeight: '900', color: '#2563eb' }}
                    required
                />
            </div>
        </div>

        {/* 2. DYNAMIC INTEGRATION NOTICE (NEW ✅) */}
        {formData.campaign_type === 'Email' && (
            <div style={{
                backgroundColor: '#eff6ff',
                padding: '12px',
                border: '1px solid #dbeafe',
                borderLeft: '4px solid #3b82f6',
                display: 'flex',
                gap: '10px',
                marginTop: '5px'
            }}>
                <FiZap style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '9px', color: '#1e40af', fontWeight: '800', textTransform: 'uppercase', lineHeight: '1.4', margin: 0 }}>
                    Live Integration: This action will trigger automated marketing emails to all active leads in Unit {sbuId}.
                </p>
            </div>
        )}

        {/* Submit Button */}
        <button 
            type="submit" 
            disabled={loading}
            style={submitBtnStyle}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
        >
          <FiPlus size={14} />
          <span>{loading ? "AUTHORIZING..." : "Launch Campaign"}</span>
        </button>

      </form>

      {/* FOOTER NOTICE ✅ */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'left', margin: 0 }}>
             * Strategic budget allocation protocol *
          </p>
      </div>

    </div>
  );
}