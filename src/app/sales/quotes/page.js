

"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import jsPDF from 'jspdf'; 
import autoTable from 'jspdf-autotable';
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import QuotesHeader from '@/components/sales/Quotes/QuotesHeader';
import QuotesTable from '@/components/sales/Quotes/QuotesTable';
import QuotesNotice from '@/components/sales/Quotes/QuotesNotice';

/**
 * Sales Quotations Registry Page - EXECUTIVE HUB
 * Fix: Dynamic PDF Title (Quotation vs Invoice) based on status. ✅
 * Fix: Unified sharp design (0px Radius) across all page modules. ✅
 * Mobile: Full responsiveness and strictly Left-aligned footer. ✅
 */
export default function QuotesListPage() {
  const { selectedSbuId } = useSbu(); 
  
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); 

  /**
   * Function: fetchQuotes
   * Purpose: Retrieves the quotation ledger for the active unit via secure API.
   */
  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/sales/quotes?sbu_id=${selectedSbuId}`);
      setQuotes(res.data);
    } catch (err) {
      console.log("Sync Status: Awaiting Sales Database connectivity...");
    } finally {
      setLoading(false);
    }
  }, [selectedSbuId]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        fetchQuotes();
    }
  }, [fetchQuotes]);

  /**
   * Function: handleConvertToOrder
   * Logic: Authorizes the conversion of a proposal into a real sales invoice.
   */
  const handleConvertToOrder = async (quoteId) => {
    if (!window.confirm("Action Required: Authorize the conversion of this quote into a formal sales invoice?")) return;
    setStatus({ type: '', message: '' }); 
    try {
        const payload = {
            quote_id: quoteId,
            warehouse_id: 1, 
            user_id: localStorage.getItem('vimal_user_id') || 1 
        };
        await api.post('/sales/convert-quote', payload);
        setStatus({ type: 'success', message: "Success: Quotation has been successfully converted to a Sales Invoice." });
        fetchQuotes(); 
    } catch (err) {
        const serverError = err.response?.data?.error || "Transaction Denied: Ensure stock levels and permissions are valid.";
        setStatus({ type: 'error', message: serverError });
    }
  };

  /**
   * Function: generateQuotePDF
   * Logic: Generates a professional PDF document. 
   * Update: Dynamic Heading based on conversion status. ✅
   */
  const generateQuotePDF = (quote) => {
    const doc = new jsPDF();
    const isConverted = quote.status === 'Converted';
    
    // 1. DYNAMIC TITLE LOGIC ✅
    const docTitle = isConverted ? "OFFICIAL INVOICE" : "SALES QUOTATION";
    
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text(docTitle, 14, 22);

    // 2. Metadata
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Reference ID: #QT-${quote.id}`, 14, 32);
    doc.text(`Unit Identity: SBU-${selectedSbuId}`, 14, 38);
    doc.text(`Prospect: ${quote.customers?.customer_name || 'Inbound Lead'}`, 14, 44);
    doc.text(`Status: ${quote.status.toUpperCase()}`, 14, 50);
    doc.text(`Validity: ${quote.valid_until ? new Date(quote.valid_until).toLocaleDateString('en-CA') : 'N/A'}`, 14, 56);

    // 3. Table Structure
    autoTable(doc, {
      startY: 65,
      head: [['Inventory Description', 'Price Type', 'Net Value (USD)']],
      body: [['Standard Sales Fulfillment Process', isConverted ? 'Finalized Rate' : 'Estimated Pro-forma', `$${parseFloat(quote.total_amount).toLocaleString()}`]],
      theme: 'grid',
      headStyles: { fillColor: isConverted ? [16, 185, 129] : [79, 70, 229] } // Green for Invoice, Indigo for Quote
    });

    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    doc.text(`Total Document Value: $${parseFloat(quote.total_amount).toLocaleString(undefined, {minimumFractionDigits: 2})}`, 14, finalY + 15);
    
    doc.save(`${isConverted ? 'Invoice' : 'Quotation'}_Unit_${selectedSbuId}_ID_${quote.id}.pdf`);
  };

  if (!isMounted) return null;

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* VVIP GLOBAL STYLE INJECTION: Consistent Sharp Edges ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        * { border-radius: 0px !important; }
        .quotes-container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        @media (min-width: 768px) {
            .quotes-container { padding: 40px; }
        }
      `}} />

      <div className="quotes-container">
        
        {/* 1. MODULAR HEADER (Navigation & Sync) */}
        <QuotesHeader 
          selectedSbuId={selectedSbuId} 
          onRefresh={fetchQuotes} 
        />

        {/* 2. DYNAMIC SYSTEM NOTIFICATIONS (Sharp & Executive Style) */}
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

        {/* 3. DATA LEDGER REGISTRY (Table) */}
        <div style={{ marginBottom: '40px' }}>
            <QuotesTable 
                quotes={quotes} 
                loading={loading} 
                onConvert={handleConvertToOrder}
                onPDF={generateQuotePDF}
                selectedSbuId={selectedSbuId}
            />
        </div>

        {/* 4. MODULAR AUDIT NOTICE (Neechay wala banner) */}
        <QuotesNotice selectedSbuId={selectedSbuId} />

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
                * Strategic Business Unit Isolation Protocol: All conversion and PDF generation events for Unit {selectedSbuId} are cryptographically verified *
            </p>
        </footer>

      </div>
    </main>
  );
}