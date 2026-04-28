
// "use client";

// import SidebarLink from './SidebarLink';
// /* Professional Standard Icons Verified for hi2 library ✅ */
// import { 
//   HiOutlineSquares2X2, HiOutlineCube, HiOutlineTruck, HiOutlineArrowPath, 
//   HiOutlineBuildingOffice2, HiOutlineUsers, HiOutlineDocumentText, HiOutlinePlusCircle, 
//   HiOutlineTableCells, HiOutlinePresentationChartLine, HiOutlineWallet, HiOutlineChartPie, 
//   HiOutlineScale, HiOutlineBuildingLibrary, HiOutlineCreditCard, HiOutlineReceiptPercent, 
//   HiOutlineAdjustmentsHorizontal, HiOutlineUserGroup, HiOutlineTag, HiOutlineKey, 
//   HiOutlineCommandLine, HiOutlineClipboardDocumentList, HiOutlineArrowPathRoundedSquare, 
//   HiOutlineCurrencyDollar, HiOutlineCalendarDays, HiOutlineBriefcase, HiOutlineUserPlus, 
//   HiOutlineCalculator, HiOutlineBanknotes,
//   HiOutlineArrowsRightLeft, // Corrected Name for Stock Transfers
//   HiOutlineHomeModern // Added for Warehouse/Site Management ✅
// } from "react-icons/hi2";

// /**
//  * SidebarNav Component (Senior Elite - Micro-Precision MASTER)
//  * Purpose: Centralized high-performance navigation hub.
//  * Fix: Integrated Manage Sites (Warehouses) link for UI-based location entry. ✅
//  */
// export default function SidebarNav({ canView, userRole }) {
//   return (
//     /* Stealth scroll container logic ✅ */
//     <nav className="flex flex-col gap-0 flex-1 overflow-y-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-1 scroll-smooth">
      
//       {/* MASTER CSS INJECTION: Bold Headings & Global Scroll Control ✅ */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         .no-scrollbar::-webkit-scrollbar { display: none !important; }
//         .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        
//         /* Heading Style: Light Tez & Extra Bold ✅ */
//         .nav-section-title {
//           color: #ffffff; 
//           font-size: 11px;
//           text-transform: uppercase;
//           font-weight: 900; 
//           padding: 0 14px;
//           margin-top: 26px;
//           margin-bottom: 10px;
//           letter-spacing: 0.18em;
//           opacity: 0.95;
//           text-shadow: 0 0 1px rgba(255,255,255,0.1);
//         }
//       `}} />

//       {/* --- CORE MODULE: MOTHER DASHBOARD --- */}
//       <SidebarLink 
//         href="/" 
//         label="Mother Dashboard" 
//         icon={HiOutlineSquares2X2} 
//         isDashboard={true} 
//       />
      
//       {/* --- SECTION 1. OPERATIONS (6 LINKS) --- */}
//       {canView('Inventory') && (
//         <>
//           <div className="nav-section-title">Inventory & Ops</div>
//           <SidebarLink href="/inventory" label="Stock Intelligence" icon={HiOutlineCube} />
//           {/* New Warehouse Management Link ✅ */}
//           <SidebarLink href="/inventory/warehouses" label="Manage Sites" icon={HiOutlineHomeModern} />
//           <SidebarLink href="/inventory/transfers" label="Stock Transfers" icon={HiOutlineArrowsRightLeft} />
//           <SidebarLink href="/inventory/procurement" label="Procurement Hub" icon={HiOutlineTruck} />
//           <SidebarLink href="/inventory/adjustments" label="Waste Control" icon={HiOutlineArrowPath} />
//           <SidebarLink href="/inventory/fixed-assets" label="Asset Register" icon={HiOutlineBuildingOffice2} />
//         </>
//       )}
      
