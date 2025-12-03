// src/components/About.tsx
"use client";

import Image from "next/image";
import aboutImage from "../assets/gallery5.png";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import { spring } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: spring, stiffness: 50, damping: 20 },
  },
};

export default function About() {
  const visiText = "Bertujuan untuk berkontribusi positif bagi masyarakat.";

  const misiText =
    "Meningkatkan kepedulian terhadap lingkungan sosial masyarakat.";

  return (
    <div className="bg-white font-sans overflow-hidden min-h-screen" id="about">
      <main className="flex flex-col md:flex-row min-h-screen">
        {/* Left image */}
        <motion.div
          className="w-full md:w-1/2 h-64 md:h-screen relative"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={aboutImage}
            alt="Foto kegiatan Karang Taruna Dusun Kembang"
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent md:hidden" />
        </motion.div>

        {/* Right text */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 py-12 sm:p-12 md:p-16">
          <motion.div
            className="max-w-lg w-full"
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Judul */}
            <motion.div variants={textItemVariants}>
              <h1 className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight mb-2">
                Tentang Karang Taruna <br />
                <span className="text-[#1581bc] font-bold">Dusun Kembang</span>
              </h1>
            </motion.div>

            {/* Isi */}
            <div className="mt-8 space-y-8">
              {/* VISI */}
              <motion.div variants={textItemVariants}>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900 tracking-wide">
                    VISI
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {visiText}
                </p>
              </motion.div>

              {/* MISI */}
              <motion.div variants={textItemVariants}>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900 tracking-wide">
                    MISI
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                  {misiText}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
