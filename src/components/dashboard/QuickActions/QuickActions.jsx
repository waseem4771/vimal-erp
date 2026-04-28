

// "use client";
// import Link from 'next/link';

// /**
//  * QuickActions Component (Final Master Version)
//  * Purpose: Provides high-speed shortcut navigation to critical ERP modules.
//  * Features: Conditional rendering based on user permissions (RBAC) and clean professional styling.
//  */
// export default function QuickActions({ canView, userRole }) {
//   return (
//     <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-10 text-center">
//       <h2 className="text-xl font-black mb-8 text-slate-800 tracking-tight text-center uppercase">
//         Operational Intelligence Shortcuts
//       </h2>
      
//       <div className="flex flex-wrap justify-center gap-4">
        
//         {/* --- SALES & REVENUE HUB --- */}
//         {canView('Sales') && (
//           <>
//             <Link href="/sales/orders/create" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 text-sm">
//                 Create New Order
//             </Link>
//             {/* SALES QUOTATION: For Business Proposals ✅ */}
//             <Link href="/sales/quotes/create" style={{ backgroundColor: '#6366f1' }} className="text-white px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-indigo-100 text-sm">
//                 Draft New Quote
//             </Link>
//           </>
//         )}

//         {/* --- FINANCIAL REPORTING SUITE --- */}
//         <Link href="/report/profit-loss" className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 text-sm">
//             Analyze P&L
//         </Link>

//         <Link href="/report/balance-sheet" className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-100 text-sm">
//             View Balance Sheet
//         </Link>

//         <Link 
//           href="/report/cash-flow" 
//           style={{ backgroundColor: '#0095ff' }} 
//           className="text-white px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-blue-200 text-sm"
//         >
//             Cash Flow
//         </Link>

//         <Link href="/report/trial-balance" className="bg-sky-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-sky-700 transition shadow-lg shadow-sky-100 text-sm">
//             Trial Balance
//         </Link>

//         <Link 
//           href="/report/reconciliation" 
//           style={{ backgroundColor: '#e2e8f0' }} 
//           className="text-black px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-slate-200 text-sm"
//         >
//             Bank Reconcile
//         </Link>

//         <Link href="/report/ar-aging" className="bg-rose-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-100 text-sm">
//             AR Aging (Debt)
//         </Link>

//         <Link href="/report/ap-aging" className="bg-red-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-100 text-sm">
//             AP Aging (Bills)
//         </Link>

//         <Link href="/report/taxation" className="bg-amber-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-amber-600 transition shadow-lg shadow-amber-100 text-sm">
//             Taxation Report
//         </Link>

//         <Link href="/report/sbu-performance" className="bg-cyan-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-cyan-700 transition shadow-lg shadow-cyan-100 text-sm">
//             Unit Performance
//         </Link>

//         {/* --- MARKETING & CRM HUB --- */}
//         {canView('Marketing') && (
//           <Link 
//             href="/marketing/crm" 
//             style={{ backgroundColor: '#8b5cf6' }} 
//             className="text-white px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-purple-100 text-sm"
//           >
//               Marketing CRM
//           </Link>
//         )}

//         {/* --- FINANCE & EXPENDITURE HUB --- */}
//         <Link 
//           href="/finance/expenses" 
//           style={{ backgroundColor: '#f59e0b' }} 
//           className="text-white px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-amber-100 text-sm"
//         >
//             Manage Expenses
//         </Link>

//         {/* --- HUMAN RESOURCES (HR) HUB --- */}
//         {canView('HR') && (
//           <>
//             <Link 
//               href="/hr/attendance" 
//               style={{ backgroundColor: '#2dd4bf' }} 
//               className="text-black px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-teal-100 text-sm"
//             >
//                 Mark Attendance
//             </Link>
//             <Link 
//               href="/hr/leaves" 
//               style={{ backgroundColor: '#f472b6' }} 
//               className="text-black px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-pink-100 text-sm"
//             >
//                 Manage Leaves
//             </Link>
//           </>
//         )}

//         {/* --- INVENTORY & OPERATIONS HUB --- */}
//         {canView('Inventory') && (
//           <>
//             <Link 
//               href="/inventory/procurement" 
//               style={{ backgroundColor: '#3b82f6' }} 
//               className="text-white px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-blue-100 text-sm"
//             >
//                 Procurement Hub
//             </Link>
//             <Link href="/inventory/fixed-assets" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 text-sm">
//                 Manage Assets
//             </Link>
//             <Link 
//               href="/inventory/adjustments" 
//               style={{ backgroundColor: '#facc15' }} 
//               className="text-black px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-yellow-200 text-sm"
//             >
//                 Stock Adjustments
//             </Link>
//             <Link href="/inventory" className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition shadow-lg shadow-slate-200 text-sm">
//                 Global Stock
//             </Link>
//           </>
//         )}

