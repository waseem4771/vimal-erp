// "use client";
// import SbuFilter from '@/components/dashboard/SbuFilter/SbuFilter';

// /**
//  * Enterprise DashboardHeader - MOBILE VERSION
//  * High-Priority CSS Fix: Badge forced to absolute Bottom-Right zero pixels. ✅
//  * High-Priority CSS Fix: SBU Filter forced to 0px border-radius (sharp edges). ✅
//  */
// export default function DashboardHeaderMobile({ 
//     selectedSbuId, 
//     updateSbu, 
//     userRole, 
//     sbuBreakdown, 
//     handleHardRefresh 
// }) {
//     return (
//         /* VIP CSS: Header ko 'relative' kiya taake absolute box iske andar kone mein ja sake */
//         <header 
//             style={{ position: 'relative' }} 
//             className="flex flex-col bg-white px-4 py-6 mb-6 shadow-sm border border-slate-200 gap-6 rounded-none w-full overflow-hidden"
//         >
            
//             {/* VVIP CSS INJECTION for Mobile: Ye SbuFilter ke andar har cheez ko sharp (chokor) kar dega ✅ */}
//             <style dangerouslySetInnerHTML={{__html: `
//                 .force-sharp-edges, .force-sharp-edges * {
//                     border-radius: 0px !important;
//                 }
//             `}} />

//             {/* 1. TOP LEFT: Branding & Context */}
//             <div className="flex flex-col items-start w-full">
//                 <h1 className="text-base font-black uppercase text-slate-900 leading-none">
//                     Mother Dashboard
//                 </h1>
//                 <div className="flex items-center gap-1.5 mt-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-blue-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
//                         Context: <span className="text-blue-600 font-black">ID {selectedSbuId || "1"}</span>
//                     </p>
//                 </div>
//             </div>

//             {/* 2. CENTER: SBU Filter */}
//             {userRole === 1 && (
//                 <div className="flex justify-center w-full">
//                     {/* Added 'force-sharp-edges' class here to trigger the injected CSS ✅ */}
//                     <div className="w-full max-w-[280px] force-sharp-edges">
//                         <SbuFilter 
//                             sbuList={sbuBreakdown} 
//                             selectedSbu={selectedSbuId} 
//                             onSbuChange={updateSbu} 
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* 3. BOTTOM RIGHT: High Priority Absolute Box */}
//             <div className="w-full border-t border-slate-200 pt-4 pb-6">
                
//                 {/* 
//                     HIGH PRIORITY CSS: 
//                     'position: absolute', 'right: 0px', 'bottom: 0px'
//                     Ye CSS rules browser ko majboor karte hain ke is box ko bilkul edge par chipkaye! ✅
//                 */}
//                 <div 
//                     style={{ position: 'absolute', right: '0px', bottom: '0px', zIndex: 99 }}
//                     className="flex items-center bg-slate-50 px-4 py-0.5 border-t border-l border-slate-200 shadow-inner rounded-none h-fit"
//                 >
                    
//                     {/* Identity Text Section */}
//                     <div className="flex flex-col leading-none text-right">
                        
//                         {/* Identity */}
//                         <span 
//                             style={{ fontSize: '10px', transform: 'scale(0.80)', transformOrigin: 'right center' }}
//                             className="font-medium text-slate-400 uppercase tracking-tighter inline-block"
//                         >
//                             Identity
//                         </span>

//                         {/* Admin/Manager */}
//                         <span 
//                             style={{ fontSize: '12px', transform: 'scale(0.80)', transformOrigin: 'right center' }}
//                             className="font-bold text-slate-800 uppercase tracking-tight inline-block"
//                         >
//                             {userRole === 1 ? 'Admin' : 'Manager'}
//                         </span>
//                     </div>

//                     {/* Vertical Divider */}
//                     <div className="w-[1px] h-5 bg-slate-300 mx-4"></div>

