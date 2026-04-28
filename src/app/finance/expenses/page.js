
"use client";

import { useState, useEffect, useCallback } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 

// MODULAR COMPONENTS IMPORT ✅
import ExpensesHeader from '@/components/finance/ExpensesHeader';
import ExpenseForm from '@/components/finance/ExpenseForm';
import ExpenseTable from '@/components/finance/ExpenseTable';
import ExpenseSecurityNotice from '@/components/finance/ExpenseSecurityNotice';
import ExpenseFooter from '@/components/finance/ExpenseFooter';

/**
 * Expense Management Page - EXECUTIVE MASTER HUB
 * Fix: Unified sharp design (0px Radius) via global injection. ✅
 * Fix: Reliable logic integration with modular UI parts. ✅
 * Mobile: Full responsiveness and strictly Left-aligned footer. ✅
 * Logic: 100% Intact (RBAC-aware API syncing). ✅
 */
export default function ExpensePage() {
    const { selectedSbuId } = useSbu(); 
    
    const [expenses, setExpenses] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    /**
     * Function: fetchExpenses
     * Purpose: Pulls the latest authorized expense records.
     */
    const fetchExpenses = useCallback(async () => {
        if (!selectedSbuId) return;
        setLoading(true);
        try {
            const res = await api.get(`/expenses?sbu_id=${selectedSbuId}`);
            setExpenses(res.data);
        } catch (error) {
            console.error("EXPENSE_SYNC_ERROR: Ledger fetch failed.");
        } finally {
            setLoading(false);
        }
    }, [selectedSbuId]); 

    // Sync detection and data load
    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        
        if (typeof window !== 'undefined') {
            fetchExpenses();
        }
        return () => window.removeEventListener('resize', handleResize);
    }, [fetchExpenses]);

    if (!isMounted) return null;

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
            
            {/* VVIP GLOBAL STYLE INJECTION: Consistent Sharp Edges ✅ */}
            <style dangerouslySetInnerHTML={{__html: `
                * { border-radius: 0px !important; }
                .finance-container {
                    padding: 20px;
                    max-width: 1450px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }
                @media (min-width: 768px) {
                    .finance-container { padding: 40px; }
                }
            `}} />

            <div className="finance-container">
                
                {/* 1. MODULAR HEADER (Title & Refresh) */}
                <ExpensesHeader 
                    selectedSbuId={selectedSbuId} 
                    onRefresh={fetchExpenses} 
                />

                {/* 2. MAIN WORKSPACE GRID */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 2.2fr', // Form Left, Table Right
                    gap: isMobile ? '30px' : '40px',
                    alignItems: 'start'
                }}>
                    
                    {/* LEFT COLUMN: Entry & Security */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Compact Entry Form */}
                        <ExpenseForm onExpenseSaved={fetchExpenses} />
                        
                        {/* Dark Security Status Banner */}
                        <ExpenseSecurityNotice selectedSbuId={selectedSbuId} />
                    </div>

                    {/* RIGHT COLUMN: Transactional Ledger */}
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                        <ExpenseTable 
                            expenses={expenses} 
                            loading={loading} 
                        />
                    </div>

                </div>

                {/* 3. SYSTEM FOOTER: Strictly Left-aligned ✅ */}
                <ExpenseFooter selectedSbuId={selectedSbuId} />

            </div>
        </main>
    );
}