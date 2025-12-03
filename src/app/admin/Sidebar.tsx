// src/app/admin/Sidebar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { FaChevronLeft } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { LuNewspaper } from "react-icons/lu";
import { MdMailOutline, MdOutlineDashboard, MdMenu } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaShop } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { trpc } from "@/trpc/client";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const menus = [
    {
      name: "Dashboard",
      icon: <MdOutlineDashboard size={20} />,
      href: "/admin/dashboard",
    },
    {
      name: "Program & Kegiatan",
      icon: <LuNewspaper size={20} />,
      href: "/admin/program",
    },
    {
      name: "Galeri Foto",
      icon: <FiImage size={20} />,
      href: "/admin/gallery",
    },
    {
      name: "Marketplace",
      icon: <FaShop size={20} />,
      href: "/admin/marketplace",
    },
    {
      name: "Pesan Masuk",
      icon: <MdMailOutline size={20} />,
      href: "/admin/pesan",
    },
  ];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const isActive = (href: string) => {
    return pathname === href;
  };

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("Logout berhasil!");

      router.push("/auth/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Gagal logout. Silakan coba lagi.");
    },
  });

  const onSubmit = () => {
    onClose();
    logoutMutation.mutate();
  };

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 z-50 h-screen 
        ${isExpanded ? "w-64" : "w-20"} 
        bg-white text-gray-800 border-r border-gray-200 
        flex flex-col transform transition-all duration-300 shadow-xl md:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Header Sidebar */}
      <div
        className={`flex items-center justify-between h-16 px-5 py-4 border-b border-gray-200 transition-all duration-300 ${
          !isExpanded && "px-0 justify-center"
        }`}
      >
        {isExpanded && (
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/logoKartar.png" alt="Logo" width={32} height={32} />
            <Link
              href={"/admin/dashboard"}
              className="text-xl font-bold text-[#1581bc] hover:text-[#1895d9]"
            >
              Admin Panel
            </Link>
          </div>
        )}

        {/* Tombol Toggle Collapse (Desktop Only) */}
        <button
          onClick={handleToggle}
          aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          className={`
            cursor-pointer hidden md:block p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-transform duration-300 
            ${isExpanded ? "rotate-0 ml-0" : "rotate-180"} 
            ${isExpanded ? "" : "justify-center"} 
          `}
        >
          {isExpanded ? <FaChevronLeft size={16} /> : <MdMenu size={20} />}{" "}
        </button>
      </div>

      {/* Tombol close (mobile only) */}
      <button
        onClick={onClose}
        aria-label="Close Sidebar"
        className="md:hidden absolute top-4 right-4 p-1 rounded-md text-gray-600 hover:bg-gray-100 "
      >
        <IoIosClose size={30} />
      </button>

      {/* Menu navigasi */}
      <nav
        className={`flex-1 overflow-y-auto ${
          isExpanded ? "px-4" : "px-4"
        } py-4`}
      >
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            onClick={() => {
              onClose();
            }}
            className={`
              flex items-center 
              ${
                isExpanded
                  ? "justify-start gap-3 px-4 py-3"
                  : "justify-center py-4"
              }
              font-medium rounded-lg transition-all duration-200 
              text-gray-600 my-1
              ${
                isActive(menu.href)
                  ? "bg-[#1581bc] text-white font-semibold shadow-sm"
                  : "hover:bg-gray-100 hover:text-[#1581bc]"
              }
            `}
            title={!isExpanded ? menu.name : ""}
          >
            {menu.icon}
            <span
              className={`whitespace-nowrap transition-opacity duration-200 
                    ${isExpanded ? "opacity-100 block" : "opacity-0 hidden"}
                `}
            >
              {menu.name}
            </span>
          </Link>
        ))}
      </nav>

      <div
        className={`flex items-center justify-center px-4  pb-4 ${
          !isExpanded && "px-0"
        }`}
      >
        <button
          onClick={onSubmit}
          aria-label="Logout"
          disabled={logoutMutation.isPending}
          className={`
                        flex w-full cursor-pointer bg-red-400
                        font-medium rounded-lg transition-all duration-200 
                        text-white my-1 items-center 
                        ${
                          isExpanded
                            ? "justify-start gap-3 px-4 py-3"
                            : "justify-center py-4"
                        }
                            hover:bg-red-500 hover:text-white
                        ${
                          logoutMutation.isPending
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }
                    `}
          title={
            !isExpanded
              ? logoutMutation.isPending
                ? "Logging out..."
                : "Logout"
              : ""
          }
        >
          <CiLogout className="text-2xl" />
          <span
            className={`whitespace-nowrap transition-opacity duration-200 
                            ${
                              isExpanded
                                ? "opacity-100 block"
                                : "opacity-0 hidden"
                            }
                        `}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>

      <div
        className={`h-16 flex items-center justify-center border-t border-gray-200 transition-all duration-300`}
      >
        <div className={`text-xs text-gray-500 ${!isExpanded}`}>
          © 2025{" "}
          <span className={`${!isExpanded && "hidden"}`}>Kartar Kembang</span>
        </div>
      </div>
    </aside>
  );
}
