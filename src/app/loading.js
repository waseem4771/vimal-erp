"use client";

import ExecutiveLoader from '@/components/layout/Loader/ExecutiveLoader';

/**
 * Global Route Loading UI - EXECUTIVE SYSTEM OVERLAY
 * Purpose: Provides a professional fallback UI during route transitions.
 * Logic: Utilizes the modular ExecutiveLoader with Full-Page isolation. ✅
 */
export default function Loading() {
  return (
    <main style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#0f172a', // Deep Corporate Slate
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999, // Highest Priority Over Other Elements
        overflow: 'hidden'
    }}>
        
        {/* 
           Using our Custom Loader Component ✅
           - isFullPage: Logic inside component handles the overlay.
           - label: Professional system-sync terminology.
        */}
        <ExecutiveLoader 
            label="Synchronizing System Data" 
            size="large" 
            isFullPage={false} 
        />

        {/* VVIP GRADIENT OVERLAY (Subtle depth) */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none'
        }}></div>

    </main>
  );
}