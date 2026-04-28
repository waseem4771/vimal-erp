// "use client";
// import { useState } from 'react';

// export default function AutoProfitShareForm({ sbus, onAutoTransfer }) {
//   const [formData, setFormData] = useState({
//     sbu_id: '',
//     percentage: '10',
//     month: new Date().getMonth() + 1,
//     year: new Date().getFullYear()
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAutoTransfer(formData);
//   };

//   return (
//     <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl mb-10">
//       <div className="flex items-center gap-2 mb-4">
//         <span className="text-xl">🤖</span>
//         <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Automated Profit Sharing</h2>
//       </div>
      
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//         {/* SBU SELECT */}
//         <div>
//           <label className="block text-[10px] font-black text-slate-500 uppercase ml-1 mb-1">Target SBU</label>
//           <select 
//             value={formData.sbu_id} 
//             onChange={(e) => setFormData({...formData, sbu_id: e.target.value})}
//             className="w-full border border-slate-700 p-2 rounded-lg text-sm outline-none bg-slate-800 text-white" required
//           >
//             <option value="">-- Choose Unit --</option>
//             {sbus?.map(sbu => (
//               <option key={sbu.id} value={sbu.id}>{sbu.sbu_name}</option>
//             ))}
//           </select>
//         </div>

//         {/* PERCENTAGE */}
//         <div>
//           <label className="block text-[10px] font-black text-slate-500 uppercase ml-1 mb-1">Share Percentage (%)</label>
//           <input 
//             type="number" min="1" max="100"
//             value={formData.percentage} onChange={(e) => setFormData({...formData, percentage: e.target.value})}
//             className="w-full border border-slate-700 p-2 rounded-lg text-sm outline-none bg-slate-800 text-white" required
//           />
//         </div>

//         {/* MONTH */}
//         <div>
//           <label className="block text-[10px] font-black text-slate-500 uppercase ml-1 mb-1">Select Month</label>
//           <input 
//             type="number" min="1" max="12"
//             value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})}
//             className="w-full border border-slate-700 p-2 rounded-lg text-sm outline-none bg-slate-800 text-white" required
//           />
//         </div>

//         {/* SUBMIT */}
//         <button type="submit" className="bg-emerald-600 text-white p-2 rounded-lg font-bold text-sm hover:bg-emerald-700 transition shadow-lg shadow-emerald-900">
//           Calculate & Transfer
//         </button>
//       </form>

//       <p className="text-[9px] text-slate-500 mt-4 italic">
//         * System will automatically scan the SBU&apos;s P&amp;L for the selected month and execute the profit share.
//       </p>
//     </div>
//   );
// }