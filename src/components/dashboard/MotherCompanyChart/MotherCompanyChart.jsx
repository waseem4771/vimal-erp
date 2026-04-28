


"use client";
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiTrendingDown, FiActivity } from "react-icons/fi";

/**
 * Enterprise MotherCompanyChart - COMPACT LAPTOP EDITION
 * Fix: Laptop height reduced from 400px to 340px for a slimmer look. ✅
 * Fix: Header margin-bottom reduced for vertical space saving. ✅
 * Layout: 100% Transparent Root (Single Box Design). ✅
 */
export default function MotherCompanyChart({ chartData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    /* ROOT: Transparent and zero-impact container */
    <div style={{ width: '100%', backgroundColor: 'transparent' }}>
      
      {/* 1. HEADER SECTION */}
      <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center',
          // Laptop margin reduced from 40px to 25px for vertical shrinking ✅
          marginBottom: isMobile ? '20px' : '25px', 
          gap: '15px'
      }}>
          <div style={{ paddingLeft: '5px' }}>
              <h3 style={{ 
                  fontSize: isMobile ? '16px' : '19px', 
                  fontWeight: '900', 
                  color: '#0f172a', 
                  textTransform: 'uppercase', 
                  letterSpacing: '-0.02em',
                  margin: 0
              }}>
                  Financial Momentum
              </h3>
              <div style={{ 
                  fontSize: '10px', 
                  color: '#94a3b8', 
                  fontWeight: '800', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
              }}>
                  <FiActivity style={{ color: '#3b82f6', fontSize: '18px' }} />
                  Monthly Revenue vs Expenses
              </div>
          </div>

          {/* LEGEND */}
          <div style={{ display: 'flex', gap: '25px', paddingRight: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiTrendingUp style={{ color: '#10b981', fontSize: '20px' }} />
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Revenue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiTrendingDown style={{ color: '#f43f5e', fontSize: '20px' }} />
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Expense</span>
              </div>
          </div>
      </div>

      {/* 2. CHART AREA */}
      <div style={{ 
          width: '100%', 
          // Laptop height reduced from 400px to 340px (Thorray size mein chota) ✅
          height: isMobile ? '250px' : '360px', 
          position: 'relative'
      }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={chartData || []} 
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                
                <XAxis 
                    dataKey="month" 
                    axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                    tickLine={{ stroke: '#94a3b8', strokeWidth: 2 }}
                    tickSize={6}
                    fontSize={11} 
                    fontWeight={800}
                    tick={{fill: '#94a3b8'}}
                    dy={5}
                />
                
                <YAxis 
                    axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                    tickLine={{ stroke: '#94a3b8', strokeWidth: 2 }}
                    tickSize={6}
                    fontSize={10} 
                    fontWeight={800}
                    tick={{fill: '#94a3b8'}}
                    tickFormatter={(val) => `$${val}`}
                    dx={-5}
                />
                
                <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
                        fontSize: '11px',
                        fontWeight: '900',
                        textTransform: 'uppercase'
                    }}
                />

                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={isMobile ? 12 : 30} />
                <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={isMobile ? 12 : 30} />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
}