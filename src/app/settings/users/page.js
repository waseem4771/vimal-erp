

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import UserHeader from '@/components/settings/Users/UserHeader';
import UserRegistrationForm from '@/components/settings/UserRegistrationForm/UserRegistrationForm';
import UserFooter from '@/components/settings/Users/UserFooter';

/**
 * Team Management Page - EXECUTIVE MASTER HUB
 * Purpose: Centralized hub for Super Admins to manage organizational staff and roles.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function TeamManagementPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [sbus, setSbus] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Function: fetchInitialData
   * Purpose: Retrieves the registry of active SBUs to populate enrollment options.
   */
  const fetchInitialData = useCallback(async () => {
    try {
      const res = await api.get('/settings/sbus');
      setSbus(res.data);
    } catch (err) {
      console.error("DATA_SYNC_ERROR: Registry fetch failed.");
    }
  }, []);

  // Initial load and hydration safety
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchInitialData();
    }
  }, [fetchInitialData]);

  /**
   * Function: handleCreateUser
   * Purpose: Authorizes and registers a new team member via the secure Auth API.
   */
  const handleCreateUser = async (userData) => {
    setLoading(true);
    try {
      const payload = {
        ...userData,
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/auth/signup', payload);
      alert(`Success: The account for "${userData.full_name}" has been authorized and activated.`);
      
    } catch (err) {
      const errMsg = err.response?.data?.error || "Authorization Denied: Internal security rejection.";
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .user-page-container {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .user-page-container { padding: 40px; }
        }
      `}} />

      <div className="user-page-container">
        
        {/* 1. MODULAR HEADER (Title & Context) */}
        <UserHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchInitialData} 
        />

        {/* 2. ENROLLMENT WORKSPACE (Existing modular component) */}
        <section style={{ marginBottom: '40px' }}>
            <UserRegistrationForm 
                sbus={sbus} 
                onSubmit={handleCreateUser} 
                loading={loading} 
            />
        </section>

        {/* 3. SYSTEM FOOTER: Strictly Left-aligned Security Protocol ✅ */}
        <UserFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}