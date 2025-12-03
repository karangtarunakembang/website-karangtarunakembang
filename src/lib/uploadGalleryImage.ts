import { supabase } from "./supabase";

export async function uploadGalleryImage(file: File): Promise<string> {
  const fileName = `gallery-${Date.now()}-${file.name.replace(/\s/g, "_")}`;

  // 1. Upload file
  const { error: uploadError } = await supabase.storage
    .from("gallery-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Supabase Upload Error:", uploadError.message);
    throw new Error(`Gagal mengunggah gambar: ${uploadError.message}`);
  }

  // 2. Mendapatkan URL publik
  const { data: publicUrlData } = supabase.storage
    .from("gallery-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

export async function deleteGalleryImage(publicUrl: string) {
  try {
    // Ekstrak path/nama file dari URL
    const path = publicUrl.split("/gallery-images/")[1];
    if (!path) {
      console.warn("URL Galeri tidak valid, tidak dapat menghapus:", publicUrl);
      return;
    }

    const { error } = await supabase.storage
      .from("gallery-images")
      .remove([path]);

    if (error) {
      console.warn("Gagal menghapus gambar galeri:", error.message);
    } else {
      console.log("Gambar galeri terhapus:", path);
    }
  } catch (err) {
    console.error("Error saat menghapus gambar galeri:", err);
  }
}
