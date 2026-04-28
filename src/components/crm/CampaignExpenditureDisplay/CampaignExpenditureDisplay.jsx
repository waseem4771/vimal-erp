"use client";

import { useState, useEffect } from 'react';
import { FiActivity } from 'react-icons/fi';

/**
 * Enterprise CampaignExpenditureDisplay - EXECUTIVE SLIM EDITION
 * Fix: Reduced vertical padding for Laptop (V. Much) and Mobile (Slightly). ✅
 * Fix: Hidden scrollbar for mobile grid view. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 */
export default function CampaignExpenditureDisplay({ campaigns, selectedSbuId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Constants ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    // Vertical padding reduced: 12px Mobile, 15px Laptop (Slim Look) ✅
    padding: isMobile ? '12px 15px' : '15px 25px',
    border: '1px solid #f1f5f9',
    borderRadius: '0px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden'
  };

  const campaignCardStyle = {
    backgroundColor: '#0f172a', 
    padding: '14px 16px', // Reduced internal padding
    borderLeft: '5px solid #2563eb', 
    borderRadius: '0px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '10px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  };

  const statusBadgeStyle = {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    padding: '2px 8px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    fontSize: '8px',
    fontWeight: '950',
    textTransform: 'uppercase',
    width: 'fit-content'
  };

  return (
    <div style={containerStyle}>
      
      {/* VVIP CSS Injection: Kills the scrollbar visual but keeps scroll active ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        .crm-stealth-scroll::-webkit-scrollbar { display: none !important; }
        .crm-stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}} />

      {/* 1. SECTION HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
        <FiActivity style={{ color: '#2563eb', fontSize: '16px' }} />
        <h2 style={{ fontSize: '12px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Unit Marketing Expenditure
        </h2>
      </div>

      {/* 2. CAMPAIGNS GRID (Stealth Scroll Enabled) ✅ */}
      <div className="crm-stealth-scroll" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '12px',
          flex: 1,
          overflowY: 'auto',
          paddingRight: '2px'
      }}>
        {campaigns && campaigns.length > 0 ? (
          campaigns.map((camp) => (
            <div key={camp.id} style={campaignCardStyle}>
              
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '8.5px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>
                  {camp.campaign_type}
                </p>
                <h4 style={{ fontSize: '12.5px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', marginTop: '3px', marginBottom: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {camp.campaign_name}
                </h4>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={statusBadgeStyle}>
                   {camp.status}
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '15px', fontWeight: '950', color: '#10b981', fontFamily: 'monospace', margin: 0 }}>
                        ${parseFloat(camp.budget).toLocaleString()}
                    </p>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div style={{ gridColumn: 'span 2', padding: '30px 0', textAlign: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic' }}>
            No active campaigns detected.
          </div>
        )}
      </div>

      {/* 3. FOOTER INFO (Strictly Left Aligned) ✅ */}
      <div style={{ marginTop: '10px', textAlign: 'left' }}>
          <p style={{ fontSize: '7.5px', color: '#cbd5e1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
             * Authorized marketing budgets are synchronized with GL *
          </p>
      </div>

    </div>
  );
}