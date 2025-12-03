"use client";

import Link from "next/link";
import { motion, Variants } from "motion/react";
import { MapPin, Users, Zap } from "lucide-react";
import { FaShop } from "react-icons/fa6";
import { trpc } from "@/trpc/client";
import CountUp from "react-countup";

const itemVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 },
  },
};

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const heroData = {
  location: "Kembang Belor - Mojokerto",
  title: "Karang Taruna Bhakti Pertiwi",
  highlight: "Pemuda Berkarya",
  description:
    "Membangun Generasi Muda Dusun Kembang Belor yang Kreatif, Inovatif, dan Berkarakter. Mari bersama wujudkan potensi desa.",
  imageUrl: "/hero.jpg",
};

export default function Hero() {
  // 1. Marketplace (untuk menghitung UMKM)
  const { data: marketplaceItems = [], isLoading: isLoadingMarketplace } =
    trpc.marketplace.list.useQuery();
  const umkmCount = marketplaceItems.filter(
    (item) => item.category === "UMKM"
  ).length; // 2. Programs (untuk menghitung Program/Kegiatan)

  const { data: programs = [], isLoading: isLoadingPrograms } =
    trpc.program.list.useQuery();
  const programCount = programs.length;

  const isLoadingData = isLoadingMarketplace || isLoadingPrograms;

  // Data Hero (Gabungan Statis & Dinamis)
  const { location, title, highlight, description, imageUrl } = heroData;

  const infoCards = [
    { label: "Anggota", value: 120, icon: Users, link: "#anggota" }, // Statis
    {
      label: "Program",
      value: programCount,
      icon: Zap,
      link: "#program",
    }, // Dinamis
    {
      label: "UMKM",
      value: umkmCount,
      icon: FaShop,
      link: "#marketplace",
    }, // Dinamis
  ];

  const heroStyle = {
    backgroundImage: `linear-gradient(to top, rgba(18,18,18,0.9), rgba(18,18,18,0.3), rgba(18,18,18,0.3)), url('${imageUrl}')`,
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-end justify-start text-left bg-cover bg-center px-6 md:px-12 py-16"
      style={heroStyle}
    >
      {/* Container Animasi */}
      <motion.div
        className="relative z-10 max-w-4xl text-white w-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Lokasi */}
        <motion.div
          className="flex items-center text-sm font-medium mb-4 bg-white/20 backdrop-blur-sm p-2 rounded-full w-fit"
          variants={itemVariants}
        >
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </motion.div>

        {/* JUDUL */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-2"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        {/* HIGHLIGHT */}
        <motion.p
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-5 md:mb-6"
          variants={itemVariants}
        >
          <span className="text-[#1581bc]">{highlight}</span>
        </motion.p>

        {/* DESKRIPSI */}
        <motion.p
          className="text-base sm:text-lg text-gray-200 mb-5 md:mb-8 max-w-xl"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* TOMBOL CALL TO ACTION (CTA) */}
        <motion.div variants={itemVariants} className="mb-5 md:mb-10">
          <Link
            href="#about"
            className="relative inline-block bg-[#1581bc] text-white font-semibold px-6 lg:px-8 py-4 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-lg overflow-hidden group"
          >
            <div className="absolute bg-white/20 inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            <span className="relative z-10"> Lihat Profil Kami</span>
          </Link>
        </motion.div>

        {/* CARD INFORMASI */}
        <motion.div
          className="flex flex-row gap-4 overflow-x-auto pb-4 -mx-6 px-6 sm:-mx-12 sm:px-12"
          variants={itemVariants}
        >
          {infoCards.map((card, index) => {
            return (
              <Link key={index} href={card.link}>
                <div className="flex flex-col justify-between p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-xl lg:h-28 lg:w-40 border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-pointer">
                  <p className="text-sm text-gray-300 flex items-center">
                    <card.icon className="w-4 h-4 mr-1" />
                    {card.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold">
                    {isLoadingData ? (
                      <span>0+</span>
                    ) : (
                      <CountUp
                        start={0}
                        end={card.value}
                        duration={2.5}
                        delay={1}
                        suffix="+"
                      />
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
