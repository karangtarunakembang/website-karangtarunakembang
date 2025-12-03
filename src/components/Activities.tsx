"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

import kegiatan1 from "../assets/kegiatan1.png";
import kegiatan2 from "../assets/kegiatan2.png";
import kegiatan3 from "../assets/kegiatan3.png";

// --- VARIAN ANIMASI ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function Activities() {
  const activitiesData = [
    {
      id: 1,
      title: "Kegiatan Pembukaan KKN UNESA di Desa Kembang",
      slug: "kegiatan-pembukaan-kkn-unesa-di-desa-kembang",
      date: "2025-09-15",
      imageUrl: kegiatan1,
      description:
        "Pembukaan program KKN UNESA di Desa Kembang menjadi momentum awal kolaborasi antara mahasiswa KKN, perangkat desa, dan Karang Taruna setempat. Karang Taruna hadir sebagai tamu undangan dan mitra pemuda desa dalam mendukung berbagai kegiatan sosial, pendidikan, dan pemberdayaan masyarakat yang akan berlangsung selama masa KKN. Kehadiran Karang Taruna pada acara pembukaan ini menunjukkan komitmen bersama dalam membangun lingkungan desa yang lebih aktif, kreatif, dan bermanfaat bagi warga. Melalui sinergi antara pemuda desa dan mahasiswa KKN, diharapkan berbagai program yang direncanakan dapat berjalan lancar dan memberikan dampak positif bagi masyarakat.",
    },
    {
      id: 2,
      title: "Kerja Bakti dan Penanaman Pohon Beringin Iprik",
      slug: "kerja-bakti-dan-penanaman-pohon-beringin-iprik",
      date: "2025-09-19",
      imageUrl: kegiatan2,
      description:
        "Kegiatan kerja bakti dan penanaman pohon beringin iprik dilaksanakan oleh Karang Taruna Dusun Kembang sebagai upaya menjaga kelestarian lingkungan. Pemuda Karang Taruna bersama warga melakukan pembersihan area sekitar titik penanaman, kemudian menanam bibit pohon beringin iprik yang nantinya diharapkan menjadi ruang teduh bagi masyarakat. Mahasiswa KKN juga ikut terlibat dalam kegiatan ini, memberikan dukungan tenaga dan membantu proses penanaman pohon. Melalui kegiatan ini, Karang Taruna berkomitmen untuk terus mendorong penghijauan desa dan meningkatkan kesadaran lingkungan di kalangan pemuda dan masyarakat.",
    },
    {
      id: 3,
      title: "Kerja Bakti Membersihkan TPU Dusun Kembang",
      slug: "kerja-bakti-membersihkan-tpu-dusun-kembang",
      date: "2025-09-25",
      imageUrl: kegiatan3,
      description:
        "Kegiatan kerja bakti membersihkan Tempat Pemakaman Umum (TPU) Dusun Kembang dilaksanakan sebagai bentuk kepedulian Karang Taruna terhadap kebersihan lingkungan dan fasilitas umum desa. Para pemuda Karang Taruna bekerja bersama membersihkan area makam, memangkas rumput liar, serta merapikan akses jalan agar lebih nyaman digunakan warga yang berziarah. Kegiatan ini turut dibantu oleh mahasiswa KKN Unesa yang ikut berpartisipasi dan memberikan tenaga dalam proses gotong royong. Melalui kegiatan ini, diharapkan semangat kebersamaan, kekompakan, dan kepedulian sosial antarwarga semakin kuat, serta lingkungan TPU tetap terawat dengan baik.",
    },
  ];

  return (
    <section id="activities" className="pt-20 pb-10 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Judul */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-4">
            Program & Kegiatan
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Semua program dan kegiatan kerja unggulan yang kami selenggarakan.
          </p>
          <div className="w-24 h-1 bg-[#1581bc] mx-auto mt-4" />
        </motion.div>

        {/* Grid Kartu */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {activitiesData.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              variants={cardVariants}
            >
              <div className="relative h-48 md:h-52 xl:h-56 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-500 mb-1 text-sm">
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-base">
                  {item.description}
                </p>
                <Link
                  href={`/program/${item.slug}`}
                  className="inline-block bg-[#1581bc] text-white py-2 px-4 rounded-xl font-semibold hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Lihat Detail
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tombol Lihat Semua */}
        <motion.div
          className="text-center mt-12"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link
            href="/program"
            className="relative inline-block bg-[#1581bc] text-white font-semibold px-10 py-4 rounded-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-lg overflow-hidden group"
          >
            <div className="absolute bg-white/20 inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10">Lihat Semua Program</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
