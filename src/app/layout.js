

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SbuProvider } from "@/context/SbuContext"; // Importing the Global SBU Provider ✅

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vimal ERP - Business Management",
  description: "Centralized ERP for Mother Company and SBUs",
};

/**
 * RootLayout Component
 * Purpose: Defines the base structure of the ERP application.
 * Features: Integrates global fonts, hydration fixes, and the SbuProvider for state management.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrapping the entire application in the SBU Context Provider */}
        <SbuProvider>
          {children}
        </SbuProvider>
      </body>
    </html>
  );
}