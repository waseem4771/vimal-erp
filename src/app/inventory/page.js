

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// Components Import
import InventoryHeader from '@/components/inventory/InventoryHeader/InventoryHeader';
import InventoryStats from '@/components/inventory/InventoryStats/InventoryStats';
import StockTable from '@/components/inventory/StockTable/StockTable';
import AddProductForm from '@/components/inventory/AddProductForm/AddProductForm';

/**
 * Inventory Management Dashboard - EXECUTIVE ELITE EDITION
 * Fix: Added safety check to prevent 500 errors when SBU ID is null. ✅
 * Fix: Unified sharp design (0px Radius) via VVIP CSS Injection. ✅
 * Mobile: Full responsiveness and optimized footer alignment. ✅
 */
export default function InventoryPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Function: fetchStock
   * Fix: Returns early if selectedSbuId is missing to avoid backend crash. ✅
   */
  const fetchStock = useCallback(() => {
    if (!selectedSbuId) {
        setLoading(false);
        return;
    }

    setLoading(true);
    api.get(`/inventory/stock-report?sbu_id=${selectedSbuId}`)
      .then(res => {
        setStock(res.data);
      })
      .catch(err => {
        if (err.response) console.error("INVENTORY_SYNC_ERROR:", err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedSbuId]); 

  // Sync data on load and whenever SBU context updates
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined' && selectedSbuId) {
        fetchStock();
    }
  }, [fetchStock, selectedSbuId]);

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Consistent Sharp Edges ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .inventory-wrapper {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .inventory-wrapper { padding: 40px; }
        }
      `}} />

      <div className="inventory-wrapper">
        
        {/* 1. MODULAR PAGE HEADER */}
        <InventoryHeader 
          selectedSbuId={selectedSbuId} 
          onRefresh={fetchStock} 
        />
        
        {/* 2. ANALYTICS SCORECARDS */}
        <section style={{ marginBottom: '35px' }}>
            <InventoryStats stock={stock} />
        </section>
        
        {/* 3. OPERATIONAL WORKSPACE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            
            {/* PRODUCT REGISTRATION SECTION */}
            <section style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                width: '100%'
            }}>
                <AddProductForm onProductAdded={fetchStock} />
            </section>
            
            {/* LIVE STOCK REPOSITORY TABLE */}
            <section style={{ marginBottom: '30px' }}>
                <StockTable 
                    key={selectedSbuId} 
                    stock={stock} 
                    loading={loading} 
                />
            </section>

        </div>

        {/* 4. SECURITY & COMPLIANCE FOOTER: Strictly Left-aligned ✅ */}
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
                * Data isolation protocols active for Unit {selectedSbuId} * <br />
                All system modifications are logged for security auditing.
            </p>
        </footer>

      </div>
    </main>
  );
}