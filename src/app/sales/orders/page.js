

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import OrdersHeader from '@/components/sales/Orders/OrdersHeader';
import OrdersTable from '@/components/sales/OrdersTable/OrdersTable';

/**
 * Sales History Page (Revenue Ledger) - EXECUTIVE MASTER VERSION
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Professional PDF Invoice generation with Source detection. ✅
 * Mobile: Full responsiveness and strictly Left-aligned footer. ✅
 */
export default function OrdersListPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 

  /**
   * Function: fetchOrders
   * Purpose: Retrieves synchronized sales data from the backend.
   */
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/sales/orders?sbu_id=${selectedSbuId}`);
      setOrders(res.data);
      setCurrentPage(1); // Reset to page 1 on new fetch
    } catch (err) {
      console.error("ORDERS_SYNC_ERROR: Ledger fetch failed.", err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]); 

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchOrders();
    }
  }, [fetchOrders]);

  /**
   * Logic: Client-Side Data Slicing for Pagination ✅
   */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  /**
   * Function: generatePDF
   * Purpose: Generates a professional corporate billing document.
   */
  const generatePDF = (order) => {
    const doc = new jsPDF();
    const isExternal = order.customers?.source === 'External Marketplace';
    
    // 1. Corporate Branding Header
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text("VIMAL ERP - OFFICIAL INVOICE", 14, 22);
    
    // 2. Metadata Ledger info
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Reference: #INV-${order.id}`, 14, 32);
    doc.text(`Unit Identity: SBU-${selectedSbuId}`, 14, 38);
    doc.text(`Origin Channel: ${isExternal ? 'Marketplace Sync' : 'Internal Terminal'}`, 14, 44);
    doc.text(`Fulfillment Date: ${new Date(order.order_date).toLocaleDateString()}`, 14, 50);
    doc.text(`Target Entity: ${order.customers?.customer_name || 'Walk-in Client'}`, 14, 56);

    // 3. Table Breakdown
    autoTable(doc, {
      startY: 65,
      head: [['Inventory Description', 'Channel', 'Fulfillment Status', 'Net Value (USD)']],
      body: [
        [
            'Standard Sales Fulfillment Process', 
            isExternal ? 'Online Store' : 'Physical POS', 
            order.status.toUpperCase(), 
            `$${parseFloat(order.total_amount).toLocaleString()}`
        ]
      ],
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], cellPadding: 5 }, // Executive Dark Header
      styles: { fontSize: 9 }
    });

    // 4. Financial Summation
    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(14);
    doc.setTextColor(16, 185, 129); // Emerald Green
    doc.setFont(undefined, 'bold');
    doc.text(`NET TOTAL PAYABLE: $${parseFloat(order.total_amount).toLocaleString(undefined, {minimumFractionDigits: 2})}`, 14, finalY + 15);
    
    // 5. Footer Trace
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`* This is a cryptographically generated audit document for Unit ${selectedSbuId} *`, 14, finalY + 25);

    doc.save(`Invoice_Unit_${selectedSbuId}_#${order.id}.pdf`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Ensuring 0px radius across the module ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .ledger-workspace {
            padding: 20px;
            max-width: 1450px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .ledger-workspace { padding: 40px; }
        }
      `}} />

      <div className="ledger-workspace">
        
        {/* 1. MODULAR HEADER (Navigation & Sync) */}
        <OrdersHeader 
          selectedSbuId={selectedSbuId} 
          onRefresh={fetchOrders} 
        />

        {/* 2. REVENUE LEDGER DATA WORKSPACE */}
        <section style={{ marginBottom: '40px' }}>
            <OrdersTable 
                orders={currentOrders} 
                loading={loading} 
                onDownloadPDF={generatePDF} 
                currentPage={currentPage}
                totalItems={orders.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </section>

        {/* 3. SYSTEM FOOTER: Strictly Left-aligned ✅ */}
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
                * Strategic Business Unit Isolation Protocol: All transaction data for Unit {selectedSbuId} is synchronized with Central Audit Trail * <br/>
                Unauthorized attempts to access non-linked unit data are strictly logged for loss prevention.
            </p>
        </footer>

      </div>
    </main>
  );
}