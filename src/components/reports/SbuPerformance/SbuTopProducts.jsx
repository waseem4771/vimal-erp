"use client";

import { useState, useEffect } from 'react';
// Professional Icons for SKU Ranking ✅
import { FiTrendingUp, FiBox, FiDollarSign } from 'react-icons/fi';

/**
 * Enterprise SbuTopProducts - EXECUTIVE SHARP EDITION
 * Purpose: Displays the ranking of top selling products with revenue metrics.
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Mobile: Scalable font sizes and optimized vertical spacing. ✅
 * Style: Clean Slate-50 cards with sharp blue revenue accents. ✅
 */
export default function SbuTopProducts({ topProducts }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: isMobile ? '20px 15px' : '25px 30px',
    border: '1px solid #e2e8f0',
    borderRadius: '0px', // Forced Sharp ✅
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  };

  const sectionTitleStyle = {
    fontSize: isMobile ? '10px' : '11px',
    fontWeight: '950',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '12px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textAlign: 'left'
  };

  const getCardStyle = (index) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile ? '12px' : '15px 20px',
    backgroundColor: hoveredIndex === index ? '#f8fafc' : '#fcfcfd',
    border: `1px solid ${hoveredIndex === index ? '#2563eb' : '#f1f5f9'}`,
    borderRadius: '0px', // Sharp ✅
    transition: 'all 0.2s ease',
    marginBottom: '10px',
    textAlign: 'left'
  });

  const revenueTextStyle = {
    fontSize: isMobile ? '13px' : '15px',
    fontWeight: '950',
    color: '#2563eb', // Executive Blue
    fontFamily: 'monospace',
    lineHeight: '1',
    margin: 0
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. SECTION HEADER ✅ */}
      <h3 style={sectionTitleStyle}>
        <FiTrendingUp style={{ color: '#2563eb' }} />
        Unit Top Selling SKUs
      </h3>

      {/* 2. PRODUCT RANKING LIST ✅ */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {topProducts && topProducts.length > 0 ? (
          topProducts.map((prod, i) => (
            <div 
                key={i} 
                style={getCardStyle(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Left Side: Product Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#cbd5e1' }}>
                    <FiBox size={isMobile ? 18 : 22} />
                </div>
                <div>
                    <p style={{ fontSize: isMobile ? '11px' : '13px', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', margin: 0 }}>
                        {prod.name}
                    </p>
                    <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700', fontFamily: 'monospace', marginTop: '2px', margin: 0 }}>
                        SKU: {prod.sku}
                    </p>
                </div>
              </div>

              {/* Right Side: Financial Stats */}
              <div style={{ textAlign: 'right' }}>
                <p style={revenueTextStyle}>
                    ${parseFloat(prod.revenue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '4px' }}>
                    <span style={{ fontSize: '9px', color: '#64748b', fontWeight: '900', textTransform: 'uppercase' }}>
                        {prod.total_sold}
                    </span>
                    <span style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase' }}>
                        Units Sold
                    </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '80px 0', textAlign: 'center', border: '1px dashed #e2e8f0', borderRadius: '0px' }}>
            <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '600', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                * No sales velocity detected *
            </p>
          </div>
        )}
      </div>

      {/* 3. FOOTER TIP */}
      <div style={{ marginTop: '10px', textAlign: 'left' }}>
          <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
            * Rankings based on gross periodic revenue *
          </p>
      </div>

    </div>
  );
}