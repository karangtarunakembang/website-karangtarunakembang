"use client";

import Image from "next/image";
import gallery1 from "../../../assets/gallery3.png";
import gallery2 from "../../../assets/gallery4.png";
import gallery3 from "../../../assets/gallery5.png";
import gallery4 from "../../../assets/gallery6.png";

import {
  Calendar,
  Mail,
  Store,
  Users,
  Activity,
  MessageSquare,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { trpc } from "@/trpc/client";

interface StatCardProps {
  icon: LucideIcon;
  count: number;
  label: string;
  color: string;
}

// Komponen Card Statistik
const StatCard = ({ icon: Icon, count, label, color }: StatCardProps) => (
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 bg-white p-4 md:p-6 justify-center items-center md:justify-normal md:items-start rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color} shrink-0`}>
        <Icon className="h-6 w-6 md:h-8 md:w-8" />
      </div>
      <div className="md:hidden text-2xl font-bold text-gray-900">{count}</div>
    </div>
    <div className="flex flex-col justify-center items-center md:justify-normal md:items-start">
      <div className="hidden md:block text-3xl font-bold text-gray-900">
        {count}
      </div>
      <p className="text-xs sm:text-sm text-center md:text-start text-gray-600 mt-1">
        {label}
      </p>
    </div>
  </div>
);

// Peta gambar placeholder (Untuk Program/Berita jika gambar dari server tidak tersedia/null)
const imagePlaceholders = [gallery1, gallery2, gallery3, gallery4];

export default function DashboardPage() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("id-ID", options);

  // 1. Pesan
  const { data: messages, isLoading: isLoadingMessages } =
    trpc.message.getAll.useQuery();
  const latestMessage =
    messages && messages.length > 0
      ? messages.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]
      : null;
  const messageCount = messages?.length || 0;

  // 2. Marketplace Items
  const { data: marketplaceItems, isLoading: isLoadingMarketplace } =
    trpc.marketplace.list.useQuery();
  const marketplaceCount = marketplaceItems?.length || 0;

  // 3. Program/Kegiatan
  const { data: programs, isLoading: isLoadingPrograms } =
    trpc.program.list.useQuery();
  const activitiesCount = programs?.length || 0;

  // Data statistik
  const statsData = [
    {
      icon: Mail,
      count: messageCount, // Dinamis
      label: "Pesan",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Store,
      count: marketplaceCount, // Dinamis
      label: "Item Marketplace",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      count: 120, // static
      label: "Anggota",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Activity,
      count: activitiesCount, // Dinamis
      label: "Program Kegiatan",
      color: "bg-red-100 text-red-600",
    },
  ];

  // --- LOGIKA KALENDER (Tidak Berubah) ---
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const todayDate = today.getDate();

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const calendarMonthName = monthNames[currentMonth];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Program terbaru untuk Bagian Aktivitas Terbaru (Maks 4)
  const latestPrograms =
    programs?.slice(0, 4).map((program, index) => ({
      title: program.title,
      date: new Date(program.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      image:
        program.imageUrl || imagePlaceholders[index % imagePlaceholders.length],
    })) || [];

  // Data Loading State
  const overallLoading =
    isLoadingMessages || isLoadingMarketplace || isLoadingPrograms;

  return (
    <div className="h-screen bg-white font-sans px-4 py-8 sm:p-6 lg:p-8 overflow-y-auto scroll-smooth">
      <header className="flex justify-between items-center mb-4 md:mb-8">
        <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-0">
          Selamat Datang di Dashboard Admin Karang Taruna!
        </h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link
            href="#calendar"
            aria-label="Scroll to Calendar"
            className="bg-white p-3 rounded-full shadow-md"
          >
            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-[#1581bc]" />
          </Link>
          <span className="text-gray-700 font-medium text-sm md:text-lg hidden md:block">
            {formattedDate}
          </span>
        </div>
      </header>

      {/* Bagian Statistik Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-4 md:mb-6">
        {overallLoading
          ? // Skeleton Loader for Stats
            [...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-xl shadow-lg animate-pulse h-24"
              ></div>
            ))
          : statsData.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
        {/* Bagian Utama Berita Terbaru (Program) */}
        <main className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4 sm:mb-5 border-b pb-3 border-gray-200">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Aktivitas Terbaru
            </h2>
            <Link
              href="/admin/program"
              className="flex items-center text-blue-700 hover:text-blue-900 font-semibold text-xs sm:text-sm transition-colors duration-200"
            >
              Lihat Semua <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </Link>
          </div>
          {isLoadingPrograms ? (
            // Skeleton Loader for Activities
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-xl overflow-hidden shadow-md animate-pulse h-64"
                >
                  <div className="w-full h-32 md:h-40 bg-gray-200"></div>
                  <div className="p-3 md:p-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : latestPrograms.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Tidak ada program/aktivitas terbaru saat ini.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestPrograms.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
                >
                  <div className="relative w-full h-32 md:h-40">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="text-base md:text-lg text-gray-900 font-bold mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Diterbitkan pada
                      <span className="font-medium text-blue-700">
                        {" "}
                        {item.date}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Sidebar untuk Kalender dan Informasi Tambahan */}
        <aside
          id="calendar"
          className="lg:col-span-1 flex flex-col space-y-4 md:space-y-6"
        >
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl">
            {/* Kalender Component (Tidak Berubah) */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700 mr-2" />
              Kalender
            </h3>
            <div className="text-center bg-indigo-50 p-3 sm:p-4 rounded-lg text-[#1581bc] font-semibold">
              <p className="text-xs sm:text-sm mb-2">
                {calendarMonthName} {currentYear}
              </p>
              <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                  (day) => (
                    <span key={day} className="font-bold text-gray-600">
                      {day}
                    </span>
                  )
                )}
                {calendarDays.map((day, index) => (
                  <span
                    key={index}
                    className={`p-1 rounded-full ${
                      day === null
                        ? "text-transparent"
                        : "text-gray-700 hover:bg-gray-200 cursor-pointer"
                    } ${
                      day === todayDate &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear()
                        ? "ring-2 ring-[#1581bc] bg-indigo-100 text-gray-900 hover:bg-gray-50 font-bold"
                        : ""
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CARD PESAN MASUK TERBARU */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-700 p-4 sm:p-5 rounded-2xl shadow-xl text-white grow">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Pesan
              Terbaru
            </h3>
            {isLoadingMessages ? (
              // Skeleton Loader for Latest Message
              <div className="space-y-3 mb-4 bg-indigo-700/50 p-3 rounded-lg animate-pulse">
                <div className="h-5 bg-indigo-500 rounded w-3/4"></div>
                <div className="h-4 bg-indigo-500 rounded w-1/2"></div>
                <div className="h-3 bg-indigo-500 rounded w-full"></div>
                <div className="h-3 bg-indigo-500 rounded w-5/6"></div>
              </div>
            ) : latestMessage ? (
              <div className="space-y-2 mb-4 bg-indigo-700/60 p-3 rounded-lg">
                <div className="flex justify-between items-center text-xs text-indigo-100">
                  <p className="font-bold text-sm sm:text-base text-white truncate">
                    {latestMessage.name} {/* Asumsi field nama adalah 'name' */}
                  </p>
                  <span className="whitespace-nowrap text-xs">
                    {new Date(latestMessage.createdAt).toLocaleDateString(
                      "id-ID"
                    )}{" "}
                    {/* Format tanggal dari server */}
                  </span>
                </div>
                <p className="font-semibold text-white mb-1 text-sm">
                  Dari:
                  <span className="text-indigo-200 font-normal">
                    {" "}
                    {latestMessage.email}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-white line-clamp-3 italic">
                  {latestMessage.message}{" "}
                  {/* Asumsi field pesan adalah 'message' */}
                </p>
              </div>
            ) : (
              <p className="text-center text-white/80 py-4">
                Tidak ada pesan baru.
              </p>
            )}
            <Link
              href="/admin/pesan"
              className="flex items-center justify-center w-full bg-white text-[#1581bc] font-bold py-2 px-4 rounded-full hover:bg-indigo-100 transition-all duration-300 shadow-md text-sm cursor-pointer"
            >
              <Mail className="h-4 w-4 mr-2" /> Lihat Semua Pesan
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
