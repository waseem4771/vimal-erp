

"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FiTruck, FiPackage, FiTool, 
  FiSettings, FiTag, FiRefreshCcw, 
  FiKey, FiLock, FiBriefcase,
  FiRepeat // Added for Stock Transfer shortcut ✅
} from 'react-icons/fi';

/**
 * QuickActionsLogistics Component - Part 3
 * Fix: Added Stock Transfer shortcut for high-speed navigation. ✅
 * Fix: Button heights standardized and compact. ✅
 * Fix: Hover-nudge effect enabled via transition class. ✅
 * Fix: Forced single-line text to maintain clean 2x2 mobile grid. ✅
 */
export default function QuickActionsLogistics({ canView, userRole }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Style Logic ---
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(170px, 1fr))',
    gap: isMobile ? '8px' : '12px',
    width: '100%'
  };

  const btnStyle = (color, isDarkText = false) => ({
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    // Reduced padding for uniform height ✅
    padding: isMobile ? '10px 8px' : '12px 15px', 
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: isMobile ? '9.5px' : '11px',
    color: isDarkText ? '#1e293b' : '#ffffff',
    textTransform: 'uppercase',
    textDecoration: 'none',
    letterSpacing: '0.03em',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    // Preventing buttons from becoming "thick" on mobile ✅
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  });

  const labelStyle = {
    fontSize: '10px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '12px',
    textAlign: 'left',
    paddingLeft: '5px'
  };

  return (
    <div style={{ width: '100%' }}>
      
      {/* --- SECTION A: INVENTORY & OPERATIONS --- */}
      {canView('Inventory') && (
        <div style={{ marginBottom: '25px' }}>
          <p style={labelStyle}>Inventory & Operations</p>
          <div style={gridStyle}>
            <Link href="/inventory/procurement" className="qa-btn-transition" style={btnStyle('#3b82f6')}>
              <FiTruck size={16} /> Procurement
            </Link>
            {/* New Stock Transfer Shortcut Added below ✅ */}
            <Link href="/inventory/transfers" className="qa-btn-transition" style={btnStyle('#10b981')}>
              <FiRepeat size={16} /> Stock Transfer
            </Link>
            <Link href="/inventory/fixed-assets" className="qa-btn-transition" style={btnStyle('#4f46e5')}>
              <FiPackage size={16} /> Manage Assets
            </Link>
            <Link href="/inventory/adjustments" className="qa-btn-transition" style={btnStyle('#facc15', true)}>
              <FiTool size={16} /> Stock Adjust
            </Link>
          </div>
        </div>
      )}

      {/* --- SECTION B: SYSTEM ADMINISTRATION (Admin Only) --- */}
      {userRole === 1 && (
        <div style={{ marginBottom: '10px' }}>
          <p style={labelStyle}>Strategic System Settings</p>
          <div style={gridStyle}>
            
            <Link href="/settings/sbus" className="qa-btn-transition" style={btnStyle('#0f766e')}>
              <FiSettings size={16} /> Unit Config
            </Link>

            <Link href="/settings/pricing" className="qa-btn-transition" style={btnStyle('#6366f1')}>
              <FiTag size={16} /> Pricing Hub
            </Link>

            <Link href="/settings/funds" className="qa-btn-transition" style={btnStyle('#a3e635', true)}>
              <FiBriefcase size={16} /> Manage Funds
            </Link>

            <Link href="/settings/currencies" className="qa-btn-transition" style={btnStyle('#0d9488')}>
              <FiRefreshCcw size={16} /> Exch. Rates
            </Link>

            <Link href="/settings/api-keys" className="qa-btn-transition" style={btnStyle('#ea580c')}>
              <FiKey size={16} /> API Gateway
            </Link>

            <Link href="/settings/audit-logs" className="qa-btn-transition" style={btnStyle('#334155')}>
              <FiLock size={16} /> System Audit
            </Link>

          </div>
        </div>
      )}

    </div>
  );
}