// app/components/Marketplace.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { MarketplaceItem } from "@/types";
import { useLoadingContext } from "@/context/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import placeholder from "../assets/gallery5.png";

type CategoryFilter =
  | "Semua"
  | "UMKM"
  | "Wisata"
  | "Cafe"
  | "Event"
  | "Accommodation";

const MarketplaceCardSkeleton = () => (
  <div className="group flex flex-col h-full animate-pulse">
    <div className="relative bg-gray-200 aspect-4/5 w-full overflow-hidden rounded-xl mb-4">
      <div className="absolute top-3 left-3 z-10 h-5 w-1/4 bg-gray-300 rounded"></div>
    </div>

    <div className="flex flex-col items-start">
      <div className="h-4 bg-gray-300 w-3/4 mb-1 rounded"></div>{" "}
      <div className="h-3 bg-gray-200 w-1/2 rounded"></div>{" "}
    </div>
  </div>
);

export default function Marketplace({ limit }: { limit?: number }) {
  const { setMarketplaceReady } = useLoadingContext();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Semua");

  const {
    data: items = [],
    isLoading,
    isFetching,
  } = trpc.marketplace.list.useQuery();

  useEffect(() => {
    if (!isLoading) {
      setMarketplaceReady(true);
    }
  }, [isLoading, setMarketplaceReady]);

  const categories = [
    "Semua",
    "UMKM",
    "Wisata",
    "Cafe",
    "Event",
    "Accommodation",
  ]; // Filter Logic

  const filtered: MarketplaceItem[] =
    selectedCategory === "Semua"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const finalData = limit ? filtered.slice(0, limit) : filtered;

  const shouldShowSkeleton =
    isLoading || (finalData.length === 0 && isFetching);
  const skeletonCount = limit || 8;

  return (
    <section
      id="marketplace"
      className="pt-5 pb-10 md:py-12 bg-white min-h-screen text-black"
    >
      <div className="container mx-auto sm:px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-4"
          >
            MARKETPLACE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-xl mx-auto text-sm md:text-base font-medium px-4"
          >
            Jelajahi produk asli Dusun Kembang. Dari kerajinan tangan UMKM
            hingga tiket wisata dan kuliner.
          </motion.p>
        </div>
        {/* Filter Section */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrol mask-linear-fade no-scrollbar px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as CategoryFilter)}
                className={`cursor-pointer px-6 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide border transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-black text-white border-black shadow-lg"
                    : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Products Section */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 px-4"
        >
          {shouldShowSkeleton ? (
            <>
              {Array.from({ length: skeletonCount }).map((_, index) => (
                <MarketplaceCardSkeleton key={index} />
              ))}
            </>
          ) : (
            <AnimatePresence mode="popLayout">
              {finalData.map((item, i) => {
                const isPlaceholder = !item.imageUrl;
                const imageSource = isPlaceholder
                  ? placeholder
                  : (item.imageUrl as string);
                return (
                  <motion.div
                    layout
                    key={item.slug || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group flex flex-col h-full"
                  >
                    <Link
                      href={`/marketplace/${item.slug}`}
                      className="block h-full"
                    >
                      {/* Card Image */}
                      <div className="relative bg-[#F4F4F4] aspect-4/5 w-full overflow-hidden rounded-xl mb-4">
                        {/* Label Kategori */}
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                              item.category === "Event"
                                ? "bg-yellow-400 text-black"
                                : "bg-white text-black"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>

                        <Image
                          src={imageSource}
                          alt={item.title}
                          fill
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Overlay "View" */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Product Info*/}
                      <div className="flex flex-col items-start">
                        <h3 className="text-sm md:text-base font-bold text-black uppercase leading-tight group-hover:underline decoration-1 underline-offset-4">
                          {item.title}
                        </h3>

                        {/* Deskripsi */}
                        <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </motion.div>
        {/* Loading Spinner */}
        {shouldShowSkeleton && (
          <div className="mt-8 text-center flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#1581bc]" />
          </div>
        )}

        {/* Empty State */}
        {!shouldShowSkeleton && finalData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium uppercase tracking-wide">
              Tidak ada item ditemukan
            </p>
          </div>
        )}
        {/* Lihat Semua */}
        {limit && items.length > limit && (
          <div className="mt-16 text-center">
            <Link
              href="/marketplace"
              className="relative inline-block px-10 py-4 bg-[#1581bc] text-white text-sm font-bold uppercase tracking-widest transition-colors rounded-3xl overflow-hidden group shadow-lg"
            >
              <div className="absolute bg-white/20 inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">Lihat Semua</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
