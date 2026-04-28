// "use client";

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { logoutUser } from '@/utils/auth'; // Secure logout utility ✅

// /**
//  * Sidebar Component (Final Master Version)
//  * Purpose: Centralized navigation map for Vimal ERP.
//  * Logic: Implements module-level visibility and RBAC-based access control.
//  * Update: Added "Team Management" for administrative user control. ✅
//  */
// export default function Sidebar({ canView, userRole }) {
//   const router = useRouter();

//   /**
//    * Function: handleLogout
//    * Purpose: Terminates the session and redirects to the secure login entry.
//    */
//   const handleLogout = () => {
//     if (window.confirm("Security Alert: Confirm session termination and log out?")) {
//         logoutUser(router);
//     }
//   };

//   return (
//     <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col shadow-xl h-screen sticky top-0 z-50">
      
//       {/* BRANDING SECTION */}
//       <div className="mb-8 border-b border-slate-700 pb-4">
//         <h2 className="text-2xl font-black text-blue-400 uppercase tracking-tighter">
//             VIMAL ERP
//         </h2>
//         <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">Enterprise Solution</p>
//       </div>
      
//       <nav className="flex flex-col gap-1 flex-1 overflow-y-auto custom-scrollbar pr-2">
        
//         {/* MAIN DASHBOARD HUB */}
//         <Link href="/" className="bg-blue-600 p-3 rounded-xl font-bold text-white mb-6 text-center shadow-lg shadow-blue-900 hover:bg-blue-700 transition-all text-xs uppercase tracking-widest">
//           Mother Dashboard
//         </Link>
        
//         {/* 1. OPERATIONS: INVENTORY & ASSETS */}
//         {canView('Inventory') && (
//           <>
//             <div className="text-slate-500 text-[10px] uppercase font-black px-2 mt-4 mb-2 tracking-widest">Inventory & Ops</div>
//             <Link href="/inventory" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Stock Intelligence
//             </Link>
//             <Link href="/inventory/procurement" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span> Procurement Hub
//             </Link>
//             <Link href="/inventory/adjustments" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Waste Control
//             </Link>
//             <Link href="/inventory/fixed-assets" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition mb-1">
//               <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> Asset Register
//             </Link>
//           </>
//         )}
        
//         {/* 2. REVENUE: SALES & QUOTATIONS */}
//         {canView('Sales') && (
//           <>
//             <div className="text-slate-500 text-[10px] uppercase font-black px-2 mt-6 mb-2 tracking-widest">Sales & Revenue</div>
//             <Link href="/sales/customers" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Entity Registry
//             </Link>
//             <Link href="/sales/quotes" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Proposals (Quotes)
//             </Link>
//             <Link href="/sales/orders/create" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Create Invoice
//             </Link>
//             <Link href="/sales/orders" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition mb-1">
//               <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full"></span> Sales Ledger
//             </Link>
//           </>
//         )}

//         {/* 3. GROWTH: MARKETING & CRM */}
//         {canView('Marketing') && (
//           <>
//             <div className="text-slate-500 text-[10px] uppercase font-black px-2 mt-6 mb-2 tracking-widest">Marketing CRM</div>
//             <Link href="/marketing/crm" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition mb-1">
//               <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span> Lead Intelligence
//             </Link>
//           </>
//         )}

//         {/* 4. FINANCIAL INTELLIGENCE REPORTS */}
//         <div className="mt-6 mb-2 text-slate-500 text-[10px] uppercase font-black px-2 tracking-widest">Finance & Audit</div>
        
//         <Link href="/finance/expenses" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span> Record Expense
//         </Link>
//         <Link href="/report/profit-loss" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span> P&L Statement
//         </Link>
//         <Link href="/report/balance-sheet" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Balance Sheet
//         </Link>
//         <Link href="/report/cash-flow" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Cash Flow Hub
//         </Link>
//         <Link href="/report/trial-balance" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span> Trial Balance
//         </Link>
//         <Link href="/report/reconciliation" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> Bank Reconcile
//         </Link>
//         <Link href="/report/ar-aging" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> AR Aging (Debt)
//         </Link>
//         <Link href="/report/ap-aging" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> AP Aging (Bills)
//         </Link>
//         <Link href="/report/taxation" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//           <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Taxation Audit
//         </Link>
//         <Link href="/report/sbu-performance" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition mb-1">
//           <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> SBU Analytics
//         </Link>

//         {/* 5. WORKFORCE: HR & PAYROLL */}
//         {canView('HR') && (
//           <>
//             <div className="mt-6 mb-2 text-slate-500 text-[10px] uppercase font-black px-2 tracking-widest">Enterprise HR</div>
//             <Link href="/hr/departments" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span> Departments
//             </Link>
//             <Link href="/hr/employees" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span> Staff Directory
//             </Link>
//             <Link href="/hr/attendance" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span> Attendance Logs
//             </Link>
//             <Link href="/hr/leaves" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span> Leave Manager
//             </Link>
//             <Link href="/hr/payroll" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition mb-1">
//               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Payroll Engine
//             </Link>
//           </>
//         )}

