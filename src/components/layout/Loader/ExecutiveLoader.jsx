// "use client";

import { useState, useEffect } from 'react';

/**
 * Enterprise ExecutiveLoader - EXECUTIVE MASTER RESPONSIVE
 * Purpose: Professional modular loader for data transitions and authentication.
 * Fix: Dynamic scaling for Mobile vs Laptop screens. ✅
 * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
 * Style: Deep Blue & Slate theme matching the ERP Dashboard. ✅
 */
export default function ExecutiveLoader({ 
    label = "Establishing Connection", 
    size = "medium", 
    isFullPage = false 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Dynamic Sizing Logic for Responsiveness ✅ ---
  const boxSize = isMobile 
    ? (size === "small" ? "8px" : size === "large" ? "18px" : "12px") 
    : (size === "small" ? "10px" : size === "large" ? "25px" : "16px");

  const containerSize = isMobile 
    ? (size === "small" ? "20px" : size === "large" ? "45px" : "30px") 
    : (size === "small" ? "25px" : size === "large" ? "60px" : "38px");

  // --- Inline Style Constants ---
  const fullPageOverlayStyle = isFullPage ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(15, 23, 42, 0.95)', // Deep Slate Overlay
    zIndex: 99999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    boxSizing: 'border-box'
  } : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  };

  return (
    <div style={fullPageOverlayStyle}>
      
      {/* VVIP KEYFRAME INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes executive-box-move {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.5); opacity: 0.3; }
        }
        .loader-grid-vip {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: ${isMobile ? '3px' : '4px'};
          width: ${containerSize};
          height: ${containerSize};
        }
        .loader-box-vip {
          width: ${boxSize};
          height: ${boxSize};
          background-color: #2563eb;
          border-radius: 0px !important;
          animation: executive-box-move 1.2s infinite ease-in-out;
        }
        .vip-box-1 { animation-delay: 0s; }
        .vip-box-2 { animation-delay: 0.3s; background-color: #3b82f6; }
        .vip-box-3 { animation-delay: 0.6s; background-color: #60a5fa; }
        .vip-box-4 { animation-delay: 0.9s; background-color: #0f172a; }
      `}} />

      {/* THE ANIMATION UNIT */}
      <div className="loader-grid-vip">
        <div className="loader-box-vip vip-box-1"></div>
        <div className="loader-box-vip vip-box-2"></div>
        <div className="loader-box-vip vip-box-4"></div>
        <div className="loader-box-vip vip-box-3"></div>
      </div>

      {/* DYNAMIC RESPONSIVE LABEL ✅ */}
      {label && (
        <div style={{ marginTop: isMobile ? '15px' : '20px', textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
            <p style={{ 
                margin: 0, 
                fontSize: isMobile ? '8.5px' : '10px', 
                fontWeight: '900', 
                color: isFullPage ? '#ffffff' : '#94a3b8', 
                textTransform: 'uppercase', 
                letterSpacing: isMobile ? '0.15em' : '0.25em',
                lineHeight: '1.2'
            }}>
                {label}
            </p>
            <div style={{ 
                width: isMobile ? '20px' : '30px', 
                height: '2px', 
                backgroundColor: '#2563eb', 
                margin: '8px auto 0',
                opacity: 0.6 
            }}></div>
        </div>
      )}

    </div>
  );
}