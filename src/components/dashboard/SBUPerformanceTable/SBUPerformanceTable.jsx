

"use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise SBUPerformanceTable - VVIP FINAL SCROLLABLE EDITION
 * Fix: Added fixed height with stealth scroll to prevent dashboard growth. ✅
 * Fix: Preserved user's custom inline radius logic exactly as provided. ✅
 * Layout: Mobile padding 20px / Laptop padding 12px (Slim). ✅
 */
export default function SBUPerformanceTable({ breakdownData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Theme Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    // Mobile: 20px top/bottom | Laptop: 12px top/bottom (Slim)
    padding: isMobile ? '20px 15px' : '12px 25px', 
    borderRadius: '0px', 
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden'
  };

  const headerTitleStyle = {
    fontSize: isMobile ? '14px' : '16px',
    fontWeight: '900',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    margin: '0 0 2px 0'
  };

  const headerDescStyle = {
    fontSize: '8px',
    color: '#94a3b8',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: isMobile ? '15px' : '15px'
  };

  const sbuCardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile ? '10px 12px' : '12px 16px', 
    backgroundColor: '#f8fafc',
    // --- PRESERVED: User's original radius logic from inline CSS --- ✅
    borderRadius: isMobile ? '6px' : '10px',
    border: '1px solid #f1f5f9',
    borderLeft: isMobile ? '3px solid #3b82f6' : '5px solid #3b82f6',
    marginBottom: '8px',
    transition: 'all 0.3s ease'
  };

  const statusBadgeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    backgroundColor: '#ecfdf5',
    color: '#10b981',
    padding: isMobile ? '2px 8px' : '3px 10px',
    borderRadius: '4px',
    fontSize: isMobile ? '7px' : '8px',
    fontWeight: '900',
    textTransform: 'uppercase',
    border: '1px solid #d1fae5',
    width: 'fit-content', 
    marginTop: '4px'
  };

  return (
    <div style={containerStyle}>
      
      {/* VVIP CSS INJECTION FOR SUBTLE STEALTH SCROLL ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        .sbu-performance-scroller {
            max-height: ${isMobile ? '320px' : '385px'}; /* Fixed height control */
            overflow-y: auto;
            padding-right: 5px;
        }
        /* Custom Subtle Scrollbar (Hide-hide look) */
        .sbu-performance-scroller::-webkit-scrollbar {
            width: 3px; 
        }
        .sbu-performance-scroller::-webkit-scrollbar-track {
            background: transparent;
        }
        .sbu-performance-scroller::-webkit-scrollbar-thumb {
            background: #e2e8f0; 
            border-radius: 10px;
        }
        .sbu-performance-scroller:hover::-webkit-scrollbar-thumb {
            background: #cbd5e1;
        }
      `}} />

      {/* 1. HEADER */}
      <div>
        <h3 style={headerTitleStyle}>SBU Performance</h3>
        <p style={headerDescStyle}>Unit Revenue Distribution</p>
      </div>

      {/* 2. UNITS LIST (Wrapped in Stealth Scroller) ✅ */}
      <div className="sbu-performance-scroller">
        {breakdownData && breakdownData.length > 0 ? (
          breakdownData.map((sbu, index) => (
            <div key={index} style={sbuCardStyle}>
              {/* Left Side Info */}
              <div style={{ textAlign: 'left' }}>
                <p style={{ 
                    fontSize: isMobile ? '11px' : '13px', 
                    fontWeight: '900', 
                    color: '#334155', 
                    margin: 0, 
                    textTransform: 'uppercase' 
                }}>
                  {sbu.sbu_name}
                </p>
                <p style={{ 
                    fontSize: '8px', 
                    fontWeight: '700', 
                    color: '#cbd5e1', 
                    textTransform: 'uppercase', 
                    marginTop: '1px' 
                }}>
                  Subsidiary
                </p>
              </div>

              {/* Right Side Info */}
              <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-end' 
              }}>
                <p style={{ 
                    fontSize: isMobile ? '13px' : '15px', 
                    fontWeight: '900', 
                    color: '#0f172a', 
                    margin: 0 
                }}>
                  ${parseFloat(sbu.revenue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                
                <div style={statusBadgeStyle}>
                   <span style={{ width: '4px', height: '4px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                   Live
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '20px 0', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontStyle: 'italic' }}>
            No subsidiaries detected.
          </div>
        )}
      </div>

      {/* 3. FOOTER INFO */}
      <div style={{ 
          marginTop: 'auto', 
          paddingTop: '10px', 
          borderTop: '1px solid #f1f5f9', 
          textAlign: isMobile ? 'left' : 'center'
      }}>
        <p style={{ 
            fontSize: '7.5px', 
            color: '#cbd5e1', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            fontStyle: 'italic', 
            margin: 0 
        }}>
          * Real-time organizational data aggregation active *
        </p>
      </div>
    </div>
  );
}