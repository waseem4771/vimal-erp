

"use client";

import { useState, useEffect } from 'react';
import api from '@/utils/axiosConfig'; 
import { useSbu } from '@/context/SbuContext'; 
import VariantRow from './VariantRow'; 
// Icons import fixed here ✅
import { FiPlus, FiBriefcase } from 'react-icons/fi';

/**
 * AddProductForm Component - EXECUTIVE SHARP EDITION
 * Fix: Resolved 'FiPlus is not defined' error. ✅
 * Fix: Button thickness on mobile locked by forcing single-line text and reduced padding. ✅
 * Fix: High-priority Inline Styles for zero-tailwind dependency. ✅
 * Logic: 100% Intact. ✅
 */
export default function AddProductForm({ onProductAdded }) {
  const { selectedSbuId } = useSbu(); 
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    product_type: 'Physical',
    base_price: '',
  });

  const [variants, setVariants] = useState([
    { sku: '', variant_name: '', additional_price: 0 }
  ]);

  const handleMainChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, e) => {
    const updatedVariants = [...variants];
    updatedVariants[index][e.target.name] = e.target.value;
    setVariants(updatedVariants);
  };

  const addVariantRow = () => {
    setVariants([...variants, { sku: '', variant_name: '', additional_price: 0 }]);
  };

  const removeVariantRow = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { 
        ...formData, 
        variants,
        sbu_id: parseInt(selectedSbuId),
        user_id: localStorage.getItem('vimal_user_id') || 1 
      };
      await api.post('/inventory/products', payload);
      alert(`Success: Inventory record initialized for Unit ID ${selectedSbuId}`);
      setFormData({ name: '', description: '', category: '', product_type: 'Physical', base_price: '' });
      setVariants([{ sku: '', variant_name: '', additional_price: 0 }]);
      if (onProductAdded) onProductAdded(); 
    } catch (err) {
      console.error("PRODUCT_ADD_SYNC_ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error: Unauthorized action.");
    } finally {
      setLoading(false);
    }
  };

  // --- Style Constants ---
  const inputStyle = {
    width: '100%',
    padding: isMobile ? '10px' : '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: '600',
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
    display: 'block'
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: isMobile ? '20px' : '35px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* 1. HEADER SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '35px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
        <div style={{ width: '4px', height: '18px', backgroundColor: '#2563eb' }}></div>
        <h2 style={{ fontSize: '13px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Inventory Asset Enrollment
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        
        {/* SECTION 1: CORE INFORMATION */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '15px' : '25px',
          marginBottom: '25px'
        }}>
          <div>
            <label style={labelStyle}>Product Identity Title</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleMainChange} required 
              style={inputStyle} placeholder="e.g. Macbook Pro M3" 
            />
          </div>
          <div>
            <label style={labelStyle}>Market Classification</label>
            <input 
              type="text" name="category" value={formData.category} onChange={handleMainChange}
              style={inputStyle} placeholder="e.g. Computing" 
            />
          </div>
        </div>

        {/* SECTION 2: FINANCIALS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '15px' : '25px',
          marginBottom: '35px'
        }}>
          <div>
            <label style={labelStyle}>Base Rate (USD)</label>
            <input 
              type="number" step="0.01" name="base_price" value={formData.base_price} onChange={handleMainChange} required 
              style={{ ...inputStyle, color: '#2563eb', fontWeight: '900' }} placeholder="0.00" 
            />
          </div>
          <div>
            <label style={labelStyle}>Inventory Asset Type</label>
            <select 
              name="product_type" value={formData.product_type} onChange={handleMainChange}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="Physical">Physical Goods</option>
              <option value="Digital">Digital Services</option>
            </select>
          </div>
        </div>

        {/* SECTION 3: SKU MANAGEMENT */}
        <div style={{ paddingTop: '30px', borderTop: '1px solid #f1f5f9', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <span>📦</span> SKU Configurations
            </h3>
            
            <button 
              type="button" 
              onClick={addVariantRow}
              style={{ 
                backgroundColor: '#f1f5f9', 
                color: '#475569', 
                padding: '4px 10px', 
                border: '1px solid #e2e8f0', 
                fontSize: '8.5px', 
                fontWeight: '900', 
                textTransform: 'uppercase', 
                cursor: 'pointer',
                borderRadius: '0px'
              }}
            >
              + Add New SKU
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {variants.map((variant, index) => (
              <VariantRow 
                key={index}
                index={index}
                variant={variant}
                onVariantChange={handleVariantChange}
                onRemove={removeVariantRow}
                showRemove={variants.length > 1}
              />
            ))}
          </div>
        </div>

        {/* 3. SUBMIT BUTTON - SLIM & FIXED HEIGHT ON MOBILE ✅ */}
        <div style={{ marginTop: '20px' }}>
            <button 
            type="submit" 
            disabled={loading} 
            style={{
                width: '100%',
                backgroundColor: loading ? '#cbd5e1' : '#0f172a',
                color: '#ffffff',
                padding: isMobile ? '10px 8px' : '16px', 
                border: 'none',
                borderRadius: '0px', 
                fontSize: isMobile ? '9px' : '11px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: isMobile ? '0.15em' : '0.25em',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                lineHeight: '1',
                overflow: 'hidden'
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
            >
            <FiPlus size={isMobile ? 12 : 16} />
            <span>{loading ? "AUTHORIZING..." : "Register & Sync Assets"}</span>
            </button>
            <p style={{ marginTop: '15px', fontSize: '8px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.1em' }}>
                * Cryptographic synchronization active for Unit {selectedSbuId} *
            </p>
        </div>
      </form>
    </div>
  );
}