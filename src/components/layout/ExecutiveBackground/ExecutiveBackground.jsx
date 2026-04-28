

// "use client";

// import React, { useState, useEffect } from 'react';

// /**
//  * Enterprise ExecutiveBackground - WATER MESH RESPONSIVE EDITION
//  * Purpose: Professional "Liquid Water" effect using animated mesh blobs.
//  * Fix: Optimized blob sizes for Mobile to ensure movement visibility. ✅
//  * Fix: Forced 0px Border Radius & High-Priority Inline Styles. ✅
//  * Style: 100% GPU Optimized, Zero Lag, Crystal Blue & White theme. ✅
//  */
// export default function ExecutiveBackground() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     /* FIXED ROOT LAYER */
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100vw',
//       height: '100vh',
//       zIndex: -1, 
//       overflow: 'hidden',
//       backgroundColor: '#ffffff', // Pure white base floor
//     }}>
      
//       {/* VVIP LIQUID KEYFRAMES & RESPONSIVE LOGIC ✅ */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes water-blob-1 {
//           0%, 100% { top: -10%; left: -10%; }
//           33% { top: 40%; left: 60%; }
//           66% { top: 70%; left: 10%; }
//         }
//         @keyframes water-blob-2 {
//           0%, 100% { bottom: -10%; right: -10%; }
//           33% { bottom: 50%; right: 40%; }
//           66% { bottom: 10%; right: 70%; }
//         }
//         @keyframes water-blob-3 {
//           0%, 100% { top: 40%; left: 40%; }
//           33% { top: 10%; left: 5%; }
//           66% { top: 60%; left: 80%; }
//         }

//         .water-wrapper {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           /* Blur intensity scales with screen size for smoothness */
//           filter: blur(${isMobile ? '40px' : '80px'}); 
//         }

//         .liquid-blob {
//           position: absolute;
//           border-radius: 50%;
//           opacity: ${isMobile ? '0.4' : '0.6'};
//           will-change: transform, top, left, bottom, right;
//           transform: translateZ(0); /* GPU Force */
//         }

//         /* Responsive Blob Sizes ✅ */
//         .blob-1 {
//           width: ${isMobile ? '250px' : '600px'};
//           height: ${isMobile ? '250px' : '600px'};
//           background: #e0f2fe; /* Crystal Blue */
//           animation: water-blob-1 15s infinite alternate ease-in-out;
//         }

//         .blob-2 {
//           width: ${isMobile ? '200px' : '500px'};
//           height: ${isMobile ? '200px' : '500px'};
//           background: #f0f9ff; /* Icy Pearl */
//           animation: water-blob-2 18s infinite alternate ease-in-out;
//           animation-delay: -3s;
//         }

//         .blob-3 {
//           width: ${isMobile ? '220px' : '550px'};
//           height: ${isMobile ? '220px' : '550px'};
//           background: #f8fafc; /* Soft Slate Glow */
//           animation: water-blob-3 20s infinite alternate ease-in-out;
//           animation-delay: -6s;
//         }

//         .glass-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: saturate(140%);
//           pointer-events: none;
//         }
//       `}} />

//       {/* THE WATER MESH ENGINE */}
//       <div className="water-wrapper">
//         <div className="liquid-blob blob-1"></div>
//         <div className="liquid-blob blob-2"></div>
//         <div className="liquid-blob blob-3"></div>
//       </div>

//       {/* CRYSTAL GLASS FINISH ✅ */}
//       <div className="glass-overlay"></div>

//     </div>
//   );
// }





"use client";

import React, { useState, useEffect } from 'react';

/**
 * Enterprise ExecutiveBackground - SLATE WATER MESH EDITION (FINAL)
 * Purpose: Professional "Crystal Water" effect using Slate-50 (#f8fafc) foundation.
 * Fix: Replaced pure white with Slate-50 to match identity/button theme. ✅
 * Fix: 4-Way diagonal sweep ensures every corner of the screen is covered. ✅
 * Style: 100% GPU Optimized, Zero Lag, Executive Glass Finish. ✅
 */
