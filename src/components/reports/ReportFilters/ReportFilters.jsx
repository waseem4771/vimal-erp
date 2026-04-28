

"use client";

import { useState } from 'react';
import { getPresetDates } from '@/utils/datePresets';

/**
 * ReportFilters Component - EXECUTIVE BALANCED EDITION
 * Purpose: Quick-access buttons for standard reporting periods.
 * Fix: Boldness reduced to semi-bold (600) for a cleaner professional look. ✅
 * Fix: Handled hover effects via React state for reliable White text. ✅
 * Fix: Forced 0px Border Radius & High-priority Inline Styles. ✅
 */
export default function ReportFilters({ onApply }) {
    // State to track which button is currently hovered
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const presets = [
        { label: 'Today', value: 'daily' },
        { label: 'Last 7 Days', value: 'weekly' },
        { label: 'Last Month', value: 'monthly' },
        { label: '3 Months', value: '3months' },
        { label: '6 Months', value: '6months' },
        { label: '1 Year', value: 'yearly' }
    ];

    const handlePresetClick = (presetValue) => {
        const calculatedDates = getPresetDates(presetValue);
        onApply(calculatedDates); 
    };

    // --- Inline Style Logic ---
    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '20px',
        alignItems: 'center'
    };

    const labelStyle = {
        fontSize: '10px',
        fontWeight: '700', // Reduced from 900
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginRight: '8px'
    };

    const getBtnStyle = (index) => ({
        backgroundColor: hoveredIndex === index ? '#0f172a' : '#ffffff',
        color: hoveredIndex === index ? '#ffffff' : '#475569',
        padding: '7px 12px',
        border: hoveredIndex === index ? '1px solid #0f172a' : '1px solid #e2e8f0',
        borderRadius: '0px', 
        fontSize: '10.5px',
        fontWeight: '600', // Reduced from 800 (Balanced Look) ✅
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        lineHeight: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    return (
        <div style={containerStyle}>
            <span style={labelStyle}>
                Quick Presets:
            </span>
            
            {presets.map((preset, index) => (
                <button
                    key={preset.value}
                    style={getBtnStyle(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handlePresetClick(preset.value)}
                >
                    {preset.label}
                </button>
            ))}
        </div>
    );
}