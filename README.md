//----------------------------- Frontend --------------------------------------

vimal-erp-frontend/
├── public/                     # Static Branding Assets
│   ├── images-logo/
│   │   ├── logo-erp2.png       # Sidebar & Mobile Logo (HD Glow)
│   │   └── login-page.png      # Login Branding Logo (HD Light)
│   ├── favicon.ico
│   └── (other static assets)
├── src/
│   ├── app/                    # NEXT.JS APP ROUTER (Main Logic)
│   │   ├── layout.js           # Root Layout (Wrapped with SbuProvider)
│   │   ├── page.jsx            # Mother Dashboard Hub (Mesh BG + Widgets)
│   │   ├── loading.js          # Global Executive Full-Page Loader ✅
│   │   ├── not-found.js        # Executive Error Terminal (404 Page) ✅
│   │   ├── middleware.js       # Auth Guard (7-Day Persistent Logic) ✅
│   │   ├── login/
│   │   │   └── page.js         # Split-Screen Login Master Page
│   │   │
│   │   ├── inventory/          # OPERATIONS MODULE
│   │   │   ├── page.js         # Stock Dashboard
│   │   │   ├── fixed-assets/   # Asset Registry Page
│   │   │   │   └── page.js
│   │   │   ├── adjustments/    # Waste Control Page
│   │   │   │   └── page.js
│   │   │   └── procurement/    # Procurement Master Hub
│   │   │       ├── page.js
│   │   │       └── create/     # Requisition Generator Page
│   │   │           └── page.js
│   │   │
│   │   ├── sales/              # REVENUE MODULE
│   │   │   ├── customers/      # Entity Registry Page
│   │   │   │   └── page.js
│   │   │   ├── orders/         # Sales Ledger Master
│   │   │   │   ├── page.js
│   │   │   │   └── create/     # Invoice / POS Generator Page
│   │   │   │       └── page.js
│   │   │   └── quotes/         # Proposal & Conversion Master
│   │   │       ├── page.js
│   │   │       └── create/     # Pro-forma Generator Page
│   │   │           └── page.js
│   │   │
│   │   ├── hr/                 # ENTERPRISE WORKFORCE MODULE
│   │   │   ├── departments/    # Organizational Structure Page
│   │   │   │   └── page.js
│   │   │   ├── employees/      # Staff Directory Page
│   │   │   │   └── page.js
│   │   │   ├── attendance/     # Presence Auditing Page
│   │   │   │   └── page.js
│   │   │   ├── leaves/         # Leave Authorization Page
│   │   │   │   └── page.js
│   │   │   └── payroll/        # Payroll Engine & Analytics Page
│   │   │       └── page.js
│   │   │
│   │   ├── marketing/          # GROWTH MODULE
│   │   │   └── crm/
│   │   │       └── page.js     # Lead Intelligence & Campaigns
│   │   │
│   │   ├── report/             # BUSINESS INTELLIGENCE (BI)
│   │   │   ├── profit-loss/    # P&L Statement Page
│   │   │   ├── balance-sheet/  # Financial Position Page
│   │   │   ├── cash-flow/      # Liquidity Tracker Page
│   │   │   ├── trial-balance/  # Ledger Integrity Audit Page
│   │   │   ├── ar-aging/       # Customer Debt Maturity Page
│   │   │   ├── ap-aging/       # Vendor Liability Maturity Page
│   │   │   ├── taxation/       # Compliance & Tax Audit Page
│   │   │   ├── reconciliation/ # Bank Matching Terminal Page
│   │   │   └── sbu-performance/# Granular Unit Analytics Page
│   │   │
│   │   └── settings/           # SYSTEM & CAPITAL ADMINISTRATION
│   │       ├── sbus/           # Unit Config Hub Page
│   │       ├── users/          # Team & RBAC Management Page
│   │       ├── api-keys/       # Marketplace Gateway Page
│   │       ├── api-logs/       # Traffic Monitoring Page
│   │       ├── currencies/     # Global Exchange Settings Page
│   │       ├── funds/          # Capital Allocation Page
│   │       ├── pricing/        # SBU Price Book Settings Page
│   │       └── audit-logs/     # Org-Wide Security Trail Page
│   │
│   ├── components/             # MODULAR UI ARCHITECTURE (Executive Sharp)
│   │   ├── auth/               # LOGIN COMPONENTS
│   │   │   ├── LoginBranding.jsx # Logo, Slanted ERP, HD Glow
│   │   │   └── LoginForm.jsx    # Glassy Auth, Loading Logic
│   │   ├── layout/             # GLOBAL FRAMEWORK
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.jsx       # Main RBAC Container
│   │   │   │   ├── SidebarHeader.jsx # Glowing Logo Unit
│   │   │   │   ├── SidebarNav.jsx    # Module Navigation Logic
│   │   │   │   ├── SidebarLink.jsx   # Motion-aware Links
│   │   │   │   └── SidebarFooter.jsx # Session Termination
│   │   │   ├── MobileHeader/
│   │   │   │   └── MobileHeader.jsx  # Floating Top Bar (HD Logo)
│   │   │   ├── ExecutiveBackground/
│   │   │   │   └── ExecutiveBackground.jsx # Water Mesh Engine ✅
│   │   │   ├── Loader/
│   │   │   │   └── ExecutiveLoader.jsx # Tech Box-Grid Animation ✅
│   │   │   ├── BackButton/
│   │   │   │   └── BackButton.jsx    # Professional Arrow Back
│   │   │   └── Pagination/
│   │   │       └── Pagination.jsx    # Paginated Controls (7/page) ✅
│   │   ├── dashboard/          # WIDGETS
│   │   │   ├── StatsGrid.jsx        # 4-Column Financial Scorecards
│   │   │   ├── SbuFilter.jsx        # Administrative Context Switcher
│   │   │   ├── MotherCompanyChart.jsx# Bar Visualizer
│   │   │   ├── QuickActions/        # Ops, Analytics, Logistics sub-parts
│   │   │   ├── SBUPerformanceTable.jsx
│   │   │   ├── StockAlertBanner.jsx  # Floating Danger Alerts
│   │   │   └── AuditLogsTable/      # Paginated Log Ledger
│   │   ├── inventory/          # OPERATIONS COMPONENTS
│   │   │   ├── InventoryHeader/
│   │   │   ├── InventoryStats/
│   │   │   ├── StockTable/          # Paginated Inventory Ledger
│   │   │   ├── AddProductForm/      # With VariantRow sub-component
│   │   │   ├── AdjustmentsHeader/
│   │   │   ├── AdjustmentsNotice/
│   │   │   ├── StockAdjustmentForm/
│   │   │   ├── FixedAssets/         # Header, Form, Table
│   │   │   ├── ProcurementHeader/
│   │   │   ├── ProcurementPolicy/
│   │   │   ├── ProcurementTable/    # Threshold-aware Table
│   │   │   └── RequisitionForm/     # Expenditure Generator
│   │   ├── sales/               # REVENUE COMPONENTS
│   │   │   ├── Customers/           # Header, Form, Table
│   │   │   ├── Orders/              # Header, Form, Summary
│   │   │   ├── OrdersTable/         # Paginated Sales Ledger
│   │   │   └── Quotes/              # Header, Form, SummaryBox, Table, Notice
│   │   ├── hr/                  # WORKFORCE COMPONENTS
│   │   │   ├── Departments/         # Header, Registry, Footer
│   │   │   ├── Employees/           # Header, Registry, Footer
│   │   │   ├── Attendance/          # Header, History, Footer
│   │   │   ├── AttendanceForm/      # Daily Entry Interface
│   │   │   ├── ApplyLeaveForm/      # Professional Request Form
│   │   │   ├── LeaveTable/          # Paginated Authorization Ledger
│   │   │   ├── Payroll/             # Header, ControlBar, Ledger, Footer
│   │   │   └── PayrollDeptReport/   # Cost Center Distribution
│   │   ├── crm/                 # MARKETING COMPONENTS
│   │   │   ├── CrmHeader/
│   │   │   ├── LeadsTable/          # Priority-ranked Table
│   │   │   ├── LeadQuickEntryForm/
│   │   │   ├── CampaignForm/        # Budget Allocation Form
│   │   │   └── CampaignExpenditureDisplay.jsx
│   │   ├── reports/             # BI COMPONENTS
│   │   │   ├── ReportFilters/       # Global Preset Engine
│   │   │   ├── PerformanceChart/    # Dynamic Recharts Component
│   │   │   ├── ARAging/             # Header, Cards, Table, Footer
│   │   │   ├── APAging/             # Header, Cards, Table, Footer
│   │   │   ├── TaxationReport/      # Header, FilterBar, Report, Footer
│   │   │   ├── BalanceSheet/        # Header, Filters, Statement, Footer
│   │   │   ├── CashFlowStatement/   # Header, Filters, Statement, Footer
│   │   │   ├── TrialBalance/        # Header, Table, Footer
│   │   │   ├── ReconciliationTable/ # Header, Selector, Table, Footer
│   │   │   └── SbuPerformance/      # Header, TopProducts, RecentActivity, Footer
│   │   └── settings/            # ADMIN COMPONENTS
│   │       ├── ApiKeys/             # Header, Footer (used in page.js)
│   │       ├── ApiKeyManager/       # Secret-Key Masking Table
│   │       ├── ApiLogs/             # Header, Table, Footer
│   │       ├── Currency/            # Header, Footer
│   │       ├── CurrencyTable/       # Inline-editing Rates Table
│   │       ├── Funds/               # Header, Operations, Table, Footer
│   │       └── Pricing/             # Header, Footer
│   │
│   ├── context/
│   │   └── SbuContext.js       # The Global Brain (Unit Persistence)
│   │
│   └── utils/                  # CORE UTILITIES
│       ├── axiosConfig.js      # Secure Client (Automatic x-user-id)
│       ├── auth.js             # Session Cleanup & Terminate Logic
│       ├── datePresets.js      # Fiscal Period Calculator
│       └── exportToExcel.js    # Audit-grade XLSX Generator
│
├── .env.local                  # NEXT_PUBLIC_API_URL Configuration
├── package.json                # Dependencies: axios, recharts, jspdf, xlsx
├── tailwind.config.js          # 0px Radius Global Settings
└── next.config.js              # Environment & Build Optimization