//       {/* --- SECTION 2. REVENUE (4 LINKS) --- */}
//       {canView('Sales') && (
//         <>
//           <div className="nav-section-title">Sales & Revenue</div>
//           <SidebarLink href="/sales/customers" label="Entity Registry" icon={HiOutlineUsers} />
//           <SidebarLink href="/sales/quotes" label="Proposals (Quotes)" icon={HiOutlineDocumentText} />
//           <SidebarLink href="/sales/orders/create" label="Create Invoice" icon={HiOutlinePlusCircle} />
//           <SidebarLink href="/sales/orders" label="Sales Ledger" icon={HiOutlineTableCells} />
//         </>
//       )}

//       {/* --- SECTION 3. GROWTH (1 LINK) --- */}
//       {canView('Marketing') && (
//         <>
//           <div className="nav-section-title">Marketing CRM</div>
//           <SidebarLink href="/marketing/crm" label="Lead Intelligence" icon={HiOutlinePresentationChartLine} />
//         </>
//       )}

//       {/* --- SECTION 4. FINANCIAL INTELLIGENCE (10 LINKS) --- */}
//       <div className="nav-section-title">Finance & Audit</div>
//       <SidebarLink href="/finance/expenses" label="Record Expense" icon={HiOutlineWallet} />
//       <SidebarLink href="/report/profit-loss" label="P&L Statement" icon={HiOutlinePresentationChartLine} />
//       <SidebarLink href="/report/balance-sheet" label="Balance Sheet" icon={HiOutlineChartPie} />
//       <SidebarLink href="/report/cash-flow" label="Cash Flow Hub" icon={HiOutlineArrowPathRoundedSquare} />
//       <SidebarLink href="/report/trial-balance" label="Trial Balance" icon={HiOutlineScale} />
//       <SidebarLink href="/report/reconciliation" label="Bank Reconcile" icon={HiOutlineBuildingLibrary} />
//       <SidebarLink href="/report/ar-aging" label="AR Aging (Debt)" icon={HiOutlineCreditCard} />
//       <SidebarLink href="/report/ap-aging" label="AP Aging (Bills)" icon={HiOutlineCalculator} />
//       <SidebarLink href="/report/taxation" label="Taxation Audit" icon={HiOutlineReceiptPercent} />
//       <SidebarLink href="/report/sbu-performance" label="SBU Analytics" icon={HiOutlineAdjustmentsHorizontal} />

//       {/* --- SECTION 5. WORKFORCE (5 LINKS) --- */}
//       {canView('HR') && (
//         <>
//           <div className="nav-section-title">Enterprise HR</div>
//           <SidebarLink href="/hr/departments" label="Departments" icon={HiOutlineBuildingOffice2} />
//           <SidebarLink href="/hr/employees" label="Staff Directory" icon={HiOutlineUserGroup} />
//           <SidebarLink href="/hr/attendance" label="Attendance Logs" icon={HiOutlineCalendarDays} />
//           <SidebarLink href="/hr/leaves" label="Leave Manager" icon={HiOutlineBriefcase} />
//           <SidebarLink href="/hr/payroll" label="Payroll Engine" icon={HiOutlineBanknotes} />
//         </>
//       )}

//       {/* --- SECTION 6. SYSTEM ADMINISTRATION (8 LINKS) --- */}
//       {userRole === 1 && (
//         <>
//           <div className="nav-section-title">System Settings</div>
//           <SidebarLink href="/settings/sbus" label="Unit Config" icon={HiOutlineCube} />
//           <SidebarLink href="/settings/users" label="Team Management" icon={HiOutlineUserPlus} />
//           <SidebarLink href="/settings/pricing" label="Unit Price Book" icon={HiOutlineTag} />
//           <SidebarLink href="/settings/api-keys" label="Marketplace Keys" icon={HiOutlineKey} />
//           <SidebarLink href="/settings/api-logs" label="Traffic Audit" icon={HiOutlineCommandLine} />
//           <SidebarLink href="/settings/audit-logs" label="System Logs" icon={HiOutlineClipboardDocumentList} />
//           <SidebarLink href="/settings/funds" label="Fund Manager" icon={HiOutlineWallet} />
//           <SidebarLink href="/settings/currencies" label="Exchange Rates" icon={HiOutlineCurrencyDollar} />
//         </>
//       )}
//     </nav>
//   );
// }





