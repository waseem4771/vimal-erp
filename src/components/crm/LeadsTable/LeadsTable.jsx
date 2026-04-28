

"use client";

import { useState, useEffect } from 'react';
// Professional Icons for CRM ✅
import { FiUser, FiMail, FiPhone, FiTarget, FiZap, FiClock } from 'react-icons/fi';

/**
 * Enterprise LeadsTable - EXECUTIVE SHARP EDITION
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Mobile: Stealth horizontal scroll and slim-line status badges. ✅
 * Logic: 100% Intact (Score badges and date formatting). ✅
 */
export default function LeadsTable({ leads, loading }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
        <div className="animate-spin" style={{ display: 'inline-block', height: '32px', width: '32px', border: '4px solid #9333ea', borderRightColor: 'transparent', borderRadius: '50%', marginBottom: '15px' }}></div>
        <p style={{ color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>
          Syncing Authorized Leads Registry...
        </p>
      </div>
    );
  }

  /**
   * Helper: getScoreBadgeStyles
   * Logic: High (80+), Medium (40-79), Low (Under 40)
   */
  const getScoreBadgeStyles = (score) => {
    const base = {
        padding: isMobile ? '2px 6px' : '3px 10px',
        fontSize: isMobile ? '7.5px' : '9px',
        fontWeight: '950',
        textTransform: 'uppercase',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        borderRadius: '0px',
        border: '0.5px solid',
        lineHeight: '1'
    };

    if (score >= 80) return { ...base, backgroundColor: '#fef2f2', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', label: 'Priority' };
    if (score >= 40) return { ...base, backgroundColor: '#eff6ff', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.2)', label: 'Standard' };
    return { ...base, backgroundColor: '#f8fafc', color: '#64748b', borderColor: 'rgba(100, 116, 139, 0.2)', label: 'Routine' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* VVIP CSS INJECTION FOR STEALTH SCROLL & SHARP EDGES ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .leads-table-container * { border-radius: 0px !important; }
        .stealth-scroll::-webkit-scrollbar { display: none !important; }
        .stealth-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .lead-row:hover { background-color: #faf5ff !important; }
      `}} />

      <div className="leads-table-container" style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
        overflow: 'hidden',
        width: '100%'
      }}>
        
        {/* 1. COMPONENT HEADER */}
        <div style={{
          padding: isMobile ? '12px 15px' : '18px 25px',
          backgroundColor: '#0f172a', // Corporate Dark Header
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiTarget style={{ color: '#a855f7', fontSize: '16px' }} />
            <h3 style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Potential Business Leads
            </h3>
          </div>
          <span style={{
            backgroundColor: '#9333ea',
            color: '#ffffff',
            padding: isMobile ? '2px 8px' : '4px 12px',
            fontSize: isMobile ? '7px' : '9px',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}>
            CRM Engine Active
          </span>
        </div>

        {/* 2. RESPONSIVE STEALTH SCROLL TABLE ✅ */}
        <div className="stealth-scroll" style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '800px' : '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle(isMobile, 'left')}>Lead Identity</th>
                <th style={thStyle(isMobile, 'left')}>Contact Details</th>
                <th style={thStyle(isMobile, 'left')}>Inbound Source</th>
                <th style={thStyle(isMobile, 'center')}>Captured Date</th>
                <th style={thStyle(isMobile, 'center')}>Priority Rank</th>
                <th style={thStyle(isMobile, 'right')}>Lead Status</th>
              </tr>
            </thead>
            <tbody>
              {leads && leads.length > 0 ? (
                leads.map((lead) => {
                  const badgeStyles = getScoreBadgeStyles(lead.lead_score);
                  return (
                    <tr key={lead.id} className="lead-row" style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                      
                      {/* 1. Lead Name */}
                      <td style={tdStyle(isMobile)}>
                        <div style={{ fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', fontSize: isMobile ? '11px' : '13.5px' }}>
                          {lead.first_name} {lead.last_name}
                        </div>
                        <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', marginTop: '3px' }}>
                          ID: #{lead.id}
                        </div>
                      </td>

                      {/* 2. Contact Information */}
                      <td style={tdStyle(isMobile)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <FiMail style={{ color: '#9333ea', fontSize: '11px' }} />
                          <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: isMobile ? '10px' : '13px' }}>{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FiPhone style={{ color: '#64748b', fontSize: '11px' }} />
                            <span style={{ color: '#64748b', fontWeight: '600', fontSize: isMobile ? '9px' : '12px' }}>{lead.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* 3. Source Info */}
                      <td style={tdStyle(isMobile)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ fontSize: isMobile ? '9px' : '12px' }}>📡</span>
                          <span style={{ color: '#475569', fontWeight: '700', textTransform: 'uppercase', fontSize: isMobile ? '9.5px' : '12px' }}>
                            {lead.source || 'Direct Hub'}
                          </span>
                        </div>
                      </td>

                      {/* 4. Date */}
                      <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                        <span style={{ color: '#94a3b8', fontWeight: '800', fontSize: isMobile ? '9px' : '11px', textTransform: 'uppercase' }}>
                          {new Date(lead.created_at).toLocaleDateString('en-CA', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </td>

                      {/* 5. Priority Score Badge ✅ */}
                      <td style={{ ...tdStyle(isMobile), textAlign: 'center' }}>
                        <div style={badgeStyles}>
                          <FiZap size={isMobile ? 10 : 12} />
                          {badgeStyles.label} ({lead.lead_score})
                        </div>
                      </td>

                      {/* 6. Current Status Badge ✅ */}
                      <td style={{ ...tdStyle(isMobile), textAlign: 'right' }}>
                        <span style={{
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          padding: isMobile ? '3px 8px' : '4px 14px',
                          fontSize: isMobile ? '8px' : '9.5px',
                          fontWeight: '950',
                          textTransform: 'uppercase',
                          border: '1px solid #e2e8f0',
                          display: 'inline-block',
                          lineHeight: '1'
                        }}>
                          {lead.status}
                        </span>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '80px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    * No potential business leads detected in current ledger *
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER NOTICE ✅ */}
      <div style={{ textAlign: 'left', paddingLeft: '5px' }}>
         <p style={{ fontSize: '8px', color: '#cbd5e1', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', fontStyle: 'italic', margin: 0 }}>
            * Authorized CRM Data Synchronization Active - Strictly Left Aligned *
         </p>
      </div>
    </div>
  );
}

// --- Helper Style Functions ---
const thStyle = (isMobile, align) => ({
  padding: isMobile ? '12px 12px' : '18px 25px',
  fontSize: isMobile ? '8.5px' : '10px',
  fontWeight: '950',
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  textAlign: align,
  borderBottom: '1px solid #f1f5f9',
  backgroundColor: '#fcfcfd'
});

const tdStyle = (isMobile) => ({
  padding: isMobile ? '10px 12px' : '16px 25px', // Reduced vertical padding for slim rows on mobile
  verticalAlign: 'middle'
});