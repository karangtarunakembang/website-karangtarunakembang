"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function MarketplaceNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    "BANGGA BELI LOKAL: SUPPORT PRODUK ASLI DESA",
    "KARTAR KEMBANG X KKNT UNESA 25",
    "SHOP LOCAL, SUPPORT LOCAL: MAJUKAN EKONOMI DESA",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  const navLinks = [
    { name: "BERANDA", href: "/" },

    { name: "Location", href: "/#contact" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      <div
        className={`bg-[#1581bc] h-10 flex items-center justify-center overflow-hidden relative`}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-full text-center px-4 text-[10px] md:text-xs font-black text-white tracking-widest uppercase cursor-default"
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/*  Main Navbar */}
      <nav className="bg-gray-50 border-b border-white/10 px-4 md:px-12 h-16 md:h-20 flex items-center justify-between relative shadow-md">
        {/* 1. Bagian Kiri: Logo Utama */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logoKartar.png"
              alt="Logo"
              width={50}
              height={50}
              className="w-10 h-10 md:w-[50px] md:h-[50px] lg:w-16 lg:h-16"
            />
          </Link>
        </div>

        {/* 2. Bagian Kanan: Menu Links (Desktop) & Hamburger (Mobile) */}
        <div className="flex items-center gap-5 md:gap-8">
          {/*  Dekstop Menu (Hidden di Mobile, Muncul di Kanan Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#1581bc] text-sm font-extrabold uppercase tracking-wider hover:opacity-80 hover:underline decoration-2 underline-offset-4 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Hamburger Menu (Muncul di Mobile, Hidden di Kanan Desktop) */}
          <button
            className="md:hidden text-[#1581bc] hover:text-gray-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-8 h-8" strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/*  Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#0a0a0a] z-60 flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
              <Image
                src="/logoKartar.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-12 h-12"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#1581bc] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter text-white hover:text-[#1581bc] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-white/10 pt-6">
              <Link
                href="/login"
                className={`flex items-center gap-3 font-bold text-xs text-gray-500 uppercase tracking-widest hover:text-white`}
              >
                Official Website Kartar Kembang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
