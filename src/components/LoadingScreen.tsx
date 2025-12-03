// components/LoadingScreen.tsx
"use client";

import { useEffect, useState } from "react";

// Props: onFinish adalah fungsi yang dipanggil saat animasi selesai
interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  // State untuk mengontrol animasi fade-out
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Setelah komponen dimuat, atur untuk memulai fade-out (setelah waktu tunda yang Anda inginkan)
    // Tunda 1500ms (1.5 detik) sebelum mulai fade-out
    const startFadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500);

    // 2. Setelah fade-out selesai, panggil onFinish untuk menyembunyikan komponen sepenuhnya
    // Durasi fade-out di Tailwind adalah 500ms (duration-500).
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 1500 + 500);

    return () => {
      clearTimeout(startFadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-999 bg-[#1e1e1c] flex flex-col items-center justify-center text-white 
                  transition-opacity duration-500 ease-out 
                  ${isFading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-[#1581bc] border-t-transparent animate-spin"></div>

        <h2 className="mt-6 text-xl font-bold tracking-wider uppercase">
          Kartar Kembang
        </h2>

        <div className="mt-4 w-40 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-[#1581bc] animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  );
}
