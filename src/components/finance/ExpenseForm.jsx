
"use client";

import { useState, useEffect } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
// Professional Icons for Finance Form ✅
import { FiDollarSign, FiCalendar, FiClipboard, FiCreditCard, FiFilePlus, FiEdit3 } from 'react-icons/fi';

/**
 * Enterprise ExpenseForm - EXECUTIVE SHARP EDITION
 * Fix: Forced 0px Border Radius on all elements. ✅
 * Fix: High-priority Inline Styles for reliable rendering. ✅
 * Mobile: Slim action button and compact stacked layout. ✅
 * Logic: 100% Intact (Multi-part form support). ✅
 */
export default function ExpenseForm({ onExpenseSaved }) {
    const { selectedSbuId } = useSbu(); 
    const [isMobile, setIsMobile] = useState(false);
    
    const [accounts, setAccounts] = useState([]); 
    const [paymentAccounts, setPaymentAccounts] = useState([]); 
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        accountId: '',
        paymentAccountId: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        file: null
    });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        fetchAccounts();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchAccounts = async () => {
        try {
            const res = await api.get('/accounts'); 
            const filteredCategories = res.data.filter(acc => 
                acc.account_type === 'Expense' || acc.account_type === 'Liability'
            );
            setAccounts(filteredCategories);
            const liquidAssets = res.data.filter(acc => 
                acc.account_type === 'Asset' && 
                (acc.account_name.includes('Cash') || acc.account_name.includes('Bank'))
            );
            setPaymentAccounts(liquidAssets);
        } catch (error) {
            console.error("ACCOUNTS_SYNC_ERROR:", error.response?.data || error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('sbu_id', selectedSbuId); 
        data.append('account_id', formData.accountId);
        data.append('payment_account_id', formData.paymentAccountId || 1);
        data.append('amount', formData.amount);
        data.append('description', formData.description);
        data.append('expense_date', formData.date);
        data.append('user_id', localStorage.getItem('vimal_user_id') || 1); 
        if (formData.file) { data.append('invoice', formData.file); }

        try {
            await api.post('/expenses', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            alert(`Success: Financial entry verified and saved for Unit ID ${selectedSbuId}`);
            setFormData({ ...formData, amount: '', description: '', file: null });
            if (onExpenseSaved) onExpenseSaved();
        } catch (error) {
            alert("Error: Unauthorized or Invalid data.");
        } finally {
            setLoading(false);
        }
    };

    // --- Inline Style Constants ---
    const inputStyle = {
        width: '100%',
        padding: isMobile ? '10px' : '12px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        fontSize: isMobile ? '12px' : '13px',
        fontWeight: '600',
        color: '#0f172a',
        outline: 'none',
        borderRadius: '0px', 
        boxSizing: 'border-box'
    };

    const labelStyle = {
        fontSize: '9px',
        fontWeight: '900',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        textAlign: 'left'
    };

    const submitBtnStyle = {
        width: '100%',
        backgroundColor: loading ? '#cbd5e1' : '#2563eb',
        color: '#ffffff',
        // Reduced vertical padding on mobile to prevent thickness ✅
        padding: isMobile ? '11px 0' : '15px 0', 
        border: 'none',
        borderRadius: '0px', 
        fontSize: isMobile ? '10px' : '11px',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        lineHeight: '1',
        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)'
    };

    return (
        <div style={{
            backgroundColor: '#ffffff',
            padding: isMobile ? '20px 15px' : '30px',
            border: '1px solid #f1f5f9',
            borderRadius: '0px', 
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {/* Header Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <FiEdit3 style={{ color: '#2563eb', fontSize: '18px' }} />
                <h3 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                    Authorize New Entry
                </h3>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* Category Selection */}
                <div style={{ textAlign: 'left' }}>
                    <label style={labelStyle}><FiClipboard size={12} /> Reporting Category</label>
                    <select 
                        style={{ ...inputStyle, cursor: 'pointer', fontWeight: '800' }}
                        value={formData.accountId} 
                        onChange={(e) => setFormData({...formData, accountId: e.target.value})} 
                        required
                    >
                        <option value="">-- Choose Account --</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.account_name} ({acc.account_code})</option>
                        ))}
                    </select>
                </div>

                {/* Payment Method */}
                <div style={{ textAlign: 'left' }}>
                    <label style={labelStyle}><FiCreditCard size={12} /> Payment Method</label>
                    <select 
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        value={formData.paymentAccountId} 
                        onChange={(e) => setFormData({...formData, paymentAccountId: e.target.value})} 
                        required
                    >
                        <option value="">-- Select Bank/Cash Account --</option>
                        {paymentAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.account_name}</option>
                        ))}
                    </select>
                </div>

                {/* Amount & Date Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={labelStyle}><FiDollarSign size={12} /> Net Amount</label>
                        <input 
                            type="number" step="0.01" style={{ ...inputStyle, color: '#2563eb', fontWeight: '900' }}
                            value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} required 
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={labelStyle}><FiCalendar size={12} /> Posting Date</label>
                        <input 
                            type="date" style={inputStyle}
                            value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required 
                        />
                    </div>
                </div>

                {/* Memo */}
                <div style={{ textAlign: 'left' }}>
                    <label style={labelStyle}><FiClipboard size={12} /> Audit Memo</label>
                    <input 
                        type="text" placeholder="Description of expenditure..."
                        style={inputStyle} value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    />
                </div>

                {/* Attachment */}
                <div style={{ textAlign: 'left' }}>
                    <label style={labelStyle}><FiFilePlus size={12} /> Digital Receipt</label>
                    <input 
                        type="file" 
                        style={{ ...inputStyle, backgroundColor: '#ffffff', fontSize: '11px', padding: '8px' }}
                        onChange={(e) => setFormData({...formData, file: e.target.files[0]})} 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={submitBtnStyle}
                    onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
                    onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
                >
                    {loading ? "AUTHORIZING..." : "Authorize Financial Entry"}
                </button>
            </form>
        </div>
    );
}