//                     {/* Refresh Button */}
//                     <button 
//                         onClick={handleHardRefresh} 
//                         className="text-slate-700 hover:text-blue-600 active:scale-90 transition-all flex-shrink-0"
//                     >
//                         <svg 
//                             xmlns="http://www.w3.org/2000/svg" 
//                             className="w-5 h-5" 
//                             fill="none" 
//                             viewBox="0 0 24 24" 
//                             stroke="currentColor"
//                         >
//                             <path 
//                                 strokeLinecap="round" 
//                                 strokeLinejoin="round" 
//                                 strokeWidth={2.5} 
//                                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
//                             />
//                         </svg>
//                     </button>

//                 </div>
//             </div>
//         </header>
//     );
// }





"use client";
import SbuFilter from '@/components/dashboard/SbuFilter/SbuFilter';

/**
 * Enterprise DashboardHeader - MOBILE VERSION
 * High-Priority CSS Fix: Badge forced to absolute Bottom-Right zero pixels with your original design. ✅
 * High-Priority CSS Fix: SBU Filter forced to 0px border-radius (sharp edges). ✅
 */
export default function DashboardHeaderMobile({ 
    selectedSbuId, 
    updateSbu, 
    userRole, 
    sbuBreakdown, 
    handleHardRefresh 
}) {
    return (
        /* VIP CSS: Header ko 'relative' kiya taake absolute box iske andar kone mein ja sake */
        <header 
            style={{ position: 'relative' }} 
            className="flex flex-col bg-white px-4 py-6 mb-6 shadow-sm border border-slate-200 gap-6 rounded-none w-full overflow-hidden"
        >
            
            {/* VVIP CSS INJECTION for Mobile: Ye SbuFilter ke andar har cheez ko sharp (chokor) kar dega ✅ */}
            <style dangerouslySetInnerHTML={{__html: `
                .force-sharp-edges, .force-sharp-edges * {
                    border-radius: 0px !important;
                }
            `}} />

            {/* 1. TOP LEFT: Branding & Context */}
            <div className="flex flex-col items-start w-full">
                <h1 className="text-base font-black uppercase text-slate-900 leading-none">
                    Mother Dashboard
                </h1>
                <div className="flex items-center gap-1.5 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-blue-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Context: <span className="text-blue-600 font-black">ID {selectedSbuId || "1"}</span>
                    </p>
                </div>
            </div>

            {/* 2. CENTER: SBU Filter */}
            {userRole === 1 && (
                <div className="flex justify-center w-full">
                    {/* Added 'force-sharp-edges' class here to trigger the injected CSS ✅ */}
                    <div className="w-full max-w-[280px] force-sharp-edges">
                        <SbuFilter 
                            sbuList={sbuBreakdown} 
                            selectedSbu={selectedSbuId} 
                            onSbuChange={updateSbu} 
                        />
                    </div>
                </div>
            )}

            {/* 3. BOTTOM RIGHT: High Priority Absolute Box (Original Design Preserved ✅) */}
            <div className="w-full border-t border-slate-200 pt-4 pb-6">
                
                <div 
                    style={{ position: 'absolute', right: '0px', bottom: '0px', zIndex: 99 }}
                    className="flex items-center bg-slate-50 px-4 py-0.5 border-t border-l border-slate-200 shadow-inner rounded-none h-fit"
                >
                    
                    {/* Identity Text Section */}
                    <div className="flex flex-col leading-none text-right">
                        
                        {/* Identity */}
                        <span 
                            style={{ fontSize: '10px', transform: 'scale(0.80)', transformOrigin: 'right center' }}
                            className="font-medium text-slate-400 uppercase tracking-tighter inline-block"
                        >
                            Identity
                        </span>

                        {/* Admin/Manager */}
                        <span 
                            style={{ fontSize: '12px', transform: 'scale(0.80)', transformOrigin: 'right center' }}
                            className="font-bold text-slate-800 uppercase tracking-tight inline-block"
                        >
                            {userRole === 1 ? 'Admin' : 'Manager'}
                        </span>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-[1px] h-5 bg-slate-300 mx-4"></div>

                    {/* Refresh Button */}
                    <button 
                        onClick={handleHardRefresh} 
                        className="text-slate-700 hover:text-blue-600 active:scale-90 transition-all flex-shrink-0"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-5 h-5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2.5} 
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                            />
                        </svg>
                    </button>

                </div>
            </div>
        </header>
    );
}