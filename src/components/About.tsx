"use client";

import Image from "next/image";
import aboutImage from "../assets/aboutLogoKartar.png";
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
            className="absolute inset-0 w-full h-full object-contain"
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
              <h1 className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight mb-6">
                Filosofi Logo{" "}
                <span className="text-[#1581bc]">
                  <br />
                  Karang Taruna
                </span>
              </h1>
            </motion.div>

            {/* Isi */}
            <div className="mt-8 space-y-8">
              {/* 1 */}
              <motion.div variants={textItemVariants}>
                <h2 className="text-xl font-semibold text-gray-950 mb-2">
                  1. Lingkaran Luar dengan Tulisan “PERSATUAN PEMUDA PEMUDI
                  KEMBANG”
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Melambangkan kesatuan dan kebersamaan seluruh anggota tanpa
                  membedakan latar belakang. Bentuk lingkaran menggambarkan
                  kesinambungan dan kekompakan yang tak terputus.
                </p>
              </motion.div>

              {/* 2 */}
              <motion.div variants={textItemVariants}>
                <h2 className="text-xl font-semibold text-gray-950 mb-2">
                  2. Dua Tangan Mengepal Memegang Bunga Melati Putih
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Tangan mengepal melambangkan semangat juang, kekuatan, dan
                  keberanian. Bunga melati putih adalah simbol kesucian,
                  ketulusan, dan niat murni dalam berorganisasi, serta
                  mencerminkan identitas lokal dan nilai budaya yang dijunjung.
                </p>
              </motion.div>

              {/* 3 */}
              <motion.div variants={textItemVariants}>
                <h2 className="text-xl font-semibold text-gray-950 mb-2">
                  3. Lambang Karang Taruna di Tengah
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Menggambarkan bahwa organisasi ini berlandaskan nilai-nilai
                  Karang Taruna yang fokus kepada kegiatan sosial
                  kemasyarakatan.
                </p>
              </motion.div>

              {/* 4 */}
              <motion.div variants={textItemVariants}>
                <h2 className="text-xl font-semibold text-gray-950 mb-2">
                  4. Pita Emas Bertuliskan “P THREE K”
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Pita emas melambangkan keberanian, kebanggaan, dan kejayaan.
                  Tulisan “P THREE K” merupakan singkatan dari Persatuan Pemuda
                  Pemudi Kembang, yang terdiri dari tiga huruf P dan satu huruf
                  K.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
