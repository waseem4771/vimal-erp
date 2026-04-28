// "use client";

// export default function ARAging({ reportData }) {
//   if (!reportData) return null;

//   const { summary, details } = reportData;

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* 1. SUMMARY CARDS (Buckets) */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
//         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
//             <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">0-30 Days</p>
//             <p className="text-xl font-black text-emerald-600">${summary.current.toLocaleString()}</p>
//         </div>
//         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
//             <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">31-60 Days</p>
//             <p className="text-xl font-black text-orange-500">${summary.overdue30.toLocaleString()}</p>
//         </div>
//         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
//             <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">61-90 Days</p>
//             <p className="text-xl font-black text-red-500">${summary.overdue60.toLocaleString()}</p>
//         </div>
//         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
//             <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">90+ Days</p>
//             <p className="text-xl font-black text-red-800">${summary.overdue90.toLocaleString()}</p>
//         </div>
//         <div className="bg-slate-900 p-4 rounded-xl shadow-lg text-center">
//             <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Outstanding</p>
//             <p className="text-xl font-black text-white">${summary.total.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* 2. CUSTOMER BREAKDOWN TABLE */}
//       <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
//         <div className="p-4 bg-slate-50 border-b border-slate-200">
//             <h3 className="font-bold text-slate-700 text-sm">Customer-wise Aging Breakdown</h3>
//         </div>
//         <table className="w-full text-left text-sm">
//           <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b">
//             <tr>
//               <th className="p-4">Customer Name</th>
//               <th className="p-4">Current</th>
//               <th className="p-4">31-60 Days</th>
//               <th className="p-4">61-90 Days</th>
//               <th className="p-4">90+ Days</th>
//               <th className="p-4 text-right">Total Balance</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {details.map((cust, index) => (
//               <tr key={index} className="hover:bg-slate-50 transition">
//                 <td className="p-4 font-bold text-slate-700">{cust.name}</td>
//                 <td className="p-4 font-mono text-emerald-600">${cust.current.toLocaleString()}</td>
//                 <td className="p-4 font-mono text-orange-500">${cust.overdue30.toLocaleString()}</td>
//                 <td className="p-4 font-mono text-red-400">${cust.overdue60.toLocaleString()}</td>
//                 <td className="p-4 font-mono text-red-700">${cust.overdue90.toLocaleString()}</td>
//                 <td className="p-4 font-black text-right text-slate-900 border-l bg-slate-50/50">
//                   ${cust.total.toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }