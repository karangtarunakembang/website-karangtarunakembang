"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShop, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";

import kegiatan1 from "../assets/gallery3.png";
import kegiatan2 from "../assets/gallery4.png";
import kegiatan3 from "../assets/gallery5.png";
import kegiatan4 from "../assets/gallery6.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Activities", href: "#activities" },
  { name: "About", href: "#about" },
  { name: "Structure", href: "#structure" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const getImageClass = (imageId: number) => {
    if (hoveredIndex === null) return "grayscale";
    const activeImageId = (hoveredIndex % 4) + 1;

    if (activeImageId === imageId) {
      return "grayscale-0 scale-105 shadow-lg";
    }

    return "grayscale";
  };

  return (
    <>
      {/* Navbar Header */}
      <nav className="fixed top-0 left-0 z-100 w-full flex items-center justify-between px-4 sm:px-10 py-3 text-white">
        <Link
          href="/"
          className="relative w-14 h-14 sm:w-16 sm:h-16 lg:h-20 lg:w-20 z-100"
        >
          <Image
            src="/logoKartar.png"
            alt="Logo"
            fill
            sizes="(max-width: 640px) 48px, 64px"
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-4 z-100">
          <Link
            href="/marketplace"
            className="relative flex items-center gap-2 bg-[#1581bc] text-white font-bold px-4 py-3 rounded-md transition overflow-hidden group"
          >
            <div className="absolute bg-white/20 inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            <span className="relative z-10 flex items-center gap-2">
              <FaShop className="w-5 h-5" />
              STORE
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            className="bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition cursor-pointer text-black"
          >
            {menuOpen ? (
              <IoIosClose className="text-3xl" />
            ) : (
              <HiMenuAlt2 className="text-3xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          />
        )}
        <div
          className={`fixed top-0 right-0 z-60 h-full w-64 md:w-80 bg-[#1e1e1c] text-white flex flex-col pt-24 px-0 transform transition-transform duration-300 ease-in-out shadow-2xl ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="w-full block py-4 px-8 text-lg md:text-xl font-semibold border-b border-[#2c2c2a] hover:bg-[#2c2c2a] hover:text-[#1581bc] transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="p-8 text-center text-gray-400 text-sm">
              <p>© 2025 Kartar Kembang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div
        className={`hidden lg:flex fixed inset-0 z-40 bg-[#1e1e1c] text-[#f0f0f0] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible delay-200"
        }`}
      >
        <div className="flex h-full w-full">
          <div
            className={`w-1/2 h-full pl-12 flex flex-col justify-center transition-all duration-700 delay-200 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex h-full w-full max-w-4xl gap-12">
              {/* Left Column */}
              <div className="flex flex-col w-1/2 gap-12">
                {/* Image 1 */}
                <div className="relative h-1/2 bg-gray-800 rounded-sm overflow-hidden mt-28">
                  <Image
                    src={kegiatan1}
                    alt="Kegiatan 1"
                    fill
                    className={`object-cover transition-all duration-500 ease-out ${getImageClass(
                      1
                    )}`}
                  />
                  <div
                    className={`absolute bottom-3 left-3 bg-[#1581bc] text-white text-xs font-bold px-2 py-1.5 rounded-sm transition-opacity duration-300 ${
                      (hoveredIndex! % 4) + 1 === 1 && hoveredIndex !== null
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    Dusun Kembang
                  </div>
                </div>

                {/* Image 2 */}
                <div className="relative h-1/2 bg-gray-700 rounded-sm overflow-hidden">
                  <Image
                    src={kegiatan2}
                    alt="Kegiatan 2"
                    fill
                    className={`object-cover transition-all duration-500 ease-out ${getImageClass(
                      2
                    )}`}
                  />
                  <div
                    className={`absolute bottom-3 left-3 text-white font-bold text-lg transition-opacity duration-300 ${
                      (hoveredIndex! % 4) + 1 === 2 && hoveredIndex !== null
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    Bernah de Valley
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col w-1/2 gap-12">
                {/* Image 3 */}
                <div className="relative h-1/2 bg-gray-600 rounded-sm overflow-hidden">
                  <Image
                    src={kegiatan3}
                    alt="Kegiatan 3"
                    fill
                    className={`object-cover transition-all duration-500 ease-out ${getImageClass(
                      3
                    )}`}
                  />
                  <div
                    className={`absolute top-3 right-3 text-white font-bold text-xl transition-opacity duration-300 ${
                      (hoveredIndex! % 4) + 1 === 3 && hoveredIndex !== null
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    Sekar Cafe
                  </div>
                </div>

                {/* Image 4 */}
                <div className="relative h-1/2 bg-[#2c2c2a] rounded-sm overflow-hidden mb-28">
                  <Image
                    src={kegiatan4}
                    alt="Kegiatan 4"
                    fill
                    className={`object-cover transition-all duration-500 ease-out ${getImageClass(
                      4
                    )}`}
                  />
                  <div
                    className={`absolute bottom-3 left-3 text-white font-semibold text-lg transition-opacity duration-300 ${
                      (hoveredIndex! % 4) + 1 === 4 && hoveredIndex !== null
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    Klurak Eco Park
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Menu Links */}
          <div className="w-1/2 max-h-screen flex flex-col justify-center items-end pr-28 relative">
            <div className="flex flex-col text-right gap-1 mt-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    text-6xl font-black uppercase tracking-tighter leading-tight
                    transition-all duration-150 cursor-pointer
                    ${
                      hoveredIndex === index
                        ? "text-[#1581bc] italic translate-x-0"
                        : "text-[#f0f0f0] hover:text-white"
                    }
                    ${
                      menuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-20 opacity-0"
                    }
                  `}
                  style={{ transitionDelay: `${150 + index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div
              className={`mt-12 flex flex-col items-end gap-4 transition-all duration-700 delay-500 ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="h-1 w-24 bg-[#1581bc]"></div>
              <div className="flex gap-6 text-2xl text-gray-400">
                <Link
                  href="https://www.instagram.com/persatuanpemudapemudikembang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Kartar Kembang"
                >
                  <FaInstagram className="hover:text-white cursor-pointer" />
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Kartar Kembang"
                >
                  <FaTiktok className="hover:text-white cursor-pointer" />
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Kartar Kembang"
                >
                  <FaYoutube className="hover:text-white cursor-pointer" />
                </Link>
              </div>
              <p className="text-sm text-gray-500 tracking-widest uppercase">
                Official Website Kartar Kembang
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
