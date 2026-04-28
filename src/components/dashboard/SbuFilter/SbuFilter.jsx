"use client";

export default function SbuFilter({ sbuList, selectedSbu, onSbuChange }) {
  return (
    <div className="flex flex-col bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm">
      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-1">
        Filter Business Unit
      </label>
      <select 
        value={selectedSbu} 
        onChange={(e) => onSbuChange(e.target.value)}
        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-blue-600 outline-none cursor-pointer hover:border-blue-300 transition-all"
      >
        <option value="">All Businesses (Consolidated)</option>
        {sbuList && sbuList.map(sbu => (
          <option key={sbu.id} value={sbu.id}>
            {sbu.sbu_name}
          </option>
        ))}
      </select>
    </div>
  );
}