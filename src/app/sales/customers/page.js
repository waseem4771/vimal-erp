
"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import CustomersHeader from '@/components/sales/Customers/CustomersHeader';
import CustomerRegistrationForm from '@/components/sales/Customers/CustomerRegistrationForm';
import CustomersTable from '@/components/sales/Customers/CustomersTable';

/**
 * Entity Registry (Customer Management) - EXECUTIVE HUB
 * Fix: Unified sharp design (0px Radius) across all modules. ✅
 * Fix: Reliable inline styling for notifications and layout. ✅
 * Mobile: Full responsiveness and strictly Left-aligned footer. ✅
 */
export default function CustomersPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); 

  // Local state for the enrollment form (Managed here to pass to component)
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    address: ''
  });

  /**
   * Function: fetchCustomers
   * Purpose: Syncs unit-specific client data via secure API.
   */
  const fetchCustomers = useCallback(async () => {
    if (!selectedSbuId) return;
    setLoading(true);
    try {
      const res = await api.get(`/sales/customers?sbu_id=${selectedSbuId}`);
      setCustomers(res.data);
    } catch (err) {
      console.log("Fetch Status: Handled - Service unreachable or session expired.");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchCustomers();
    }
  }, [fetchCustomers]);

  /**
   * Function: handleChange
   * Purpose: Updates form state in real-time.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Function: handleSubmit
   * Purpose: Authorizes registration and synchronizes the ledger.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        ...formData,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };

      await api.post('/sales/customers', payload);
      
      setStatus({ 
        type: 'success', 
        message: `Success: Entity registered and synchronized for Unit ${selectedSbuId}.` 
      });

      // Clear inputs and refresh table
      setFormData({ customer_name: '', email: '', phone: '', address: '' });
      fetchCustomers(); 

    } catch (err) {
      const serverMsg = err.response?.data?.error || "Authorization Error: Permission denied for this unit.";
      setStatus({ type: 'error', message: serverMsg });
    }
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Consistent Sharp Edges ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .registry-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .registry-container { padding: 40px; }
        }
      `}} />

      <div className="registry-container">
        
        {/* 1. MODULAR HEADER (Navigation & Sync) */}
        <CustomersHeader 
          selectedSbuId={selectedSbuId} 
          onRefresh={fetchCustomers} 
        />

        {/* 2. DYNAMIC SYSTEM NOTIFICATIONS (High-Priority Inline Style) ✅ */}
        {status.message && (
            <div style={{
                marginBottom: '30px',
                padding: '15px 20px',
                backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fef2f2',
                borderLeft: `5px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`,
                borderTop: '1px solid rgba(0,0,0,0.05)',
                borderRight: '1px solid rgba(0,0,0,0.05)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                color: status.type === 'success' ? '#065f46' : '#991b1b',
                fontSize: '10px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            }}>
                {status.type === 'success' ? '✅' : '⚠️'} {status.message}
            </div>
        )}

        {/* 3. ENROLLMENT WORKSPACE (Form) */}
        <CustomerRegistrationForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          selectedSbuId={selectedSbuId}
        />

        {/* 4. DATA LEDGER (Table) */}
        <div style={{ marginBottom: '40px' }}>
            <CustomersTable 
                customers={customers} 
                loading={loading} 
                selectedSbuId={selectedSbuId}
            />
        </div>

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
                margin: 0
            }}>
                * Strategic Business Unit Isolation: Data access for Unit {selectedSbuId} is monitored via immutable audit trail *
            </p>
        </footer>

      </div>
    </main>
  );
}