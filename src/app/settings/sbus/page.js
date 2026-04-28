

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import SbuHeader from '@/components/settings/Sbu/SbuHeader';
import SbuRegistry from '@/components/settings/Sbu/SbuRegistry';
import SbuFooter from '@/components/settings/Sbu/SbuFooter';

/**
 * SBU Management Page - EXECUTIVE MASTER HUB (Automation Ready)
 * Purpose: Allows the Mother Company to register and manage Strategic Business Units.
 * Update: Integrated Profit Share Percentage for automated remittances. ✅
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 */
export default function SbuManagementPage() {
    const [sbus, setSbus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Form state for creating a new business entity (Locked for integrity ✅)
    const [formData, setFormData] = useState({
        sbu_name: '',
        sbu_type: 'Online_Store',
        currency: 'USD',
        location: '',
        profit_share_percentage: '0.00' // Captured for automated profit sharing engine ✅
    });

    /**
     * Function: fetchSbus
     * Purpose: Pulls the complete unit registry from the Mother Dashboard analytics engine.
     */
    const fetchSbus = useCallback(async () => {
        try {
            // Fetching from summary to get the latest revenue distribution along with metadata
            const res = await api.get('/analytics/summary'); 
            setSbus(res.data.sbu_breakdown || []);
        } catch (err) {
            console.error("SBU_SYNC_ERROR: Ledger fetch failed.");
        }
    }, []);

    // Initial load and hydration safety
    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            fetchSbus();
        }
    }, [fetchSbus]);

    /**
     * Function: handleChange
     * Purpose: Captures input data including the numerical profit share value.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Function: handleSubmit
     * Purpose: Authorizes and registers a new unit into the database with its profit share rule.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Data validation: formatting decimal for backend sync ✅
            const payload = {
                ...formData,
                profit_share_percentage: parseFloat(formData.profit_share_percentage || 0).toFixed(2)
            };

            await api.post('/settings/sbus', payload);
            
            alert(`Success: Unit "${formData.sbu_name}" registered with ${formData.profit_share_percentage}% profit share protocol.`);
            
            // Reset form completely back to initial state
            setFormData({ 
                sbu_name: '', 
                sbu_type: 'Online_Store', 
                currency: 'USD', 
                location: '',
                profit_share_percentage: '0.00' 
            });

            fetchSbus(); // Refresh the authorized registry list
        } catch (err) {
            const serverMsg = err.response?.data?.error || "Error: SBU registration failed. Ensure the identity name is unique.";
            alert(serverMsg);
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) return null;

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
            
            {/* VVIP GLOBAL STYLE INJECTION: Ensuring global sharp edges for the module ✅ */}
            <style dangerouslySetInnerHTML={{__html: `
                * { border-radius: 0px !important; }
                .sbu-page-container {
                    padding: 20px;
                    max-width: 1450px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }
                @media (min-width: 768px) {
                    .sbu-page-container { padding: 40px; }
                }
            `}} />

            <div className="sbu-page-container">
                
                {/* 1. MODULAR HEADER (Context & Refresh actions) */}
                <SbuHeader 
                    onRefresh={fetchSbus}
                    loading={loading}
                />

                {/* 2. REGISTRY WORKSPACE (Side-by-Side Enrollment & Data Table) */}
                <section style={{ marginBottom: '40px' }}>
                    <SbuRegistry 
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        sbus={sbus}
                    />
                </section>

                {/* 3. SYSTEM FOOTER: Strictly Left-aligned per Protocol ✅ */}
                <SbuFooter />

            </div>
        </main>
    );
}