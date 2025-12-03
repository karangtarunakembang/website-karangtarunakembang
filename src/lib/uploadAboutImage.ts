import { supabase } from "./supabase";

// Upload gambar baru
export async function uploadAboutImage(file: File): Promise<string> {
  const fileName = `about-${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("about-images")
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabase.storage
    .from("about-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

// Hapus gambar lama dari storage Supabase
export async function deleteAboutImage(publicUrl: string) {
  try {
    const path = publicUrl.split("/about-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from("about-images")
      .remove([path]);

    if (error) {
      console.warn("Gagal menghapus gambar lama:", error.message);
    } else {
      console.log("Gambar lama berhasil dihapus:", path);
    }
  } catch (err) {
    console.error("Error saat menghapus gambar:", err);
  }
}