"use client";

import SidebarLink from './SidebarLink';
/* Professional Standard Icons Verified for hi2 library ✅ */
import { 
  HiOutlineSquares2X2, HiOutlineCube, HiOutlineTruck, HiOutlineArrowPath, 
  HiOutlineBuildingOffice2, HiOutlineUsers, HiOutlineDocumentText, HiOutlinePlusCircle, 
  HiOutlineTableCells, HiOutlinePresentationChartLine, HiOutlineWallet, HiOutlineChartPie, 
  HiOutlineScale, HiOutlineBuildingLibrary, HiOutlineCreditCard, HiOutlineReceiptPercent, 
  HiOutlineAdjustmentsHorizontal, HiOutlineUserGroup, HiOutlineTag, HiOutlineKey, 
  HiOutlineCommandLine, HiOutlineClipboardDocumentList, HiOutlineArrowPathRoundedSquare, 
  HiOutlineCurrencyDollar, HiOutlineCalendarDays, HiOutlineBriefcase, HiOutlineUserPlus, 
  HiOutlineCalculator, HiOutlineBanknotes,
  HiOutlineArrowsRightLeft, 
  HiOutlineHomeModern 
} from "react-icons/hi2";

/**
 * SidebarNav Component (Senior Elite - Micro-Precision MASTER)
 * Purpose: Centralized high-performance navigation hub.
 * Fix: Forced Heading gaps via inline style to prevent production purge. ✅
 */
