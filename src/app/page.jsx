


"use client";

import { useEffect, useState } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// --- CORE LAYOUT COMPONENTS ---
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader/MobileHeader'; 
import DashboardHeader from '@/components/dashboard/DashboardHeader/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter/DashboardFooter';
import ExecutiveBackground from '@/components/layout/ExecutiveBackground/ExecutiveBackground'; // THE BG COMPONENT ✅

// --- ANALYTICS & DATA WIDGETS ---
import StatsGrid from '@/components/dashboard/StatsGrid/StatsGrid';
import QuickActions from '@/components/dashboard/QuickActions/QuickActions';
import MotherCompanyChart from '@/components/dashboard/MotherCompanyChart/MotherCompanyChart';
import SBUPerformanceTable from '@/components/dashboard/SBUPerformanceTable/SBUPerformanceTable';
import StockAlertBanner from '@/components/dashboard/StockAlertBanner/StockAlertBanner';

/**
 * HomePage (Mother Dashboard Hub) - VIBRANT DYNAMIC EDITION
 * Priority: V.I.P (High Visibility Background & Performance)
 * Fix: Removed 'bg-white' from root div to allow gradient visibility. ✅
 * Fix: Ensured all containers are transparent or glass-effect. ✅
 */
export default function HomePage() {
  const { selectedSbuId, updateSbu } = useSbu(); 
  
  const [summary, setSummary] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const [permissions, setPermissions] = useState([]);

  // MOBILE SIDEBAR STATE
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedRole = localStorage.getItem('vimal_user_role');
    const assignedSbu = localStorage.getItem('vimal_selected_sbu');
    
    if (savedRole) {
        const role = parseInt(savedRole);
        setUserRole(role);
        if (role !== 1 && assignedSbu) {
            updateSbu(assignedSbu); 
        }
    }
  }, [updateSbu]); 

  useEffect(() => {
    if (!isMounted || userRole === null) return;

    async function syncSystemData() {
        setLoading(true);
        try {
            const endpoint = selectedSbuId 
                ? `/analytics/summary?sbu_id=${selectedSbuId}`
                : `/analytics/summary`;

            const [summaryRes, permRes] = await Promise.all([
                api.get(endpoint),
                api.get(`/hr/permissions?role_id=${userRole}`)
            ]);

            setSummary(summaryRes.data);
            setPermissions(permRes.data);
        } catch (err) {
            console.warn("ERP Sync Notice: Session refreshing...");
        } finally {
            setLoading(false);
        }
    }

    syncSystemData();
  }, [isMounted, selectedSbuId, userRole]); 

  const canView = (moduleName) => {
    if (userRole === 1) return true; 
    const perm = permissions.find(p => p.module_name === moduleName);
    return perm ? perm.can_view : false;
  };

  if (!isMounted) return null;

  return (
    /* 
       ROOT CONTAINER: Removed 'bg-white' and 'bg-slate-50' ✅
       Now the background from ExecutiveBackground will shine through.
    */
    <div className="flex h-screen w-full overflow-hidden relative font-sans text-slate-800 bg-transparent">
      
      {/* 1. DYNAMIC VIBRANT GRADIENT LAYER ✅ */}
      <ExecutiveBackground />

      {/* 2. GLOBAL SIDEBAR */}
      <Sidebar 
        canView={canView} 
        userRole={userRole} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* 3. MAIN WORKSPACE (Transparent Layer) ✅ */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden relative scroll-smooth bg-transparent">
        
        {loading && (
            <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 animate-pulse z-[9999]"></div>
        )}

        <MobileHeader 
            isOpen={isSidebarOpen} 
            onOpen={() => setIsSidebarOpen(true)} 
            onClose={() => setIsSidebarOpen(false)}
        />

        {/* --- PAGE CONTENT WRAPPER --- */}
        <div className="p-4 md:p-8 w-full max-w-full">
            
            <DashboardHeader 
                selectedSbuId={selectedSbuId}
                updateSbu={updateSbu}
                userRole={userRole}
                sbuBreakdown={summary?.sbu_breakdown}
            />

            <div className={loading ? "opacity-30 pointer-events-none" : "opacity-100 transition-opacity duration-500"}>
                
                <StockAlertBanner alerts={summary?.low_stock_alerts} />
                
                {/* 
                   Components below will appear on top of the moving gradient.
                   I've ensured their containers have subtle glass transparency.
                */}
                <StatsGrid summary={summary} selectedSbu={selectedSbuId} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                  <div className="lg:col-span-2 min-h-[400px]">
                    <div className="bg-white/80 p-6 rounded-[2rem] shadow-sm border border-slate-200 h-full w-full transition-all hover:shadow-md backdrop-blur-md">
                        {summary && <MotherCompanyChart chartData={summary?.chart_data || []} />}
                    </div>
                  </div>
                  {userRole === 1 && (
                      <div className="h-full">
                        <SBUPerformanceTable breakdownData={summary?.sbu_breakdown || []} />
                      </div>
                  )}
                </div>

                <QuickActions canView={canView} userRole={userRole} />
            </div>

            <DashboardFooter selectedSbuId={selectedSbuId} />
        </div>

      </main>
    </div>
  );
}