//         {/* --- SYSTEM ADMINISTRATION (Level 1 Admin Only) --- */}
//         {userRole === 1 && (
//           <>
//             {/* UNIT CONFIGURATION: SBU Management Hub ✅ */}
//             <Link 
//                 href="/settings/sbus" 
//                 style={{ backgroundColor: '#0f766e' }} 
//                 className="text-white px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-teal-100 text-sm"
//             >
//               Unit Configuration
//             </Link>
//             <Link 
//                 href="/settings/pricing" 
//                 style={{ backgroundColor: '#6366f1' }} 
//                 className="text-white px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-indigo-100 text-sm"
//             >
//               Pricing & Discounts
//             </Link>
//             <Link 
//                 href="/settings/funds" 
//                 style={{ backgroundColor: '#a3e635' }} 
//                 className="text-black px-10 py-4 rounded-2xl font-bold transition shadow-lg shadow-lime-200 text-sm"
//             >
//               Manage Funds
//             </Link>
//             <Link href="/settings/currencies" className="bg-teal-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-100 text-sm">
//               Exchange Rates
//             </Link>
//             <Link href="/settings/api-keys" className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-100 text-sm">
//               API Management
//             </Link>
//             <Link href="/settings/audit-logs" className="bg-slate-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-900 transition shadow-lg shadow-slate-200 text-sm">
//               System Audit
//             </Link>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }









"use client";

import { useState, useEffect } from 'react';
import QuickActionsOperations from './QuickActionsOperations';
import QuickActionsAnalytics from './QuickActionsAnalytics';
import QuickActionsLogistics from './QuickActionsLogistics';

/**
 * Enterprise QuickActions - VVIP MASTER HUB (Ultra Compact Edition)
 * Fix: Reduced vertical height for Laptop (thorra sa) and Mobile (bhooooot thorra sa). ✅
 * Fix: Subtitle left-aligned. ✅
 * Fix: Global Hover-Nudge effect logic. ✅
 */
export default function QuickActions({ canView, userRole }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Master UI Configuration ---
  const containerStyle = {
    backgroundColor: '#ffffff',
    /* 
       Padding Adjustments:
       Laptop: 8px vertical (Chota look)
       Mobile: 9px vertical (Bhooooot thorra sa chota look)
    */
    padding: isMobile ? '9px 10px' : '8px 20px', 
    borderRadius: '0px', 
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
    marginBottom: '30px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    textAlign: 'left',
    // Header ke neechay ka gap bhi kam kar diya ✅
    marginBottom: isMobile ? '8px' : '10px',
    paddingLeft: '5px'
  };

  const titleStyle = {
    fontSize: isMobile ? '16px' : '18px',
    fontWeight: '900',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    margin: 0
  };

  const subtitleStyle = {
    fontSize: isMobile ? '8.5px' : '10px',
    color: '#94a3b8',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginTop: '2px'
  };

  return (
    <div style={containerStyle}>
      
      {/* VVIP HOVER EFFECT INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{__html: `
        .qa-btn-transition {
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out !important;
        }
        .qa-btn-transition:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1) !important;
        }
      `}} />

      {/* --- MASTER HEADER --- */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>Operational Intelligence Shortcuts</h2>
        <p style={subtitleStyle}>High-Speed Navigation Hub</p>
      </div>

      {/* --- SUB-COMPONENTS INTEGRATION --- */}
      {/* Sections ke darmiyan gap 5px se mazeed kam kar ke 3px kar diya taake height save ho ✅ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        
        <QuickActionsOperations canView={canView} />

        <QuickActionsAnalytics canView={canView} />

        <QuickActionsLogistics canView={canView} userRole={userRole} />

      </div>

      {/* --- SYSTEM FOOTER --- */}
      <div style={{ 
        // Footer ka oopar wala gap bhi kam kar diya ✅
        marginTop: '10px', 
        paddingTop: '8px', 
        borderTop: '1px solid #f8fafc', 
        textAlign: 'left',
        paddingLeft: '5px'
      }}>
        <p style={{ 
          fontSize: '7.5px', 
          color: '#cbd5e1', 
          fontWeight: '800', 
          textTransform: 'uppercase', 
          fontStyle: 'italic',
          margin: 0
        }}>
          * Authorized access only - Audit trail synchronization active *
        </p>
      </div>
      
    </div>
  );
}