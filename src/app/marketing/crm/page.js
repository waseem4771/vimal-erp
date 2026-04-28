


"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import CrmHeader from '@/components/crm/CrmHeader/CrmHeader';
import LeadsTable from '@/components/crm/LeadsTable/LeadsTable';
import LeadQuickEntryForm from '@/components/crm/LeadQuickEntryForm/LeadQuickEntryForm';
import CampaignForm from '@/components/crm/CampaignForm/CampaignForm';
import CampaignExpenditureDisplay from '@/components/crm/CampaignExpenditureDisplay/CampaignExpenditureDisplay';

/**
 * CRM & Marketing Dashboard Page - EXECUTIVE MASTER HUB
 * Layout: Forms on Top (Side-by-Side), Expenditure Display below, Table at Bottom. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 * Mobile: Full responsiveness and strictly Left-aligned footer. ✅
 */
export default function CrmDashboardPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [leads, setLeads] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Lead Form State (Logic strictly preserved) ✅
  const [leadForm, setLeadForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    source: 'Manual Entry',
    lead_score: '50'
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
   * Function: fetchCrmData
   * Purpose: Retrieves both leads and campaign metrics via secure API.
   */
  const fetchCrmData = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const [leadsRes, campaignsRes] = await Promise.all([
        api.get(`/crm/leads?sbu_id=${selectedSbuId}`),
        api.get(`/crm/campaigns?sbu_id=${selectedSbuId}`)
      ]);
      setLeads(leadsRes.data);
      setCampaigns(campaignsRes.data);
    } catch (err) {
      console.log("CRM_SYNC_ERROR: Data fetch failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

  useEffect(() => {
    if (isMounted) fetchCrmData();
  }, [fetchCrmData, isMounted]);

  /**
   * Function: handleAddLead
   */
  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...leadForm,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/crm/leads', payload);
      alert(`Success: Lead captured for Unit ${selectedSbuId}.`);
      
      setLeadForm({ first_name: '', last_name: '', email: '', phone: '', source: 'Manual Entry', lead_score: '50' });
      fetchCrmData(); 
    } catch (err) {
      alert("Error: Unauthorized action or invalid data entry.");
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .crm-workspace {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .crm-workspace { padding: 40px; }
        }
      `}} />

      <div className="crm-workspace">
        
        {/* 1. MODULAR HEADER (Title & Refresh) */}
        <CrmHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchCrmData} 
        />

        {/* 2. TOP ROW: BOTH FORMS (Side by Side on Laptop) ✅ */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '20px' : '30px',
            marginBottom: '30px'
        }}>
            {/* Form 1: Lead Capture */}
            <LeadQuickEntryForm 
                leadForm={leadForm}
                setLeadForm={setLeadForm}
                handleAddLead={handleAddLead}
            />

            {/* Form 2: Campaign Initiation */}
            <CampaignForm 
                sbuId={selectedSbuId} 
                onCampaignAdded={fetchCrmData} 
            />
        </div>

        {/* 3. MIDDLE ROW: EXPENDITURE MONITORING (Full Width) ✅ */}
        <div style={{ marginBottom: '40px', width: '100%' }}>
            <CampaignExpenditureDisplay 
                campaigns={campaigns}
                selectedSbuId={selectedSbuId}
            />
        </div>

        {/* 4. BOTTOM SECTION: LEADS REGISTRY DATA */}
        <section style={{ marginBottom: '40px' }}>
            <LeadsTable 
                leads={leads} 
                loading={loading} 
            />
        </section>

        {/* 5. SYSTEM FOOTER: Strictly Left-aligned ✅ */}
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
                margin: 0,
                lineHeight: '1.8'
            }}>
                * Strategic Intelligence Protocol: Marketing budgets and lead interactions for Unit {selectedSbuId} are cryptographically verified * <br/>
                Authorized organizational access only - All traffic is monitored.
            </p>
        </footer>

      </div>
    </main>
  );
}