export default function SidebarNav({ canView, userRole }) {
  
  // Custom style for headers to ensure consistency across environments ✅
  const headerStyle = {
    color: '#ffffff', 
    fontSize: '11px',
    textTransform: 'uppercase',
    fontWeight: '900', 
    padding: '0 14px',
    marginTop: '26px',
    marginBottom: '10px',
    letterSpacing: '0.18em',
    opacity: '0.95',
    textShadow: '0 0 1px rgba(255,255,255,0.1)'
  };

  return (
    <nav className="flex flex-col gap-0 flex-1 overflow-y-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-1 scroll-smooth">
      
      {/* MASTER CSS INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}} />

      {/* --- CORE MODULE: MOTHER DASHBOARD --- */}
      <SidebarLink 
        href="/" 
        label="Mother Dashboard" 
        icon={HiOutlineSquares2X2} 
        isDashboard={true} 
      />
      
      {/* --- SECTION 1. OPERATIONS (6 LINKS) --- */}
      {canView('Inventory') && (
        <>
          <div style={headerStyle}>Inventory & Ops</div>
          <SidebarLink href="/inventory" label="Stock Intelligence" icon={HiOutlineCube} />
          <SidebarLink href="/inventory/warehouses" label="Manage Sites" icon={HiOutlineHomeModern} />
          <SidebarLink href="/inventory/transfers" label="Stock Transfers" icon={HiOutlineArrowsRightLeft} />
          <SidebarLink href="/inventory/procurement" label="Procurement Hub" icon={HiOutlineTruck} />
          <SidebarLink href="/inventory/adjustments" label="Waste Control" icon={HiOutlineArrowPath} />
          <SidebarLink href="/inventory/fixed-assets" label="Asset Register" icon={HiOutlineBuildingOffice2} />
        </>
      )}
      
      {/* --- SECTION 2. REVENUE (4 LINKS) --- */}
      {canView('Sales') && (
        <>
          <div style={headerStyle}>Sales & Revenue</div>
          <SidebarLink href="/sales/customers" label="Entity Registry" icon={HiOutlineUsers} />
          <SidebarLink href="/sales/quotes" label="Proposals (Quotes)" icon={HiOutlineDocumentText} />
          <SidebarLink href="/sales/orders/create" label="Create Invoice" icon={HiOutlinePlusCircle} />
          <SidebarLink href="/sales/orders" label="Sales Ledger" icon={HiOutlineTableCells} />
        </>
      )}

      {/* --- SECTION 3. GROWTH (1 LINK) --- */}
      {canView('Marketing') && (
        <>
          <div style={headerStyle}>Marketing CRM</div>
          <SidebarLink href="/marketing/crm" label="Lead Intelligence" icon={HiOutlinePresentationChartLine} />
        </>
      )}

      {/* --- SECTION 4. FINANCIAL INTELLIGENCE (10 LINKS) --- */}
      <div style={headerStyle}>Finance & Audit</div>
      <SidebarLink href="/finance/expenses" label="Record Expense" icon={HiOutlineWallet} />
      <SidebarLink href="/report/profit-loss" label="P&L Statement" icon={HiOutlinePresentationChartLine} />
      <SidebarLink href="/report/balance-sheet" label="Balance Sheet" icon={HiOutlineChartPie} />
      <SidebarLink href="/report/cash-flow" label="Cash Flow Hub" icon={HiOutlineArrowPathRoundedSquare} />
      <SidebarLink href="/report/trial-balance" label="Trial Balance" icon={HiOutlineScale} />
      <SidebarLink href="/report/reconciliation" label="Bank Reconcile" icon={HiOutlineBuildingLibrary} />
      <SidebarLink href="/report/ar-aging" label="AR Aging (Debt)" icon={HiOutlineCreditCard} />
      <SidebarLink href="/report/ap-aging" label="AP Aging (Bills)" icon={HiOutlineCalculator} />
      <SidebarLink href="/report/taxation" label="Taxation Audit" icon={HiOutlineReceiptPercent} />
      <SidebarLink href="/report/sbu-performance" label="SBU Analytics" icon={HiOutlineAdjustmentsHorizontal} />

      {/* --- SECTION 5. WORKFORCE (5 LINKS) --- */}
      {canView('HR') && (
        <>
          <div style={headerStyle}>Enterprise HR</div>
          <SidebarLink href="/hr/departments" label="Departments" icon={HiOutlineBuildingOffice2} />
          <SidebarLink href="/hr/employees" label="Staff Directory" icon={HiOutlineUserGroup} />
          <SidebarLink href="/hr/attendance" label="Attendance Logs" icon={HiOutlineCalendarDays} />
          <SidebarLink href="/hr/leaves" label="Leave Manager" icon={HiOutlineBriefcase} />
          <SidebarLink href="/hr/payroll" label="Payroll Engine" icon={HiOutlineBanknotes} />
        </>
      )}

      {/* --- SECTION 6. SYSTEM ADMINISTRATION (8 LINKS) --- */}
      {userRole === 1 && (
        <>
          <div style={headerStyle}>System Settings</div>
          <SidebarLink href="/settings/sbus" label="Unit Config" icon={HiOutlineCube} />
          <SidebarLink href="/settings/users" label="Team Management" icon={HiOutlineUserPlus} />
          <SidebarLink href="/settings/pricing" label="Unit Price Book" icon={HiOutlineTag} />
          <SidebarLink href="/settings/api-keys" label="Marketplace Keys" icon={HiOutlineKey} />
          <SidebarLink href="/settings/api-logs" label="Traffic Audit" icon={HiOutlineCommandLine} />
          <SidebarLink href="/settings/audit-logs" label="System Logs" icon={HiOutlineClipboardDocumentList} />
          <SidebarLink href="/settings/funds" label="Fund Manager" icon={HiOutlineWallet} />
          <SidebarLink href="/settings/currencies" label="Exchange Rates" icon={HiOutlineCurrencyDollar} />
        </>
      )}
    </nav>
  );
}