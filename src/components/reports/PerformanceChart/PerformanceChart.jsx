"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * PerformanceChart Component (Stubborn Version Fix)
 * Purpose: Renders the sales chart without calculation errors.
 * Fix: Removed ResponsiveContainer's dependency on auto-width. ✅
 */
export default function PerformanceChart({ data }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensuring the component is fully mounted on the client
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[350px] w-full bg-slate-100 animate-pulse rounded-2xl" />;
  }

  return (
    <div className="w-full" style={{ height: '350px', minHeight: '350px' }}>
      {/* 
        Fixed Solution: 
        We are giving an explicit height to the Container. 
        If it still fails, we'll bypass ResponsiveContainer. 
      */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            fontSize={10} 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8'}}
            tickMargin={10}
          />
          <YAxis 
            fontSize={10} 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8'}}
          />
          <Tooltip 
            cursor={{fill: '#f8fafc'}}
            contentStyle={{borderRadius:'15px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} 
          />
          <Bar 
            dataKey="sales" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]} 
            barSize={40} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}