

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import EmployeesHeader from '@/components/hr/Employees/EmployeesHeader';
import EmployeesRegistry from '@/components/hr/Employees/EmployeesRegistry';
import EmployeesFooter from '@/components/hr/Employees/EmployeesFooter';

/**
 * Employee Directory Page - EXECUTIVE MASTER HUB
 * Purpose: Centralized management of staff records per Strategic Business Unit.
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned layout. ✅
 */
export default function EmployeesPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Local state for the employee registration form (Preserved) ✅
  const [formData, setFormData] = useState({
    dept_id: '',
    full_name: '',
    designation: '',
    joining_date: '',
    base_salary: ''
  });

  /**
   * Function: fetchData
   * Purpose: Syncs personnel and department data via secure API.
   */
  const fetchData = useCallback(async () => {
    if (!selectedSbuId) return;
    try {
      const [empRes, deptRes] = await Promise.all([
        api.get(`/hr/employees?sbu_id=${selectedSbuId}`),
        api.get(`/hr/departments?sbu_id=${selectedSbuId}`)
      ]);
      setEmployees(empRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      console.error("EMPLOYEE_SYNC_ERROR: Ledger fetch failed.");
    }
  }, [selectedSbuId]);

  // Sync data on initial load and Global SBU change
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchData();
    }
  }, [fetchData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Function: handleSubmit
   * Purpose: Authorizes new personnel enrollment via secure POST.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/hr/employees', payload);
      
      alert(`Success: Employee authorized and registered for Unit ID ${selectedSbuId}`);
      
      // Reset form and refresh ledger
      setFormData({ dept_id: '', full_name: '', designation: '', joining_date: '', base_salary: '' });
      fetchData(); 
    } catch (err) {
      alert("Error: Failed to register employee. Verify permissions.");
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
        .emp-page-container {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .emp-page-container { padding: 40px; }
        }
      `}} />

      <div className="emp-page-container">
        
        {/* 1. MODULAR HEADER (Title & Refresh) */}
        <EmployeesHeader 
            selectedSbuId={selectedSbuId} 
            onRefresh={fetchData} 
            loading={loading}
        />

        {/* 2. REGISTRY WORKSPACE (Enrollment Form & Data Table) */}
        <section style={{ marginBottom: '40px' }}>
            <EmployeesRegistry 
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                employees={employees}
                departments={departments}
                selectedSbuId={selectedSbuId}
            />
        </section>

        {/* 3. SYSTEM FOOTER: Strictly Left-aligned ✅ */}
        <EmployeesFooter selectedSbuId={selectedSbuId} />

      </div>
    </main>
  );
}