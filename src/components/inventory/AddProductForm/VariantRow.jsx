"use client";

/**
 * VariantRow Component
 * Purpose: Handles individual SKU variant inputs with high-end responsiveness.
 * Fix: Forced stack layout on mobile (flex-col) to prevent "tang" (cramped) inputs. ✅
 */
export default function VariantRow({ variant, index, onVariantChange, onRemove, showRemove }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-3 items-start md:items-end bg-slate-50 p-5 md:p-4 rounded-2xl border border-slate-200 group transition-all hover:border-blue-300">
      
      {/* 1. UNIQUE SKU CODE */}
      <div className="w-full md:flex-1">
        <label className="text-[9px] font-black text-slate-400 uppercase mb-1.5 block tracking-widest">
          Unique SKU Code
        </label>
        <input 
          type="text" 
          name="sku" 
          value={variant.sku} 
          onChange={(e) => onVariantChange(index, e)} 
          required 
          className="w-full p-3 md:p-2 border border-slate-200 rounded-xl text-sm outline-none bg-white font-mono font-bold focus:ring-2 focus:ring-blue-500 transition-all" 
          placeholder="e.g. DELL-SKU-001" 
        />
      </div>

      {/* 2. VARIANT SPECIFICATIONS */}
      <div className="w-full md:flex-1">
        <label className="text-[9px] font-black text-slate-400 uppercase mb-1.5 block tracking-widest">
          Variant Specifications
        </label>
        <input 
          type="text" 
          name="variant_name" 
          value={variant.variant_name} 
          onChange={(e) => onVariantChange(index, e)} 
          required 
          className="w-full p-3 md:p-2 border border-slate-200 rounded-xl text-sm outline-none bg-white font-medium focus:ring-2 focus:ring-blue-500 transition-all" 
          placeholder="e.g. 16GB RAM / Black" 
        />
      </div>

      {/* 3. ADDITIONAL COST */}
      <div className="w-full md:w-32">
        <label className="text-[9px] font-black text-slate-400 uppercase mb-1.5 block tracking-widest">
          Additional Cost
        </label>
        <input 
          type="number" 
          step="0.01" 
          name="additional_price" 
          value={variant.additional_price} 
          onChange={(e) => onVariantChange(index, e)} 
          className="w-full p-3 md:p-2 border border-slate-200 rounded-xl text-sm outline-none bg-white font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 transition-all" 
          placeholder="0.00" 
        />
      </div>

      {/* 4. REMOVE ACTION (Mobile: Absolute / Desktop: Inline) */}
      {showRemove && (
        <button 
          type="button" 
          onClick={() => onRemove(index)} 
          className="mt-2 md:mt-0 md:mb-1 p-2 text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-all self-end md:self-auto shadow-sm md:shadow-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}