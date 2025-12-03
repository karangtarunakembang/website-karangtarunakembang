import { Metadata } from "next";
import ProgramPageClient from "./ProgramPageClient";

export const metadata: Metadata = {
  title: "Program & Kegiatan Unggulan | Kartar Kembang",
  description:
    "Lihat semua agenda, program kerja, dan kegiatan terbaru kami di bidang Sosial, Budaya, Pendidikan, dan Lingkungan. Bergabunglah dan berkontribusi!",
  keywords: [
    "program sosial",
    "kegiatan budaya",
    "pendidikan",
    "lingkungan",
    "agenda organisasi",
  ],
  openGraph: {
    title: "Program & Kegiatan Unggulan | Kartar Kembang",
    description:
      "Semua agenda dan program kerja unggulan yang kami selenggarakan.",
    url: "https://www.kartarkembang.com/program",
    siteName: "Kartar Kembang",
    images: [
      {
        url: "https://mskqiwkcenraejsxowmc.supabase.co/storage/v1/object/public/program-images/program-1764339259670-IMG_1853.JPG",
        width: 800,
        height: 600,
        alt: "Program dan Kegiatan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function Page() {
  return <ProgramPageClient />;
}
