// app/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import LoadingScreen from "@/components/LoadingScreen";

import { Toaster } from "react-hot-toast";
import LayoutWithConditionalComponents from "@/components/LayoutWithConditionalComponents";
import { LoadingProvider, useLoadingContext } from "@/context/LoadingContext";
import { AnalyticsLoader } from "@/components/AnalyticsLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AnalyticsLoader />
        <LoadingProvider>
          <LayoutWithLoadingControl>{children}</LayoutWithLoadingControl>
        </LoadingProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

const LayoutWithLoadingControl = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isMarketplaceReady } = useLoadingContext();
  const [isLoading, setIsLoading] = useState(true);

  const allDataReady = isMarketplaceReady;

  useEffect(() => {
    const MIN_DISPLAY_TIME = 500; // Minimal tampil 0.5 detik untuk user experience

    if (allDataReady) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, MIN_DISPLAY_TIME);

      return () => clearTimeout(timer);
    }
  }, [allDataReady]);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}

      {/* Konten Utama */}
      <div
        className={
          isLoading
            ? "opacity-0 invisible h-0"
            : "opacity-100 visible h-full transition-opacity duration-300"
        }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          value={{ light: "light", dark: "dark" }}
        >
          <TRPCProvider>
            <LayoutWithConditionalComponents>
              {children}
            </LayoutWithConditionalComponents>
          </TRPCProvider>
        </ThemeProvider>
      </div>
    </>
  );
};