//         {/* 6. SYSTEM ADMINISTRATION (Super Admin Only) ✅ */}
//         {userRole === 1 && (
//           <>
//             <div className="mt-6 mb-2 text-slate-500 text-[10px] uppercase font-black px-2 tracking-widest">System Settings</div>
//             <Link href="/settings/sbus" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Unit Config
//             </Link>
//             {/* NEW: Team Management Link ✅ */}
//             <Link href="/settings/users" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Team Management
//             </Link>
//             <Link href="/settings/pricing" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span> Unit Price Book
//             </Link>
//             <Link href="/settings/api-keys" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Marketplace Keys
//             </Link>
//             <Link href="/settings/api-logs" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> Traffic Audit
//             </Link>
//             <Link href="/settings/audit-logs" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> System Logs
//             </Link>
//             <Link href="/settings/funds" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Fund Manager
//             </Link>
//             <Link href="/settings/currencies" className="p-2.5 hover:bg-slate-800 rounded-md text-slate-300 text-sm flex items-center gap-3 transition">
//               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Exchange Rates
//             </Link>
//           </>
//         )}
//       </nav>

//       {/* TERMINATE SESSION (Logout) ✅ */}
//       <div className="pt-4 mt-2 border-t border-slate-700">
//         <button 
//           onClick={handleLogout}
//           className="w-full p-3 bg-slate-800 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-3 border border-slate-700"
//         >
//           <span>🚪</span> Terminate Session
//         </button>
//       </div>

//       {/* VERSION INFO */}
//       <div className="text-[9px] text-slate-600 pt-4 text-center font-bold italic tracking-tighter">
//         VIMAL ERP ORGANIZATION v3.1.0 <br/> Secure Centralized System ✅
//       </div>
//     </aside>
//   );
// }






"use client";

import { useRouter } from 'next/navigation';
import { logoutUser } from '@/utils/auth'; 
import { HiXMark } from "react-icons/hi2";

// --- MODULAR COMPONENTS IMPORT ---
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';

/**
 * Enterprise Sidebar (Senior Elite - Final Master Precision Edition)
 * Priority: V.I.P (Hand-Cursor & Absolute Stacking)
 * Fix: Added explicit pointer cursor to the Close button and locked the balanced geometry. ✅
 */
export default function Sidebar({ canView, userRole, isOpen, setIsOpen }) {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
        if (window.confirm("Security Alert: Confirm session termination?")) {
            logoutUser(router);
        }
    }
  };

  return (
    <>
      {/* 1. FORCED VIP ENGINE CSS: Absolute Positioning & Device Isolation ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1023px) {
          .sidebar-master-vip {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            height: 100vh !important;
            transform: translateX(-100%) !important;
            z-index: 1000 !important;
          }
          .sidebar-master-vip.is-open-mobile {
            transform: translateX(0) !important;
          }
          /* FORCED BUTTON POSITION: Balanced corner alignment for Mobile ✅ */
          #vimal-close-btn-vip {
            position: absolute !important;
            top: 15px !important;
            right: 4px !important;
            display: flex !important;
            z-index: 1010 !important;
          }
        }
        @media (min-width: 1024px) {
          .mobile-only-vip { display: none !important; }
          .sidebar-master-vip {
            transform: translateX(0) !important;
            position: sticky !important;
            display: flex !important;
          }
        }
      `}} />

      {/* 2. MOBILE OVERLAY (BACKDROP) */}
      {isOpen && (
        <div 
          className="mobile-only-vip fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. MAIN SIDEBAR CONTAINER ✅ */}
      <aside className={`
        sidebar-master-vip
        ${isOpen ? 'is-open-mobile' : ''}
        w-64 h-screen bg-slate-900 text-white p-5 flex flex-col shadow-2xl border-r border-slate-800 transition-transform duration-300 ease-in-out relative
      `}>
        
        {/* --- BALANCED CLOSE TRIGGER (X) ✅ ---
            - cursor-pointer: Hand cursor on hover. ✅
            - border-[1px]: Standard professional thickness.
            - active:scale-90: Tactile feedback on click.
        */}
        <button 
          id="vimal-close-btn-vip"
          onClick={() => setIsOpen(false)}
          style={{ border: '1px solid rgba(255, 255, 255, 0.25)' }}
          className="mobile-only-vip cursor-pointer p-2 bg-slate-900 text-white rounded-xl transition-all active:scale-90 hover:bg-slate-800 shadow-2xl items-center justify-center"
        >
          <HiXMark size={20} />
        </button>

        {/* 1. Branding Identity Module */}
        <div className="shrink-0 pt-2">
          <SidebarHeader />
        </div>
        
        {/* 2. Dynamic RBAC Navigation Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
            <SidebarNav canView={canView} userRole={userRole} />
        </div>

        {/* 3. Session Compliance Module */}
        <div className="shrink-0 pt-4 border-t border-slate-800">
          <SidebarFooter onLogout={handleLogout} />
        </div>

      </aside>
    </>
  );
}