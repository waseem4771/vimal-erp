"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Initialize the Context
const SbuContext = createContext();

/**
 * SbuProvider Component
 * Purpose: Provides a global state for the selected Strategic Business Unit (SBU).
 * Features: Persists the selected SBU ID in local storage to prevent data loss on refresh.
 */
export const SbuProvider = ({ children }) => {
    // Default SBU ID is '1' (or empty string for 'All Units')
    const [selectedSbuId, setSelectedSbuId] = useState('1');

    // Load the saved SBU ID from local storage when the app starts
    useEffect(() => {
        const savedSbu = localStorage.getItem('vimal_selected_sbu');
        if (savedSbu) {
            setSelectedSbuId(savedSbu);
        }
    }, []);

    // Function to update the SBU globally
    const updateSbu = (id) => {
        setSelectedSbuId(id);
        localStorage.setItem('vimal_selected_sbu', id);
    };

    return (
        <SbuContext.Provider value={{ selectedSbuId, updateSbu }}>
            {children}
        </SbuContext.Provider>
    );
};

// Custom Hook for easy access to the SbuContext
export const useSbu = () => {
    const context = useContext(SbuContext);
    if (!context) {
        throw new Error("useSbu must be used within an SbuProvider");
    }
    return context;
};