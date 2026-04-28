// "use client";
// import SbuFilter from '@/components/dashboard/SbuFilter/SbuFilter';

// /**
//  * Enterprise DashboardHeader - LAPTOP VERSION (VVIP Precision Edition)
//  * Fixed: Performance icon scaled up properly (Width and Height made proportional). ✅
//  * User's Custom Layout kept 100% Intact. ✅
//  * VIP Fix: High-priority CSS injected to force 0px border-radius on the Filter box. ✅
//  */
// export default function DashboardHeaderLaptop({ 
//     selectedSbuId, 
//     updateSbu, 
//     userRole, 
//     sbuBreakdown, 
//     handleHardRefresh 
// }) {
//     return (
//         <header 
//             style={{ height: '85px', position: 'relative' }}
//             className="mb-10 flex flex-row items-center bg-white px-12 rounded-none shadow-sm border border-slate-200 gap-1 transition-all hover:shadow-md overflow-hidden"
//         >
            
//             {/* VVIP CSS INJECTION: Ye SbuFilter ke andar har cheez ko sharp (chokor) kar dega ✅ */}
//             <style dangerouslySetInnerHTML={{__html: `
//                 .force-sharp-edges, .force-sharp-edges * {
//                     border-radius: 0px !important;
//                 }
//             `}} />

//             {/* 1. BRANDING & CONTEXT IDENTITY (Left Side) */}
//             <div className="flex flex-col shrink-0">
//                 <h1 className="text-[13px] md:text-4xl font-black tracking-tightest uppercase text-slate-900 leading-none">
//                     Mother Dashboard
//                 </h1>
                
//                 {/* Performance Row: Icon size increased & Forced Single Line ✅ */}
//                 <div className="flex flex-row items-center whitespace-nowrap gap-1.5 mt-2">
//                     {/* Yahan Icon ka size 18px x 18px kiya hai taake wo sahi se bara ho ✅ */}
//                     <svg 
//                         xmlns="http://www.w3.org/2000/svg" 
//                         style={{ width: '16px', height: '16px' }}
//                         className="text-blue-600 animate-pulse flex-shrink-0" 
//                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                     <p className="text-[7px] md:text-[11.5px] text-slate-400 font-bold uppercase tracking-widest leading-none whitespace-nowrap">
//                         Performance: <span className="text-blue-600">ID {selectedSbuId || "1"}</span>
//                     </p>
//                 </div>
//             </div>

//             {/* 2. SBU FILTER (User's perfect custom positioning) */}
//             <div 
//                 style={{ marginLeft: '479px', marginRight: 'auto' }} 
//                 className="flex flex-row items-center shrink-0"
//             >
//                 {userRole === 1 && (
//                     <div 
//                         style={{ transform: 'scaleY(0.84)', transformOrigin: 'center' }}
//                         /* Added 'force-sharp-edges' class here to trigger the CSS above ✅ */
//                         className="force-sharp-edges scale-[0.70] md:scale-90 leading-none flex items-center h-fit overflow-hidden font-normal text-slate-300 py-1 rounded-none"
//                     >
//                         <SbuFilter 
//                             sbuList={sbuBreakdown} 
//                             selectedSbu={selectedSbuId} 
//                             onSbuChange={updateSbu} 
//                         />
//                     </div>
//                 )}
//             </div>

//             {/* 3. AUTHENTICATION IDENTITY BADGE (Locked to Full-Bottom & Full-Right) */}
//             <div 
//                 style={{ 
//                     position: 'absolute', 
//                     right: '0', 
//                     bottom: '0', 
//                     zIndex: '50' 
//                 }}
//                 className="flex items-center gap-1.5 md:gap-3 bg-slate-50 py-1 px-4 md:py-1.5 md:px-6 rounded-none border-l border-t border-slate-200 shadow-inner h-fit"
//             >
//                 <div className="flex flex-col leading-none">
//                     <span 
//                         style={{ fontSize: '10px', transform: 'scale(0.85)', transformOrigin: 'right center' }}
//                         className="font-medium text-slate-400 uppercase tracking-tighter inline-block"
//                     >
//                         Identity
//                     </span>

//                     <span 
//                         style={{ fontSize: '12px', transform: 'scale(0.90)', transformOrigin: 'right center' }}
//                         className="font-semibold text-slate-800 uppercase tracking-tight inline-block"
//                     >
//                         {userRole === 1 ? 'Admin' : 'Manager'}
//                     </span>
//                 </div>
                
//                 {/* REFRESH LOGO */}
//                 <button 
//                     onClick={handleHardRefresh} 
//                     className="cursor-pointer group bg-transparent p-1 hover:rotate-180 hover:text-blue-600 transition-all duration-700 active:scale-90"
//                 >
//                     <svg 
//                         xmlns="http://www.w3.org/2000/svg" 
//                         style={{ width: '22px', height: '22px' }} 
//                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                     >
//                         <path 
//                             strokeLinecap="round" 
//                             strokeLinejoin="round" strokeWidth={3} 
//                             d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
//                         />
//                     </svg>
//                 </button>
//             </div>

