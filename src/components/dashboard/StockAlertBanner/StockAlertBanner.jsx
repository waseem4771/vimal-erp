


"use client";

import { useState, useEffect } from 'react';
import { FiAlertTriangle, FiArrowRight } from "react-icons/fi";

/**
 * Enterprise StockAlertBanner - VVIP PRECISION EDITION
 * Fix: Slow-motion floating icon animation. ✅
 * Fix: Ultra-subtle background color (Lighter tint). ✅
 * Fix: Reduced vertical padding (Slim design). ✅
 * Fix: Slight radius only on the left side. ✅
 * Fix: Forced single-line title on mobile. ✅
 */
export default function StockAlertBanner({ alerts }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!alerts || alerts.length === 0) return null;

  // --- Inline Styles ---
  const mainContainerStyle = {
    backgroundColor: 'rgba(254, 242, 242, 0.4)', // Bohot hi thorra sa color (Very subtle) ✅
    borderLeft: '5px solid #ef4444',
    borderTop: '1px solid #fee2e2',
    borderRight: '1px solid #fee2e2',
    borderBottom: '1px solid #fee2e2',
    // Padding oopar aur neechay sai kam kar di ✅
    padding: isMobile ? '8px 12px' : '10px 25px', 
    borderTopLeftRadius: '6px', // Siraf left side pai radius ✅
    borderBottomLeftRadius: '6px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(239, 68, 68, 0.02)',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: '10px',
    marginTop: '12px'
  };

  const alertCardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #fee2e2',
    padding: '10px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '0px'
  };

  return (
    <>
      {/* VVIP CSS Injection for Slow Animation ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-slow-float {
          animation: slowFloat 3s ease-in-out infinite;
        }
      `}} />

      <div style={mainContainerStyle}>
        {/* 1. BANNER HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
          {/* Animated Icon ✅ */}
          <div className="animate-slow-float">
            <FiAlertTriangle style={{ color: '#ef4444', fontSize: isMobile ? '16px' : '20px' }} />
          </div>
          
          <h2 style={{ 
            fontSize: isMobile ? '11px' : '13px', 
            fontWeight: '900', 
            color: '#991b1b', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            margin: 0,
            whiteSpace: 'nowrap' // Forced 1 line on Mobile ✅
          }}>
            Critical Inventory Alerts ({alerts.length})
          </h2>
        </div>

        {/* 2. ALERTS GRID */}
        <div style={gridStyle}>
          {alerts.map((item) => (
            <div key={item.id} style={alertCardStyle}>
              <div>
                <p style={{ fontSize: '10.5px', fontWeight: '900', color: '#334155', margin: 0, textTransform: 'uppercase' }}>
                  {item.product_name}
                </p>
                <p style={{ fontSize: '8.5px', fontWeight: '700', color: '#94a3b8', fontFamily: 'monospace', marginTop: '1px' }}>
                  SKU: {item.sku}
                </p>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  backgroundColor: '#fef2f2', 
                  color: '#ef4444', 
                  padding: '1px 6px', 
                  fontSize: '9px', 
                  fontWeight: '900',
                  border: '1px solid #fee2e2'
                }}>
                  {item.quantity} LEFT
                </div>
                <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '700', marginTop: '3px', textTransform: 'uppercase' }}>
                  LIMIT: {item.safety_stock}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. FOOTER ACTION MESSAGE */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          marginTop: '12px', 
          paddingTop: '8px', 
          borderTop: '1px solid rgba(239, 68, 68, 0.1)' 
        }}>
          <FiArrowRight style={{ color: '#f87171', fontSize: '11px' }} />
          <p style={{ 
            fontSize: '8.5px', 
            color: '#f87171', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            fontStyle: 'italic',
            margin: 0 
          }}>
            Immediate action required to avoid stock-out.
          </p>
        </div>
      </div>
    </>
  );
}