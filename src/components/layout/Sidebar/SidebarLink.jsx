// "use client";

// import Link from 'next/link';

// /**
//  * SidebarLink Component (Senior Elite - Compact Motion Edition)
//  * Purpose: Handles individual navigation modules with a smooth horizontal push effect.
//  * Fix: Reduced bottom margin on Dashboard button to bring modules closer to the top. ✅
//  */
// export default function SidebarLink({ href, icon: Icon, label, isDashboard = false }) {
  
//   return (
//     <>
//       {/* VIP CSS RULES: Sirf sub-links ke liye, Dashboard ke liye nahi ✅ */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         .sidebar-link-motion {
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
//           display: flex !important;
//           align-items: center !important;
//           white-space: nowrap !important;
//           text-decoration: none !important;
//         }
//         .sidebar-link-motion:hover {
//           padding-left: 24px !important; /* Move 10px to right ✅ */
//           background-color: rgba(30, 41, 59, 0.7) !important;
//         }
//       `}} />

//       {isDashboard ? (
//         /* 1. MOTHER DASHBOARD: Reduced margin-bottom (mb-1) to pull navigation UP ✅ */
//         <div className="px-1 mb-1">
//           <Link
//             href={href}
//             style={{ 
//               border: '0.1px solid rgba(255, 255, 255, 0.15)', 
//               borderRadius: '0px', 
//               backgroundColor: '#0f172a',
//               padding: '12px'
//             }}
//             className="flex items-center justify-center gap-3 font-bold text-slate-300 shadow-xl group cursor-pointer transition-colors duration-300 hover:bg-slate-800 hover:text-white whitespace-nowrap active:scale-95"
//           >
//             {Icon && <Icon className="text-slate-400 group-hover:text-blue-400 transition-colors" size={16} />}
//             <span>{label}</span>
//           </Link>
//         </div>
//       ) : (
//         /* 2. STANDARD MODULE LINKS: With VIP Motion Logic ✅ */
//         <Link 
//           href={href} 
//           style={{ padding: '10px 14px' }}
//           className="sidebar-link-motion flex items-center gap-3 rounded-lg group cursor-pointer"
//         >
//           {Icon && (
//             <Icon 
//               className="text-slate-500 group-hover:text-blue-500 transition-colors duration-300" 
//               size={18} 
//             />
//           )}
//           <span className="text-[13px] font-semibold text-slate-400 group-hover:text-white transition-colors">
//             {label}
//           </span>
//         </Link>
//       )}
//     </>
//   );
// }




"use client";

import Link from 'next/link';

/**
 * SidebarLink Component (Senior Elite - Compact Motion Edition)
 * Purpose: Handles individual navigation modules with a smooth horizontal push effect.
 * Update: Subtly brightened module links (Text & Icons) for better visibility without being too sharp. ✅
 */
export default function SidebarLink({ href, icon: Icon, label, isDashboard = false }) {
  
  return (
    <>
      {/* VIP CSS RULES: Sirf sub-links ke liye, Dashboard ke liye nahi ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-link-motion {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: flex !important;
          align-items: center !important;
          white-space: nowrap !important;
          text-decoration: none !important;
        }
        .sidebar-link-motion:hover {
          padding-left: 24px !important; /* Move 10px to right ✅ */
          background-color: rgba(30, 41, 59, 0.7) !important;
        }
      `}} />

      {isDashboard ? (
        /* 1. MOTHER DASHBOARD: Unchanged (Slate-300/400) ✅ */
        <div className="px-1 mb-1">
          <Link
            href={href}
            style={{ 
              border: '0.1px solid rgba(255, 255, 255, 0.15)', 
              borderRadius: '0px', 
              backgroundColor: '#0f172a',
              padding: '12px'
            }}
            className="flex items-center justify-center gap-3 font-bold text-slate-300 shadow-xl group cursor-pointer transition-colors duration-300 hover:bg-slate-800 hover:text-white whitespace-nowrap active:scale-95"
          >
            {Icon && <Icon className="text-slate-400 group-hover:text-blue-400 transition-colors" size={16} />}
            <span>{label}</span>
          </Link>
        </div>
      ) : (
        /* 2. STANDARD MODULE LINKS: Subtly brightened to Slate-300/400 (Font weight preserved) ✅ */
        <Link 
          href={href} 
          style={{ padding: '10px 14px' }}
          className="sidebar-link-motion flex items-center gap-3 rounded-lg group cursor-pointer"
        >
          {Icon && (
            <Icon 
              className="text-slate-400 group-hover:text-blue-500 transition-colors duration-300" 
              size={18} 
            />
          )}
          <span className="text-[13px] font-semibold text-slate-300 group-hover:text-white transition-colors">
            {label}
          </span>
        </Link>
      )}
    </>
  );
}
