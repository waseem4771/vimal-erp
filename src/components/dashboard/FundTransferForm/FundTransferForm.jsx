// "use client";
// import { useState } from 'react';

// export default function FundTransferForm({ sbus, onTransferComplete }) {
//   const [formData, setFormData] = useState({
//     sbu_id: '',
//     amount: '',
//     transfer_type: 'Allocation',
//     description: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Main page ke function ko data bhej dena
//     onTransferComplete(formData);
//     setFormData({ ...formData, amount: '', description: '' }); // Reset amount/desc
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-10">
//       <h2 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-widest">Execute Fund Transfer</h2>
      
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//         {/* SBU Select */}
//         <div>
//           <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-1">Select SBU</label>
//           <select 
//             value={formData.sbu_id} 
//             onChange={(e) => setFormData({...formData, sbu_id: e.target.value})}
//             className="w-full border p-2 rounded-lg text-sm outline-none bg-slate-50" required
//           >
//             <option value="">-- Choose Unit --</option>
//             {sbus?.map(sbu => (
//               <option key={sbu.id} value={sbu.id}>{sbu.sbu_name}</option>
//             ))}
//           </select>
//         </div>

//         {/* Transfer Type */}
//         <div>
//           <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-1">Action Type</label>
//           <select 
//             value={formData.transfer_type} 
//             onChange={(e) => setFormData({...formData, transfer_type: e.target.value})}
//             className="w-full border p-2 rounded-lg text-sm outline-none bg-slate-50"
//           >
//             <option value="Allocation">Fund Allocation (+)</option>
//             <option value="Profit_Return">Profit Sharing (-)</option>
//           </select>
//         </div>

//         {/* Amount */}
//         <div>
//           <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-1">Amount ($ / Local)</label>
//           <input 
//             type="number" placeholder="e.g. 5000" 
//             value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}
//             className="w-full border p-2 rounded-lg text-sm outline-none" required
//           />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100">
//           Process Transfer
//         </button>

//         {/* Description (Full Width) */}
//         <div className="md:col-span-4 mt-2">
//            <input 
//             type="text" placeholder="Transfer Description (e.g. Monthly Budget Allocation)" 
//             value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
//             className="w-full border p-2 rounded-lg text-sm outline-none" required
//           />
//         </div>
//       </form>
//     </div>
//   );
// }