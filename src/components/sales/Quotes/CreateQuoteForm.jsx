"use client";

import { useState, useEffect } from 'react';
// Professional Icons ✅
import { FiUser, FiCalendar, FiPackage, FiHash, FiLayers } from 'react-icons/fi';

/**
 * Enterprise CreateQuoteForm - EXECUTIVE SHARP EDITION
 * Fix: Select dropdown overflow on mobile resolved using maxWidth and text trimming. ✅
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for reliable rendering. ✅
 * Mobile: Fully responsive stacked layout (Left-Aligned). ✅
 */
export default function CreateQuoteForm({ 
    quoteData, 
    setQuoteData, 
    customers, 
    variants, 
    handleItemChange 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const sectionCardStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '30px 35px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '25px',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden' // Mobile overflow safety ✅
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '100%', // Dropdown ko bahar nikalne se rokta hai ✅
    padding: isMobile ? '10px' : '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '600',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'left' // Strictly Left Aligned ✅
  };

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* 1. SECTION: CLIENT & VALIDITY CONFIGURATION */}
      <div style={sectionCardStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '25px' }}>
          
          {/* Customer Selection */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiUser size={12} /> Target Prospect / Entity</label>
            <select 
              style={{ ...inputStyle, cursor: 'pointer' }}
              value={quoteData.customer_id}
              onChange={(e) => setQuoteData({...quoteData, customer_id: e.target.value})}
              required
            >
              <option value="">-- Choose Registered Prospect --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.customer_name}</option>
              ))}
            </select>
          </div>

          {/* Validity Date */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}><FiCalendar size={12} /> Offer Validity Date</label>
            <input 
              type="date"
              style={inputStyle}
              value={quoteData.valid_until}
              onChange={(e) => setQuoteData({...quoteData, valid_until: e.target.value})}
              required
            />
          </div>

        </div>
      </div>

      {/* 2. SECTION: ITEMIZED PROPOSAL BREAKDOWN */}
      <div style={sectionCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
            <FiLayers style={{ color: '#4f46e5', fontSize: '16px' }} />
            <h3 style={{ ...labelStyle, fontSize: '11px', color: '#64748b', marginBottom: 0 }}>
                Itemized Proposal Breakdown
            </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {quoteData.items.map((item, index) => (
            <div key={index} style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : '2.5fr 1fr 1.2fr', 
                gap: '15px', 
                padding: isMobile ? '15px' : '20px',
                backgroundColor: '#fcfcfd',
                border: '1px solid #f1f5f9',
                boxSizing: 'border-box',
                overflow: 'hidden' // Box isolation ✅
            }}>
              
              {/* Product SKU Selection - Overflow Fix Logic ✅ */}
              <div style={{ textAlign: 'left', width: '100%', overflow: 'hidden' }}>
                <label style={labelStyle}><FiPackage size={12} /> SKU / Inventory Variant</label>
                <select 
                  style={{ ...inputStyle, backgroundColor: '#ffffff' }}
                  value={item.variant_id}
                  onChange={(e) => handleItemChange(index, 'variant_id', e.target.value)}
                  required
                >
                  <option value="">-- Select Inventory SKU --</option>
                  {variants.map(v => {
                    // Mobile par text chota rakha hai taake dropdown bahar na nikle ✅
                    const productName = v.products?.name || "Product";
                    const shortName = isMobile && productName.length > 15 
                      ? productName.substring(0, 12) + "..." 
                      : productName;
                    
                    return (
                      <option key={v.id} value={v.id}>
                        {shortName} ({v.variant_name}) — ${parseFloat(v.selling_price).toLocaleString()}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Quantity Input */}
              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiHash size={12} /> Qty</label>
                <input 
                  type="number" min="1"
                  style={{ ...inputStyle, backgroundColor: '#ffffff', textAlign: 'center' }}
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  required
                />
              </div>

              {/* Individual Item Sub-Total */}
              <div style={{ 
                  textAlign: isMobile ? 'left' : 'right', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  paddingTop: isMobile ? '10px' : '0'
              }}>
                <span style={{ fontSize: '8px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Item Proposal Total
                </span>
                <span style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '950', color: '#0f172a', letterSpacing: '-0.02em' }}>
                  ${(item.quantity * item.unit_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}