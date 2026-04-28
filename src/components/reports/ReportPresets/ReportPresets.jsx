"use client";

/**
 * ReportPresets Component
 * Purpose: Provides quick-access buttons for standard reporting periods.
 * Requirement: Daily, Weekly, 3 Months, 6 Months, Yearly (Page 1)
 */
export default function ReportPresets({ onPresetChange }) {
    
    // Standard periods as per requirement document
    const presets = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: '3 Months', value: '3months' },
        { label: '6 Months', value: '6months' },
        { label: 'Yearly', value: 'yearly' }
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-[10px] font-black text-gray-400 uppercase flex items-center mr-2 ml-1">
                Quick Filters:
            </span>
            
            {presets.map((item) => (
                <button
                    key={item.value}
                    onClick={() => onPresetChange(item.value)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-blue-600 hover:text-white border border-gray-200 rounded-lg text-xs font-bold transition-all duration-200"
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}