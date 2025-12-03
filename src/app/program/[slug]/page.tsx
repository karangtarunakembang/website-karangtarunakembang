"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowLeft, MapPin, Calendar } from "lucide-react";

export default function ProgramDetailPage() {
  const { slug } = useParams() as { slug: string };

  const { data: program, isLoading } = trpc.program.getBySlug.useQuery({
    slug,
  });

  const { data: relatedPrograms = [] } = trpc.program.getRelated.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <h1 className="text-4xl font-black uppercase mb-4">
          Program Tidak Ditemukan
        </h1>
        <Link href="/program" className="underline font-bold">
          Kembali ke Halaman Program
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[90vh]">
        <div className="relative w-full h-[50vh] lg:h-auto bg-[#f4f4f4] lg:order-2">
          <Link
            href="/program"
            aria-label="Back to all program"
            className="md:hidden absolute top-4 left-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full lg:hidden shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </Link>
          <Image
            src={program.imageUrl || "/placeholder.png"}
            alt={program.title || "Program"}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-10 lg:px-20 lg:py-24 lg:order-1">
          <Link
            href="/program"
            aria-label="Back to all program"
            className="hidden lg:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Program
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(program.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6 text-gray-900">
            {program.title}
          </h1>
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm font-semibold text-gray-600 mb-8">
            <span className="font-bold text-white px-3 py-1 rounded-lg bg-[#1581bc]">
              {program.category}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1581bc]" />
              {program.location}
            </span>
          </div>
          <div className="border-t border-gray-200 py-6">
            <p className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-900">
              Deskripsi Kegiatan
            </p>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed text-justify">
              <p>{program.description}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href="/program"
              aria-label="Back To All Program"
              className="group flex items-center justify-center gap-3 w-full bg-black text-white font-black uppercase tracking-widest py-4 rounded-lg hover:bg-gray-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg shadow-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Semua Program</span>
            </Link>
          </div>
        </div>
      </div>
      {relatedPrograms && relatedPrograms.length > 0 && (
        <div className="py-16 px-6 lg:px-20 border-t border-gray-100">
          <p className="text-2xl font-black uppercase tracking-tighter mb-8 text-left">
            Program Lainnya
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {relatedPrograms.map((r, i) => (
              <Link
                key={r.slug}
                href={`/program/${r.slug}`}
                className="group block"
                aria-label={r.title}
              >
                <div className="relative aspect-4/5 bg-[#f4f4f4] mb-4 overflow-hidden rounded-sm">
                  <Image
                    src={r.imageUrl || "/placeholder.png"}
                    alt={r.title || `Program ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="font-bold uppercase text-sm leading-tight group-hover:underline decoration-1 underline-offset-2">
                  {r.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
