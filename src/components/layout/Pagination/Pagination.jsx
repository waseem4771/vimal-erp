"use client";

/**
 * Reusable Pagination Component (Senior Elite Edge-to-Edge Version)
 * Purpose: Strictly forces Summary to the absolute LEFT and Controls to the absolute RIGHT.
 * Fix: Used explicit justify-self alignment and increased vertical breathing room. ✅
 */
export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    /* 
       OUTER CONTAINER: 
       - W-FULL: Poori width le rha hai.
       - PY-4 to PY-6: Opar-neachy sai box ko mazeed barra/spacious kiya hai ✅
    */
    <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center py-4 md:py-6 gap-6 px-1">
      
      {/* 1. FAR LEFT: Data Summary (Page 1 of 2 | 10 Records Found) ✅ */}
      <div className="justify-self-center md:justify-self-start flex items-center gap-3">
        {/* Sleek Analytics Dot */}
        <div className="hidden md:block w-1 h-5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
        <div className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic whitespace-nowrap leading-none">
          Page <span className="text-blue-600 font-black">{currentPage}</span> of <span className="text-slate-900 font-black">{totalPages}</span> 
          <span className="mx-4 text-slate-200">|</span>
          <span className="text-slate-500 font-black not-italic whitespace-nowrap">{totalItems} Records Found</span>
        </div>
      </div>

      {/* 2. FAR RIGHT: Navigation Controls (Prev, 1, 2, Next) ✅ */}
      <div className="justify-self-center md:justify-self-end flex items-center gap-3 md:gap-5">
        
        {/* PREVIOUS ACTION */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`cursor-pointer px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-90 shadow-sm border ${
            currentPage === 1 
            ? 'bg-slate-50 text-slate-200 border-slate-50 cursor-not-allowed opacity-40' 
            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-xl'
          }`}
        >
          &larr; Prev
        </button>

        {/* ENLARGED PAGE NUMBERS */}
        <div className="flex items-center gap-2 md:gap-3">
            {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                
                // Smart Ellipsis Logic
                if (totalPages > 5 && (pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - currentPage) > 1)) {
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                        return <span key={pageNum} className="text-slate-300 font-black px-1 tracking-tighter">••</span>;
                    }
                    return null;
                }

                return (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`cursor-pointer w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl text-[11px] font-black transition-all duration-300 active:scale-95 flex items-center justify-center border ${
                            currentPage === pageNum 
                            ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200 border-blue-600 ring-4 ring-blue-500/10 scale-110' 
                            : 'bg-white text-slate-400 border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100'
                        }`}
                    >
                        {pageNum}
                    </button>
                );
            })}
        </div>

        {/* NEXT ACTION */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`cursor-pointer px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-90 shadow-sm border ${
            currentPage === totalPages 
            ? 'bg-slate-50 text-slate-200 border-slate-50 cursor-not-allowed opacity-40' 
            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-xl'
          }`}
        >
          Next &rarr;
        </button>

      </div>
    </div>
  );
}