//         </header>
//     );
// }






"use client";
import SbuFilter from '@/components/dashboard/SbuFilter/SbuFilter';

/**
 * Enterprise DashboardHeader - LAPTOP VERSION (VVIP Precision Edition)
 * Fixed: Performance icon scaled up properly (Width and Height made proportional). ✅
 * User's Custom Layout kept 100% Intact. ✅
 * VIP Fix: High-priority CSS injected to force 0px border-radius on the Filter box. ✅
 * VVIP Tailwind Fix: Forced inline 'flex' and 'justify-between' to stop right-side Identity box from cutting off on production. ✅
 */
export default function DashboardHeaderLaptop({ 
    selectedSbuId, 
    updateSbu, 
    userRole, 
    sbuBreakdown, 
    handleHardRefresh 
}) {
    return (
        <header 
            // VVIP INLINE CSS: Yeh Tailwind ki jagah le ga aur production pe box ko katne se rokega ✅
            style={{ 
                height: '85px', 
                position: 'relative',
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', // Ensures items stay within bounds
                width: '100%', 
                boxSizing: 'border-box'
            }}
            className="mb-10 bg-white px-12 rounded-none shadow-sm border border-slate-200 transition-all hover:shadow-md overflow-hidden"
        >
            
            {/* VVIP CSS INJECTION: Ye SbuFilter ke andar har cheez ko sharp (chokor) kar dega ✅ */}
            <style dangerouslySetInnerHTML={{__html: `
                .force-sharp-edges, .force-sharp-edges * {
                    border-radius: 0px !important;
                }
            `}} />

            {/* 1. BRANDING & CONTEXT IDENTITY (Left Side) */}
            <div className="flex flex-col shrink-0">
                <h1 className="text-[13px] md:text-4xl font-black tracking-tightest uppercase text-slate-900 leading-none">
                    Mother Dashboard
                </h1>
                
                {/* Performance Row: Icon size increased & Forced Single Line ✅ */}
                <div className="flex flex-row items-center whitespace-nowrap gap-1.5 mt-2">
                    {/* Yahan Icon ka size 16px x 16px kiya hai taake wo sahi se bara ho ✅ */}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        style={{ width: '16px', height: '16px' }}
                        className="text-blue-600 animate-pulse flex-shrink-0" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="text-[7px] md:text-[11.5px] text-slate-400 font-bold uppercase tracking-widest leading-none whitespace-nowrap">
                        Performance: <span className="text-blue-600">ID {selectedSbuId || "1"}</span>
                    </p>
                </div>
            </div>

            {/* 2. SBU FILTER (User's perfect custom positioning - NOT MOVED) ✅ */}
            <div 
                style={{ marginLeft: '479px', marginRight: 'auto' }} 
                className="flex flex-row items-center shrink-0"
            >
                {userRole === 1 && (
                    <div 
                        style={{ transform: 'scaleY(0.84)', transformOrigin: 'center' }}
                        /* Added 'force-sharp-edges' class here to trigger the CSS above ✅ */
                        className="force-sharp-edges scale-[0.70] md:scale-90 leading-none flex items-center h-fit overflow-hidden font-normal text-slate-300 py-1 rounded-none"
                    >
                        <SbuFilter 
                            sbuList={sbuBreakdown} 
                            selectedSbu={selectedSbuId} 
                            onSbuChange={updateSbu} 
                        />
                    </div>
                )}
            </div>

            {/* 3. AUTHENTICATION IDENTITY BADGE (Locked to Full-Bottom & Full-Right) */}
            <div 
                style={{ 
                    position: 'absolute', 
                    right: '0', 
                    bottom: '0', 
                    zIndex: '50' 
                }}
                className="flex items-center gap-1.5 md:gap-3 bg-slate-50 py-1 px-4 md:py-1.5 md:px-6 rounded-none border-l border-t border-slate-200 shadow-inner h-fit"
            >
                <div className="flex flex-col leading-none">
                    <span 
                        style={{ fontSize: '10px', transform: 'scale(0.85)', transformOrigin: 'right center' }}
                        className="font-medium text-slate-400 uppercase tracking-tighter inline-block"
                    >
                        Identity
                    </span>

                    <span 
                        style={{ fontSize: '12px', transform: 'scale(0.90)', transformOrigin: 'right center' }}
                        className="font-semibold text-slate-800 uppercase tracking-tight inline-block"
                    >
                        {userRole === 1 ? 'Admin' : 'Manager'}
                    </span>
                </div>
                
                {/* REFRESH LOGO */}
                <button 
                    onClick={handleHardRefresh} 
                    className="cursor-pointer group bg-transparent p-1 hover:rotate-180 hover:text-blue-600 transition-all duration-700 active:scale-90"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        style={{ width: '22px', height: '22px' }} 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" strokeWidth={3} 
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                        />
                    </svg>
                </button>
            </div>

        </header>
    );
}