

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import DepartmentsHeader from '@/components/hr/Departments/DepartmentsHeader';
import DepartmentsRegistry from '@/components/hr/Departments/DepartmentsRegistry';
import DepartmentsFooter from '@/components/hr/Departments/DepartmentsFooter';

/**
 * Departments Management Page - EXECUTIVE MASTER HUB
 * Purpose: Allows SBUs to define their organizational structure.
 * Fix: Integrated 'handleDelete' logic to enable "Revoke Access" functionality. ✅
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function DepartmentsPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [departments, setDepartments] = useState([]);
  const [deptName, setDeptName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Function: fetchDepts
   * Purpose: Pulls all departments associated with the selected SBU.
   */
  const fetchDepts = useCallback(async () => {
    if (!selectedSbuId) return;
    setFetching(true);
    try {
      const res = await api.get(`/hr/departments?sbu_id=${selectedSbuId}`);
      setDepartments(res.data);
    } catch (err) {
      console.error("DEPT_SYNC_ERROR: Ledger fetch failed.");
    } finally {
      setFetching(false);
    }
  }, [selectedSbuId]);

  // Sync data on load and SBU switch
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchDepts();
    }
  }, [fetchDepts]);

  /**
   * Function: handleSubmit
   * Purpose: Records a new department designation via secure API.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deptName) return;
    
    setLoading(true);
    try {
      await api.post('/hr/departments', { 
        sbu_id: parseInt(selectedSbuId), 
        dept_name: deptName,
        user_id: localStorage.getItem('vimal_user_id') || 1 
      });
      
      alert(`Success: Department authorized for Unit ID ${selectedSbuId}`);
      setDeptName(''); 
      fetchDepts();    
    } catch (err) {
      alert("Error: Unauthorized action. Verify permissions.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function: handleDelete (NEW FIX ✅)
   * Purpose: Authorizes the removal of a department designation.
   */
  const handleDelete = async (id) => {
    if (!window.confirm("Security Alert: Confirm removal of this department designation?")) return;

    try {
      // Explicitly passing user and sbu context for the audit log
      await api.delete(`/hr/departments/${id}`, {
        data: { 
          user_id: localStorage.getItem('vimal_user_id') || 1,
          sbu_id: parseInt(selectedSbuId)
        }
      });
      
      alert("Success: Department designation revoked.");
      fetchDepts(); // Refresh the list
    } catch (err) {
      const serverMsg = err.response?.data?.error || "Error: Action Denied. Ensure no staff are linked to this unit.";
      alert(serverMsg);
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .dept-page-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .dept-page-container { padding: 40px; }
        }
      `}} />

      <div className="dept-page-container">
        
        {/* 1. MODULAR HEADER (Title & Global Sync) */}
        <DepartmentsHeader 
            selectedSbuId={selectedSbuId}
            onRefresh={fetchDepts}
            fetching={fetching}
        />

        {/* 2. REGISTRY WORKSPACE (Form & Table Combined) */}
        <section style={{ marginBottom: '40px' }}>
            <DepartmentsRegistry 
                deptName={deptName}
                setDeptName={setDeptName}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete} // Passed the new function ✅
                loading={loading}
                fetching={fetching}
                departments={departments}
                selectedSbuId={selectedSbuId}
            />
        </section>

        {/* 3. COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
        <DepartmentsFooter />

      </div>
    </main>
  );
}