
"use client";

import { useState, useEffect } from 'react';
// Real Icons Import ✅
import { FiHome, FiAlertCircle, FiCheckCircle, FiLayers } from 'react-icons/fi';

/**
 * Enterprise Inventory Analytics - EXECUTIVE SHARP EDITION (Fix Version)
 * Fix: Removed 'border' shorthand to resolve Conflict Error. ✅
 * Fix: Real icons and Left-side specific radius (4px). ✅
 * Fix: 6px Left border with individual side borders. ✅
 */
export default function InventoryStats({ stock }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logic calculation (Untouched)
  const totalQuantity = stock.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
  const lowStockItems = stock.filter(
    (item) => (item.quantity || 0) <= (item.safety_stock || 0)
  ).length;

  // --- Theme Constants ---
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: isMobile ? '12px' : '24px',
    marginBottom: '40px',
    width: '100%'
  };

  const cardStyle = (accentColor, isFullWidthMobile = false) => ({
    backgroundColor: '#ffffff',
    padding: isMobile ? '10px 15px' : '20px 30px',
    // --- FIX: Individual borders used to avoid shorthand conflict error --- ✅
    borderTop: '1px solid #f1f5f9',
    borderRight: '1px solid #f1f5f9',
    borderBottom: '1px solid #f1f5f9',
    borderLeft: `6px solid ${accentColor}`, 
    // ----------------------------------------------------------------------
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gridColumn: isMobile && isFullWidthMobile ? 'span 2' : 'auto',
    height: isMobile ? '100px' : '150px',
    position: 'relative',
    overflow: 'hidden'
  });

  const labelStyle = {
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '2px'
  };

  const valueStyle = (color = '#0f172a') => ({
    fontSize: isMobile ? '24px' : '40px',
    fontWeight: '950',
    color: color,
    letterSpacing: '-0.03em',
    lineHeight: '1',
    margin: '4px 0'
  });

  return (
    <div style={containerStyle}>
      
      {/* 1. TOTAL STOCK ASSETS */}
      <div style={cardStyle('#3b82f6')}>
        <span style={labelStyle}>Total Stock Assets</span>
        <h2 style={valueStyle()}>{totalQuantity.toLocaleString()}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
             <FiHome style={{ color: '#3b82f6', fontSize: '12px' }} />
             <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>Warehouse Live</p>
        </div>
      </div>

      {/* 2. STOCK DEPLETION ALERTS */}
      <div style={cardStyle(lowStockItems > 0 ? '#ef4444' : '#10b981')}>
        <span style={labelStyle}>Depletion Alerts</span>
        <h2 style={valueStyle(lowStockItems > 0 ? '#ef4444' : '#10b981')}>{lowStockItems}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            {lowStockItems > 0 ? 
                <FiAlertCircle style={{ color: '#ef4444', fontSize: '12px' }} /> : 
                <FiCheckCircle style={{ color: '#10b981', fontSize: '12px' }} />
            }
            <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
                {lowStockItems > 0 ? 'Critical Action' : 'Inventory Stable'}
            </p>
        </div>
      </div>

      {/* 3. UNIQUE SKU VARIANTS */}
      <div style={cardStyle('#8b5cf6', true)}>
        <span style={labelStyle}>Unique SKU Variants</span>
        <h2 style={valueStyle()}>{stock.length}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <FiLayers style={{ color: '#8b5cf6', fontSize: '12px' }} />
            <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
                Master Catalog Size
            </p>
        </div>
      </div>

    </div>
  );
}