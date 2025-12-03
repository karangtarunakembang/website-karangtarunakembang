"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  uploadProgramImage,
  deleteProgramImage,
} from "@/lib/uploadProgramImage";
import { trpc } from "@/trpc/client";
import { FaFileUpload } from "react-icons/fa";
import { ProgramItem, ProgramCategory } from "@/types";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const PROGRAM_CATEGORY_OPTIONS = Object.keys(
  ProgramCategory
) as ProgramCategory[];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type EditingState = {
  id?: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  category: ProgramCategory;
  location: string;
};

export default function AdminProgramsPage() {
  const ctx = trpc.useContext();
  const programsQuery = trpc.program.list.useQuery();

  const createMutation = trpc.program.create.useMutation({
    onSuccess: () => {
      ctx.program.list.invalidate();
      resetModal();
      toast.success("Program berhasil ditambahkan!");
    },
    onError: () => {
      toast.error(`Gagal membuat program}`);
    },
  });

  const updateMutation = trpc.program.update.useMutation({
    onSuccess: () => {
      ctx.program.list.invalidate();
      resetModal();
      toast.success("Program berhasil diperbarui!");
    },
  });

  const deleteMutation = trpc.program.delete.useMutation({
    onSuccess: () => {
      ctx.program.list.invalidate();
      toast.success("Program berhasil dihapus.");
    },
    onError: (error) => {
      toast.error(`Gagal menghapus program: ${error.message}`);
    },
  });

  const [editing, setEditing] = useState<EditingState | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (programsQuery.isLoading)
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-36 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* List Skeleton */}
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between animate-pulse"
            >
              {/* Left content: image + text */}
              <div className="flex items-start gap-4 grow">
                <div className="w-20 h-16 bg-gray-200 rounded-md"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>

              {/* Right content: buttons */}
              <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
                <div className="h-10 w-20 bg-gray-200 rounded"></div>
                <div className="h-10 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  const resetModal = () => {
    setEditing(null);
    setSelectedImage(null);
    setUploading(false);
  };

  const openEditModal = (p: ProgramItem) => {
    const categoryValue =
      p.category in ProgramCategory
        ? (p.category as ProgramCategory)
        : PROGRAM_CATEGORY_OPTIONS[0];

    setEditing({
      id: p.id,
      slug: p.slug,
      title: p.title,
      date:
        p.date instanceof Date
          ? p.date.toISOString()
          : new Date(p.date).toISOString(),
      description: p.description,
      imageUrl: p.imageUrl ?? undefined,
      category: categoryValue,
      location: p.location ?? "",
    });
  };

  const openCreateModal = () => {
    setEditing({
      slug: `program-${Date.now()}`,
      title: "",
      date: new Date().toISOString(),
      description: "",
      imageUrl: undefined,
      category: PROGRAM_CATEGORY_OPTIONS[0] as ProgramCategory,
      location: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditing((prev) => {
      if (!prev) return null;
      if (name === "date") {
        return { ...prev, date: new Date(value).toISOString() };
      }
      if (name === "category") {
        return { ...prev, category: value as ProgramCategory };
      }
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto text-gray-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-900 mt-3">Admin Program</h1>
        <button
          onClick={openCreateModal}
          className="bg-[#1581bc] text-white px-4 py-2 rounded-lg shadow hover:bg-[#1895d9] w-full sm:w-auto text-sm font-semibold cursor-pointer"
        >
          + Tambah Program
        </button>
      </div>

      {/* List Program */}
      <div className="grid gap-4">
        {programsQuery.data?.map((p: ProgramItem) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100"
          >
            {/* Left Content: Gambar, Judul, Tanggal */}
            <div className="flex items-start gap-4 grow">
              <Image
                src={p.imageUrl ?? "/placeholder-400x300.png"}
                alt={p.title}
                width={80}
                height={60}
                className="w-20 h-16 object-cover rounded-md shrink-0"
              />
              <div className="flex flex-col justify-center">
                <Link
                  href={`/program/${p.slug}`}
                  className="font-semibold text-gray-800 text-base leading-tight hover:underline"
                >
                  {p.title}
                </Link>
                <div className="text-xs text-gray-500 mt-1">
                  {p.location ? `${p.location} | ` : ""}
                  {formatDate(p.date.toString())}
                </div>
                <span className="text-xs font-medium text-blue-600 mt-1 uppercase">
                  {p.category}
                </span>
              </div>
            </div>

            {/* Right Content: Tombol Edit/Hapus */}
            <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => openEditModal(p)}
                className="lg:min-w-20 px-3 py-2 text-sm border border-gray-950 text-black rounded-lg hover:bg-gray-100 transition-colors flex-1 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Hapus program ini secara permanen?")) {
                    if (p.imageUrl) deleteProgramImage(p.imageUrl);
                    deleteMutation.mutate({ id: p.id });
                  }
                }}
                className="lg:min-w-20 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex-1 cursor-pointer"
                disabled={deleteMutation.isPending}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto pt-40 md:pt-0">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative transform transition-all duration-300 scale-100 opacity-100 mt-56 md:mt-0">
            <button
              className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-900"
              onClick={resetModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-5">
              {editing.id ? "Edit Program" : "Buat Program Baru"}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setUploading(true);

                let finalImageUrl = editing.imageUrl ?? "";

                if (selectedImage) {
                  if (editing.imageUrl) {
                    await deleteProgramImage(editing.imageUrl);
                  }
                  finalImageUrl = await uploadProgramImage(selectedImage);
                }

                const payload = {
                  slug: editing.slug,
                  title: editing.title,
                  date: editing.date,
                  description: editing.description,
                  imageUrl: finalImageUrl,
                  category: editing.category,
                  location: editing.location,
                };

                if (editing.id) {
                  await updateMutation.mutateAsync({
                    id: editing.id,
                    ...payload,
                  });
                } else {
                  await createMutation.mutateAsync(payload);
                }

                resetModal();
              }}
            >
              {/* Formulir Input */}
              <label className="block mb-2 text-sm font-medium">
                Slug (URL)
              </label>
              <input
                value={editing.slug}
                name="slug"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded mb-4 border-gray-300 focus:border-blue-500"
              />

              <label className="block mb-2 text-sm font-medium">
                Judul Program
              </label>
              <input
                value={editing.title}
                name="title"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded mb-4 border-gray-300 focus:border-blue-500"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kategori (Select) */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Kategori
                  </label>
                  <select
                    name="category"
                    value={editing.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded mb-4 border-gray-300 focus:border-blue-500 bg-white"
                  >
                    {PROGRAM_CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0) + cat.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lokasi */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Lokasi (Opsional)
                  </label>
                  <input
                    value={editing.location}
                    name="location"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded mb-4 border-gray-300 focus:border-blue-500"
                    placeholder="Contoh: Kembangbelor"
                  />
                </div>
              </div>

              {/* Tanggal */}
              <label className="block mb-2 text-sm font-medium">
                Tanggal Kegiatan
              </label>
              <input
                type="date"
                value={editing.date.slice(0, 10)}
                name="date"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded mb-4 border-gray-300 focus:border-blue-500"
              />

              {/* Deskripsi */}
              <label className="block mb-2 text-sm font-medium">
                Deskripsi
              </label>
              <textarea
                value={editing.description}
                name="description"
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded mb-4 border-gray-300 focus:border-blue-500"
              />

              {/* Upload Gambar */}
              <label className="block mb-2 text-sm font-medium">
                Gambar (Rasio 4:3 disarankan)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative w-full h-32 sm:w-32 sm:h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden shrink-0">
                  {selectedImage ? (
                    <Image
                      alt="preview"
                      fill
                      src={URL.createObjectURL(selectedImage)}
                      className="object-cover rounded"
                    />
                  ) : editing.imageUrl ? (
                    <Image
                      alt="preview"
                      fill
                      src={editing.imageUrl}
                      className="object-cover rounded"
                    />
                  ) : (
                    <FaFileUpload className="text-3xl text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setSelectedImage(file);
                  }}
                  className="w-full sm:w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={resetModal}
                  type="button"
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
