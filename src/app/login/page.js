

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axiosConfig'; 

// MODULAR COMPONENTS IMPORT ✅
import LoginBranding from '@/components/auth/LoginBranding';
import LoginForm from '@/components/auth/LoginForm';
import ExecutiveLoader from '@/components/layout/Loader/ExecutiveLoader';
import ExecutiveBackground from '@/components/layout/ExecutiveBackground/ExecutiveBackground'; 

/**
 * Login Page - EXECUTIVE PARTIAL-MESH EDITION
 * Purpose: Professional split-screen with dynamic background restricted to the form area.
 * Fix: Left side remains solid #2563eb. ✅
 * Fix: Right side (Form) hosts the ExecutiveBackground water mesh. ✅
 * Mobile: Perfectly responsive stacked layout. ✅
 * Logic: 7-Day Session Persistence included. ✅
 */
export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);

        const userId = typeof window !== 'undefined' ? localStorage.getItem('vimal_user_id') : null;
        if (userId) {
            router.replace('/'); 
        }
        return () => window.removeEventListener('resize', handleResize);
    }, [router]);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            localStorage.clear(); 
            document.cookie = "vimal_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

            const res = await api.post('/auth/login', credentials);
            
            if (res.data.success) {
                const { user } = res.data;
                localStorage.setItem('vimal_user_id', user.id);
                localStorage.setItem('vimal_user_role', user.role_id);
                localStorage.setItem('vimal_selected_sbu', user.sbu_id || '1');

                document.cookie = `vimal_session=true; path=/; max-age=604800; SameSite=Lax`;
                router.push('/');
            }
        } catch (err) {
            const message = err.response?.data?.error || "Access Denied: Invalid Credentials";
            setErrorMsg(message);
            setLoading(false);
        }
    };

    if (!isMounted) return null;

    // --- Dynamic Inline Styles ---
    const mainRootStyle = {
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        overflowX: 'hidden',
        boxSizing: 'border-box'
    };

    const brandingSideStyle = {
        flex: isMobile ? 'none' : '1.2',
        backgroundColor: '#2563eb', // SOLID BLUE (No Mesh) ✅
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: isMobile ? 'auto' : '100vh',
        width: '100%',
        position: 'relative',
        zIndex: 10
    };

    const formSideStyle = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '20px' : '0 60px',
        backgroundColor: '#ffffff', 
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative', // Required to contain the BG ✅
        overflow: 'hidden',   // Clips the BG to this side only ✅
        zIndex: 5
    };

    return (
        <main style={mainRootStyle}>
            
            {/* 0. DYNAMIC LOADER OVERLAY */}
            {loading && (
                <ExecutiveLoader 
                    label="Establishing Secure Connection" 
                    isFullPage={true} 
                />
            )}

            {/* VVIP GLOBAL STYLE INJECTION ✅ */}
            <style dangerouslySetInnerHTML={{__html: `
                * { border-radius: 0px !important; }
                input:focus { border-color: #2563eb !important; background-color: #ffffff !important; }
            `}} />

            {/* 1. LEFT PANE (SOLID BRANDING) */}
            <div style={brandingSideStyle}>
                <div style={{ width: '100%', maxWidth: '500px' }}>
                    <LoginBranding />
                </div>
            </div>

            {/* 2. RIGHT PANE (DYNAMIC MESH + FORM) ✅ */}
            <div style={formSideStyle}>
                
                {/* 
                   WATER MESH BG: Contained only in this div.
                   Using absolute to fill only the right pane.
                */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                    <ExecutiveBackground />
                </div>

                <div style={{ width: '100%', maxWidth: '450px', zIndex: 20 }}>
                    <LoginForm 
                        credentials={credentials}
                        setCredentials={setCredentials}
                        handleLogin={handleLogin}
                        loading={loading}
                        errorMsg={errorMsg}
                    />

                    {/* SYSTEM DISCLOSURE FOOTER */}
                    <div style={{ 
                        marginTop: '20px', 
                        textAlign: 'left', 
                        padding: isMobile ? '0 15px' : '0 50px',
                        boxSizing: 'border-box'
                    }}>
                        <p style={{ 
                            fontSize: '8.5px', 
                            color: '#94a3b8', 
                            fontWeight: '800', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.22em',
                            lineHeight: '1.7',
                            margin: 0
                        }}>
                            * Authorized personnel only. All establishment attempts are synchronized with the organizational security trail. *
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}


