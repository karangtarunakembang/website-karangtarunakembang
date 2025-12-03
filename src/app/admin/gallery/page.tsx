"use client";

import { useState } from "react";
import Image from "next/image";
import { FaFileUpload } from "react-icons/fa";
import { X, Loader2, Save } from "lucide-react";

import { trpc } from "@/trpc/client";
import { Gallery, GalleryCategory } from "@prisma/client";
import {
  deleteGalleryImage,
  uploadGalleryImage,
} from "@/lib/uploadGalleryImage";
import toast from "react-hot-toast";

type EditGalleryForm = {
  id?: number;
  title: string;
  category: GalleryCategory;
  imageUrl?: string;
};

// --- Komponen Utama ---
export default function AdminGalleryPage() {
  const ctx = trpc.useContext();
  const dataQuery = trpc.gallery.getAll.useQuery();

  // Mutations
  const createMutation = trpc.gallery.create.useMutation({
    onSuccess: () => {
      ctx.gallery.getAll.invalidate();
      resetModal();
      toast.success("Gallery berhasil ditambahkan!");
    },

    onError: () => {
      toast.error(`Gagal membuat gallery!`);
    },
  });

  const updateMutation = trpc.gallery.update.useMutation({
    onSuccess: () => {
      ctx.gallery.getAll.invalidate();
      resetModal();
      toast.success("Gallery berhasil diperbarui!");
    },

    onError: () => {
      toast.error(`Gagal memperbarui gallery!`);
    },
  });

  const deleteMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      ctx.gallery.getAll.invalidate();
      toast.success("Gallery berhasil dihapus.");
    },

    onError: (error) => {
      toast.error(`Gagal menghapus gallery: ${error.message}`);
    },
  });

  const [editing, setEditing] = useState<EditGalleryForm | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (dataQuery.isLoading)
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-start gap-4 animate-pulse"
            >
              {/* Skeleton gambar */}
              <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>

              {/* Skeleton text */}
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>

              {/* Skeleton tombol */}
              <div className="flex gap-2">
                <div className="h-10 w-16 bg-gray-200 rounded"></div>
                <div className="h-10 w-16 bg-gray-200 rounded"></div>
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

  const handleSubmit = async () => {
    if (!editing || (editing.id && !editing.imageUrl && !selectedImage)) return;

    // Validasi dasar
    if (!editing.title) {
      alert("Judul harus diisi.");
      return;
    }

    setUploading(true);
    let finalImageUrl = editing.imageUrl ?? "";

    try {
      if (selectedImage) {
        // 1. Jika ini item lama DAN ada gambar baru, hapus gambar lama dulu
        if (editing.id && editing.imageUrl) {
          await deleteGalleryImage(editing.imageUrl);
        }
        // 2. Upload gambar baru
        finalImageUrl = await uploadGalleryImage(selectedImage);
      }

      const payload = {
        title: editing.title,
        category: editing.category,
        imageUrl: finalImageUrl,
      };

      // 3. Panggil tRPC
      if (editing.id) {
        // Update
        await updateMutation.mutateAsync({
          id: editing.id,
          data: payload,
        });
      } else {
        // Create
        await createMutation.mutateAsync(payload);
      }

      resetModal();
    } catch (error) {
      console.error("Error saat menyimpan/mengunggah:", error);
      alert(
        `Gagal menyimpan data: ${
          error instanceof Error ? error.message : "Terjadi kesalahan."
        }`
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto text-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mt-3">
          Galeri Kegiatan
        </h1>
        <button
          onClick={() =>
            setEditing({
              title: "",
              category: GalleryCategory.UMKM,
            })
          }
          className="inline-flex items-center justify-center gap-2 bg-[#1581bc] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#1895d9] transition duration-200 w-full sm:w-auto text-sm font-semibold"
        >
          + Tambah Item
        </button>
      </div>

      {/* List Items */}
      <div className="grid gap-4">
        {dataQuery.data?.map((item: Gallery) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-100"
          >
            <div className="flex items-start gap-4 grow w-full">
              {/* Gambar Item */}
              <Image
                src={item.imageUrl ?? "/placeholder-400x300.png"}
                alt={item.title}
                width={80}
                height={60}
                className="w-20 h-16 object-cover rounded-lg shrink-0"
              />

              {/* Detail Item */}
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-semibold text-gray-800 block text-base leading-tight">
                  {item.title}
                </span>
                <span className="text-xs text-[#1581bc] font-medium bg-blue-100 px-2 py-0.5 rounded-full inline-block mt-1 uppercase max-w-fit">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Aksi */}
            <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() =>
                  setEditing({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    imageUrl: item.imageUrl,
                  })
                }
                className="lg:min-w-20 px-4 py-2 text-black text-sm rounded-lg border
                border-gray-950 hover:bg-gray-100 transition-colors duration-200 flex-1 cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  if (confirm(`Yakin ingin menghapus item "${item.title}"?`)) {
                    // 1. Hapus gambar dari Supabase
                    if (item.imageUrl) await deleteGalleryImage(item.imageUrl);

                    // 2. Hapus data dari database
                    deleteMutation.mutate({ id: item.id });
                  }
                }}
                disabled={deleteMutation.isPending}
                // Gaya tombol Hapus modern (Rose)
                className="lg:min-w-20 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition duration-200 flex-1 disabled:opacity-50 cursor-pointer"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  "Hapus"
                )}
              </button>
            </div>
          </div>
        ))}
        {/* State Kosong (Jika tidak ada data) */}
        {dataQuery.data?.length === 0 && (
          <div className="p-8 text-center text-gray-500 border border-dashed rounded-xl bg-gray-50 mt-4">
            <p className="font-semibold">Tidak ada item galeri ditemukan.</p>
            <p className="text-sm">
              Klik &quot;Tambah Item&quot; untuk memulai.
            </p>
          </div>
        )}
      </div>

      {/* Modal Form (Tambah & Edit) */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto pt-40 md:pt-0">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-2xl my-8 mt-56 md:mt-0">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
              onClick={resetModal}
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold mb-5 text-gray-800 border-b pb-3">
              {editing.id ? "Edit Item Galeri" : "Tambah Item Galeri Baru"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {/* Judul & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Foto/Kegiatan
                  </label>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        category: e.target.value as GalleryCategory,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    {Object.values(GalleryCategory).map((cat: string) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-6 border p-4 rounded-lg bg-gray-50">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Gambar (Max. 1MB)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Pratinjau Gambar */}
                  <div className="relative w-full h-32 sm:w-32 sm:h-24 bg-white rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300 shrink-0">
                    {selectedImage || editing.imageUrl ? (
                      <Image
                        alt="Pratinjau Gambar"
                        fill
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : editing.imageUrl!
                        }
                        className="object-cover"
                      />
                    ) : (
                      <FaFileUpload className="text-3xl text-gray-400" />
                    )}
                  </div>

                  {/* Input File */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setSelectedImage(file);
                    }}
                    className="w-full sm:w-auto text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
                  />
                </div>
                {editing.imageUrl && !selectedImage && (
                  <p className="text-xs text-gray-500 mt-2">
                    Gambar saat ini sudah tersimpan.
                  </p>
                )}
                {selectedImage && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    PERHATIAN: Gambar baru akan menggantikan gambar lama setelah
                    disimpan.
                  </p>
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetModal}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={
                    uploading ||
                    createMutation.isPending ||
                    updateMutation.isPending
                  }
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 text-sm font-medium disabled:opacity-50"
                >
                  {uploading ||
                  createMutation.isPending ||
                  updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" /> Simpan
                    </>
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
