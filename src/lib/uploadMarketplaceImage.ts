import { supabase } from "./supabase";

// Upload gambar untuk Marketplace
export async function uploadMarketplaceImage(file: File): Promise<string> {
  const fileName = `marketplace-${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("marketplace-images")
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabase.storage
    .from("marketplace-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

// Hapus gambar Marketplace dari Supabase
export async function deleteMarketplaceImage(publicUrl: string) {
  try {
    const path = publicUrl.split("/marketplace-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from("marketplace-images")
      .remove([path]);

    if (error) {
      console.warn("Gagal menghapus gambar marketplace:", error.message);
    } else {
      console.log("Gambar marketplace terhapus:", path);
    }
  } catch (err) {
    console.error("Error saat menghapus gambar marketplace:", err);
  }
}
