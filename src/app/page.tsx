// "use client";

import { Metadata } from "next";
import About from "../components/About";
import Activities from "../components/Activities";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Marketplace from "../components/Marketplace";
import StructurePage from "../components/Structure";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Karang Taruna Dusun Kembang",
  description:
    "Website resmi Karang Taruna Dusun Kembang yang berisi informasi  program dan kegiatan, struktur organisasi Karang Taruna dan dusun, profil serta visi misi karang taruna, galeri foto, hingga marketplace UMKM untuk mendukung ekonomi warga",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Activities />
      <About />
      <StructurePage />
      <Gallery />
      <Marketplace limit={6} />
      <Contact />
    </div>
  );
}