export default function ExecutiveBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    /* FIXED ROOT LAYER: Standardized on Slate-50 (#f8fafc) ✅ */
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1, 
      overflow: 'hidden',
      backgroundColor: '#f8fafc', 
    }}>
      
      {/* VVIP LIQUID PHYSICS INJECTION ✅ */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Diagonal Sweep: Top-Left to Bottom-Right */
        @keyframes sweep-diagonal-1 {
          0%, 100% { transform: translate3d(-15%, -15%, 0) rotate(0deg); }
          50% { transform: translate3d(50%, 50%, 0) rotate(5deg); }
        }

        /* Diagonal Sweep: Bottom-Right to Top-Left */
        @keyframes sweep-diagonal-2 {
          0%, 100% { transform: translate3d(15%, 15%, 0) rotate(0deg); }
          50% { transform: translate3d(-50%, -50%, 0) rotate(-10deg); }
        }

        /* Fluid Orbit for Central Coverage */
        @keyframes sweep-orbit {
          0% { transform: translate3d(-20%, 10%, 0); }
          50% { transform: translate3d(30%, -10%, 0); }
          100% { transform: translate3d(-20%, 10%, 0); }
        }

        /* Realistic Surface Shimmer */
        @keyframes shimmer-master {
          0% { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
          40%, 60% { opacity: 0.4; }
          100% { transform: translateX(200%) skewX(-20deg); opacity: 0; }
        }

        .liquid-engine {
          position: relative;
          width: 100%;
          height: 100%;
          /* Professional heavy blur for water blending */
          filter: blur(${isMobile ? '45px' : '95px'}); 
        }

        .water-wave {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
          opacity: ${isMobile ? '0.35' : '0.55'};
        }

        /* Wave 1: Slate-50 Primary (Reaches Top-Left Corner) ✅ */
        .wave-1 {
          width: ${isMobile ? '400px' : '1100px'};
          height: ${isMobile ? '400px' : '1000px'};
          top: -25%;
          left: -25%;
          background: radial-gradient(circle, #f8fafc 0%, rgba(248,250,252,0) 75%);
          animation: sweep-diagonal-1 22s infinite ease-in-out;
        }

        /* Wave 2: Crystal Blue (Reaches Bottom-Right Corner) ✅ */
        .wave-2 {
          width: ${isMobile ? '350px' : '1000px'};
          height: ${isMobile ? '350px' : '900px'};
          bottom: -15%;
          right: -15%;
          background: radial-gradient(circle, #e0f2fe 0%, rgba(224,242,254,0) 75%);
          animation: sweep-diagonal-2 28s infinite ease-in-out;
        }

        /* Wave 3: Slate-50 Orbit (Ensures Center & Sides are covered) ✅ */
        .wave-3 {
          width: ${isMobile ? '300px' : '850px'};
          height: ${isMobile ? '300px' : '850px'};
          top: 20%;
          left: 20%;
          background: radial-gradient(circle, #f8fafc 0%, rgba(248,250,252,0) 70%);
          animation: sweep-orbit 35s infinite linear;
        }

        /* Wave 4: Ice Blue Tint (Top-Right Coverage) ✅ */
        .wave-4 {
          width: ${isMobile ? '280px' : '750px'};
          height: ${isMobile ? '280px' : '750px'};
          top: -15%;
          right: -10%;
          background: #f1f5f9;
          opacity: 0.25;
          animation: sweep-diagonal-2 18s infinite reverse ease-in-out;
        }

        /* Light Shimmer Effect on Water Surface */
        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            110deg, 
            transparent 0%, 
            rgba(255,255,255,0.3) 48%, 
            rgba(255,255,255,0.5) 50%, 
            rgba(255,255,255,0.3) 52%, 
            transparent 100%
          );
          width: 250%;
          animation: shimmer-master 15s infinite linear;
          pointer-events: none;
          z-index: 5;
        }

        /* Clean Glass Finish Overlay */
        .executive-glass {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(248, 250, 252, 0.02);
          backdrop-filter: saturate(115%);
          pointer-events: none;
        }
      `}} />

      {/* 1. DYNAMIC WATER MESH ENGINE */}
      <div className="liquid-engine">
        <div className="water-wave wave-1"></div>
        <div className="water-wave wave-2"></div>
        <div className="water-wave wave-3"></div>
        <div className="water-wave wave-4"></div>
        
        {/* Specular Shimmer (Sunlight reflection feel) */}
        <div className="shimmer-overlay"></div>
      </div>

      {/* 2. FINAL FROSTED GLASS LAYER */}
      <div className="executive-glass"></div>

    </div>
  );
}