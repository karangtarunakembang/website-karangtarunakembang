"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MarketplaceNavbar from "@/components/MarketplaceNavbar";
import { trpc } from "@/trpc/client";
import { MarketplaceCategory } from "@/types";
import { ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function MarketplaceDetailPage() {
  const { slug } = useParams() as { slug: string };

  const { data: item, isLoading } = trpc.marketplace.getBySlug.useQuery({
    slug,
  });

  const { data: related } = trpc.marketplace.getRelated.useQuery({
    category: item?.category as unknown as MarketplaceCategory,
    excludeSlug: slug,
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 404 State
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <h1 className="text-4xl font-black uppercase mb-4">
          Produk Tidak Ditemukan
        </h1>
        <Link href="/marketplace" className="underline font-bold">
          Kembali ke Marketplace
        </Link>
      </div>
    );
  }

  // Template Chat WhatsApp
  const sellerPhone = "6281234567890";
  const message = `Halo, saya tertarik dengan produk "${item.title}" yang ada di Marketplace Dusun Kembang. Apakah masih tersedia?`;
  const whatsappUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      <MarketplaceNavbar />
      <div className="bg-white text-black min-h-screen font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[90vh]">
          {/* 1. Image Section (Kanan di Desktop, Atas di Mobile) */}
          <div className="relative w-full h-[50vh] lg:h-auto bg-[#f4f4f4] lg:order-2">
            {/* Tombol Back (Mobile Only) */}
            <Link
              href="/marketplace"
              aria-label="Back to Marketplace"
              className="absolute top-4 left-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full lg:hidden shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </Link>

            <Image
              src={item.imageUrl || "/placeholder.png"}
              alt={item.title}
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* 2. Info Section (Kiri di Desktop, Bawah di Mobile) */}
          <div className="flex flex-col justify-center px-6 py-10 lg:px-20 lg:py-24 lg:order-1">
            <Link
              href="/marketplace"
              aria-label="Back to Marketplace"
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Marketplace
            </Link>

            {/* Kategori Tag */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-black text-white rounded-sm">
                {item.category}
              </span>
            </div>

            {/* Judul Produk */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-4 text-gray-900">
              {item.title}
            </h1>

            {/* Deskripsi  Produk */}
            <div className="border-t border-gray-200 py-6">
              <p className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-900">
                Description
              </p>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed text-justify">
                <p>{item.description}</p>
              </div>
            </div>

            {/* Hubungi Penjual */}
            {item.noHp && (
              <div className="mt-6">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 w-full bg-[#1581bc] text-white font-black uppercase tracking-widest py-5 rounded-lg hover:bg-[#1895d9] hover:-translate-y-1 active:translate-y-0 transition-all duration-200 shadow-lg shadow-blue-200"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span>Hubungi Penjual</span>
                </Link>
                <p className="text-center text-[10px] text-gray-400 mt-5 uppercase tracking-wide">
                  Anda akan diarahkan ke WhatsApp Penjual
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Rekomendasi Terkait */}
        {related && related.length > 0 && (
          <div className="py-16 px-6 lg:px-20 border-t border-gray-100">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-left">
              Rekomendasi Terkait
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/marketplace/${r.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-4/5 bg-[#f4f4f4] mb-4 overflow-hidden rounded-sm">
                    <Image
                      src={r.imageUrl || "/placeholder.png"}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-bold uppercase text-sm leading-tight group-hover:underline decoration-1 underline-offset-2">
                    {r.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{r.category}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
