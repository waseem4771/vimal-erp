
"use client";
import { useState, useEffect } from 'react';
import DashboardHeaderLaptop from '../DashboardHeaderLaptop/DashboardHeaderLaptop';
import DashboardHeaderMobile from '../DashboardHeaderMobile/DashboardHeaderMobile';

export default function DashboardHeader(props) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const handleHardRefresh = () => { if (typeof window !== 'undefined') window.location.reload(); };

    // Jab screen choti ho to sirf mobile component render karo, warna laptop
    if (isMobile) {
        return <DashboardHeaderMobile {...props} handleHardRefresh={handleHardRefresh} />;
    }

    return <DashboardHeaderLaptop {...props} handleHardRefresh={handleHardRefresh} />;
}