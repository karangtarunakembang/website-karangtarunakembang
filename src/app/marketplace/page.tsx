import Marketplace from "@/components/Marketplace";
import MarketplaceNavbar from "@/components/MarketplaceNavbar";

export const metadata = {
  title: "Marketplace Dusun Kembang",
  description: "Jelajahi UMKM, event, wisata, dan café di Dusun Kembang.",
};

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <MarketplaceNavbar />
      <Marketplace />
    </main>
  );
}
