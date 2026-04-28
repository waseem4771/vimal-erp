

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { exportToExcel } from '@/utils/exportToExcel';
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT
import AssetsHeader from '@/components/inventory/FixedAssets/AssetsHeader';
import AssetRegistrationForm from '@/components/inventory/FixedAssets/AssetRegistrationForm';
import AssetsTable from '@/components/inventory/FixedAssets/AssetsTable';

/**
 * Fixed Assets Management Page - EXECUTIVE ELITE VERSION
 * Fix: Added Monthly Depreciation Ledger Posting Logic. ✅
 * Fix: Unified sharp design (0px Radius) across all page elements. ✅
 * Mobile: Fluid padding and left-aligned footer. ✅
 */
export default function FixedAssetsPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); 

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/fixed-assets?sbu_id=${selectedSbuId}`);
      setAssets(res.data);
    } catch (err) {
      console.log("Sync Status: Reconnecting to Ledger...");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchAssets();
    }
  }, [fetchAssets]);

  const handleDownloadExcel = () => {
    if (assets.length === 0) {
        setStatus({ type: 'error', message: 'Action Denied: No assets available for export.' });
        return;
    }
    const excelRows = assets.map(asset => ({
      'Asset ID': asset.id,
      'Description': asset.asset_name, 
      'Classification': asset.asset_type,
      'Acquisition Date': new Date(asset.purchase_date).toLocaleDateString('en-CA'),
      'Initial Cost (USD)': asset.purchase_price,
      'Current Book Value': asset.current_value,
      'Annual Depreciation': asset.annual_depreciation,
      'Estimated Life (Y)': asset.useful_life,
      'Registry Status': asset.status
    }));
    exportToExcel(excelRows, `Fixed_Assets_Audit_Unit_${selectedSbuId}`);
  };

  /**
   * Function: handlePostDepreciation (NEW ✅)
   * Purpose: Triggers the backend to post monthly depreciation entries to the General Ledger.
   */
  const handlePostDepreciation = async () => {
    if (!window.confirm("Accounting Alert: This will post monthly depreciation entries for all active assets to the General Ledger. Proceed?")) return;
    
    setStatus({ type: '', message: '' });
    try {
      const res = await api.post('/fixed-assets/post-depreciation', {
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1
      });
      
      setStatus({ type: 'success', message: res.data.message });
      fetchAssets(); // Refresh values
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Ledger Error: Failed to post depreciation. Ensure accounts are set up.";
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  const handleSubmit = async (formData, resetFormCallback) => {
    setStatus({ type: '', message: '' }); 
    try {
      const payload = {
        ...formData,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };
      
      await api.post('/fixed-assets', payload);
      
      setStatus({ type: 'success', message: `Success: Asset registered for Unit ${selectedSbuId}.` });
      resetFormCallback(); 
      fetchAssets(); 
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Authorization Error: Failed to authorize entry.";
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Security Alert: Confirm removal of this record to the archive?")) return;
    setStatus({ type: '', message: '' });

    try {
      await api.delete(`/fixed-assets/${id}`, {
        data: { user_id: localStorage.getItem('vimal_user_id') || 1 } 
      });
      setStatus({ type: 'success', message: "Success: Asset record archived." });
      fetchAssets(); 
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Permission Denied: Unable to archive asset.";
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  if (!isMounted) return null;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Sab components ko sharp (radius 0) karne ke liye ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .page-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .page-container { padding: 40px; }
        }
      `}} />

      <div className="page-container">
        
        {/* 1. MODULAR HEADER (Export/Print/Back/Depreciate) */}
        {/* Added onPostDepreciation prop below ✅ */}
        <AssetsHeader 
          selectedSbuId={selectedSbuId} 
          onExport={handleDownloadExcel} 
          onPrint={() => window.print()} 
          onPostDepreciation={handlePostDepreciation}
        />

        {/* 2. DYNAMIC SYSTEM NOTIFICATIONS (Sharp & Elite Style) ✅ */}
        {status.message && (
            <div style={{
                marginBottom: '25px',
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

        {/* 3. ASSET ENROLLMENT SECTION (The Form) */}
        <div style={{ marginBottom: '40px' }}>
            <AssetRegistrationForm 
                onSubmit={handleSubmit} 
                loading={loading} 
            />
        </div>

        {/* 4. ASSET LEDGER REGISTRY (The Table) */}
        <div style={{ marginBottom: '40px' }}>
            <AssetsTable 
                assets={assets} 
                loading={loading} 
                onDelete={handleDelete} 
            />
        </div>

        {/* 5. SYSTEM FOOTER: Left-aligned on mobile ✅ */}
        <footer style={{ 
            marginTop: '60px', 
            paddingTop: '20px', 
            borderTop: '1px solid #e2e8f0',
            textAlign: typeof window !== 'undefined' && window.innerWidth < 768 ? 'left' : 'center'
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
                * Strategic Unit Isolation Protocol: All actions for Unit {selectedSbuId} are cryptographically logged *
            </p>
        </footer>

      </div>
    </div>
  );
}