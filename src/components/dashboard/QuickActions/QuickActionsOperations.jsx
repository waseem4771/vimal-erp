"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FiPlusCircle, FiFileText, FiUsers, 
  FiDollarSign, FiCheckCircle, FiCalendar, FiBox 
} from 'react-icons/fi';

/**
 * QuickActionsOperations Component - Part 1
 * Fix: Button height reduced to match other sections. ✅
 * Fix: Forced single-line text on mobile to prevent "thick" buttons. ✅
 * Fix: Hover-nudge effect applied. ✅
 */
export default function QuickActionsOperations({ canView }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Inline Style Logic ---
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: isMobile ? '8px' : '12px',
    width: '100%',
    marginBottom: '15px'
  };

  const btnStyle = (bgColor, isDarkText = false) => ({
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    // Padding kam kar di taake size chota ho jaye ✅
    padding: isMobile ? '10px 8px' : '12px 15px', 
    borderRadius: '12px',
    color: isDarkText ? '#1e293b' : '#ffffff',
    fontSize: isMobile ? '9.5px' : '11px',
    fontWeight: '800',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    // Text ko box se bahar ya double line hone se rokne ke liye ✅
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  });

  return (
    <div style={{ width: '100%' }}>
      {/* Container Label - Small & Left Aligned */}
      <p style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'left', paddingLeft: '5px' }}>
         Core Business Operations
      </p>

      <div style={gridStyle}>
        
        {/* --- SALES HUB --- */}
        {canView('Sales') && (
          <>
            <Link href="/sales/orders/create" className="qa-btn-transition" style={btnStyle('#2563eb')}>
              <FiPlusCircle size={16} /> Create Order
            </Link>
            <Link href="/sales/quotes/create" className="qa-btn-transition" style={btnStyle('#4f46e5')}>
              <FiFileText size={16} /> Draft Quote
            </Link>
          </>
        )}

        {/* --- MARKETING HUB --- */}
        {canView('Marketing') && (
          <Link href="/marketing/crm" className="qa-btn-transition" style={btnStyle('#9333ea')}>
            <FiUsers size={16} /> Marketing CRM
          </Link>
        )}

        {/* --- FINANCE HUB --- */}
        <Link href="/finance/expenses" className="qa-btn-transition" style={btnStyle('#f59e0b')}>
          <FiDollarSign size={16} /> Expenses
        </Link>

        {/* --- HR HUB --- */}
        {canView('HR') && (
          <>
            <Link href="/hr/attendance" className="qa-btn-transition" style={btnStyle('#2dd4bf', true)}>
              <FiCheckCircle size={16} /> Attendance
            </Link>
            <Link href="/hr/leaves" className="qa-btn-transition" style={btnStyle('#f472b6', true)}>
              <FiCalendar size={16} /> Manage Leaves
            </Link>
          </>
        )}

        {/* --- INVENTORY CORE --- */}
        {canView('Inventory') && (
          <Link href="/inventory" className="qa-btn-transition" style={btnStyle('#1e293b')}>
            <FiBox size={16} /> Global Stock
          </Link>
        )}

      </div>
    </div>
  );
}