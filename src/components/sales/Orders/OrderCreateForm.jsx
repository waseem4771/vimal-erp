
"use client";

import { useState, useEffect } from 'react';
// Professional Icons for Sales Context ✅
import { FiUser, FiPackage, FiHash, FiLayers, FiShield } from 'react-icons/fi';

/**
 * Enterprise OrderCreateForm - EXECUTIVE SHARP EDITION (Tier-Aware)
 * Part 2: Customer Selection & Itemized Sales Breakdown
 * Fix: Integrated Tier visibility in dropdown and selection badge. ✅
 * Fix: Select dropdown overflow on mobile resolved. ✅
 * Style: 100% Sharp (0px Radius) & High-Priority Inline Styles. ✅
 */
export default function OrderCreateForm({ 
    orderData, 
    setOrderData, 
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

  // Find the currently selected customer object to extract Tier information
  const selectedCustomer = customers.find(c => c.id === parseInt(orderData.customer_id));

  // --- Inline Style Constants ---
  const sectionCardStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '30px 35px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '25px',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden'
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '100%',
    padding: isMobile ? '10px' : '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '600',
    color: '#0f172a',
    outline: 'none',
    borderRadius: '0px', 
    boxSizing: 'border-box',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
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
    textAlign: 'left'
  };

  const tierBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    padding: '2px 8px',
    fontSize: '8px',
    fontWeight: '950',
    textTransform: 'uppercase',
    border: '1px solid #dbeafe',
    marginTop: '8px',
    borderRadius: '0px'
  };

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* 1. SECTION: CUSTOMER SELECTION (With Tier Detection) */}
      <div style={sectionCardStyle}>
        <div style={{ textAlign: 'left', width: isMobile ? '100%' : '50%' }}>
          <label style={labelStyle}><FiUser size={12} /> Client / Target Entity</label>
          <select 
            style={{ ...inputStyle, cursor: 'pointer', backgroundColor: '#ffffff' }}
            value={orderData.customer_id}
            onChange={(e) => setOrderData({...orderData, customer_id: e.target.value})}
            required
          >
            <option value="">-- Select Registered Client --</option>
            {customers.map(c => (
              /* Added Tier Name to the dropdown text for better visibility ✅ */
              <option key={c.id} value={c.id}>
                {c.customer_name} [{c.tier || 'Retail'}]
              </option>
            ))}
          </select>

          {/* Tier Feedback Badge: Displays after selection to confirm pricing logic ✅ */}
          {selectedCustomer && (
            <div style={tierBadgeStyle}>
              <FiShield size={10} />
              <span>Active Pricing Tier: {selectedCustomer.tier || 'Retail'}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. SECTION: ITEMIZED SALES BREAKDOWN */}
      <div style={sectionCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' }}>
            <FiLayers style={{ color: '#2563eb', fontSize: '16px' }} />
            <h3 style={{ ...labelStyle, fontSize: '11px', color: '#64748b', marginBottom: 0 }}>
                Itemized Sales Breakdown
            </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {orderData.items.map((item, index) => (
            <div key={index} style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : '2.5fr 1fr 1.2fr', 
                gap: '15px', 
                padding: isMobile ? '15px' : '20px',
                backgroundColor: '#fcfcfd',
                border: '1px solid #f1f5f9',
                boxSizing: 'border-box',
                overflow: 'hidden'
            }}>
              
              {/* Product SKU Selection */}
              <div style={{ textAlign: 'left', width: '100%', overflow: 'hidden' }}>
                <label style={labelStyle}><FiPackage size={12} /> SKU / Inventory Variant</label>
                <select 
                  style={{ ...inputStyle, backgroundColor: '#ffffff' }}
                  value={item.variant_id}
                  onChange={(e) => handleItemChange(index, 'variant_id', e.target.value)}
                  required
                >
                  <option value="">-- Choose Product SKU --</option>
                  {variants.map(v => {
                    const productName = v.products?.name || "Product";
                    const displayName = isMobile 
                        ? `${productName.substring(0, 12)}... | S:${v.stock_levels[0]?.quantity || 0}`
                        : `${productName} (${v.variant_name}) — Stock: ${v.stock_levels[0]?.quantity || 0}`;
                    
                    return (
                      <option key={v.id} value={v.id}>
                        {displayName}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Fulfillment Quantity */}
              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}><FiHash size={12} /> Fulfillment Qty</label>
                <input 
                  type="number" min="1"
                  style={{ ...inputStyle, backgroundColor: '#ffffff', textAlign: 'center', fontWeight: '900' }}
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  required
                />
              </div>

              {/* Unit Sell Price Display (Smart Tier Calculation) */}
              <div style={{ 
                  textAlign: isMobile ? 'left' : 'right', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  paddingTop: isMobile ? '10px' : '0'
              }}>
                <span style={{ fontSize: '8px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>
                    Unit Sell Price
                </span>
                <span style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '950', color: '#2563eb' }}>
                  ${parseFloat(item.unit_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}