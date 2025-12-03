import { supabase } from "./supabase";

// Upload gambar untuk Program
export async function uploadProgramImage(file: File): Promise<string> {
  const fileName = `program-${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("program-images")
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabase.storage
    .from("program-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

// Hapus gambar Program dari Supabase
export async function deleteProgramImage(publicUrl: string) {
  try {
    const path = publicUrl.split("/program-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from("program-images")
      .remove([path]);

    if (error) {
      console.warn("Gagal menghapus gambar lama:", error.message);
    } else {
      console.log("Gambar program terhapus:", path);
    }
  } catch (err) {
    console.error("Error saat menghapus gambar program:", err);
  }
}
