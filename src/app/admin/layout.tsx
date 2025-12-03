import { Metadata } from "next";
import AdminLayoutContent from "./AdminLayoutContent";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel",
    template: "%s | Admin Karang Taruna",
  },
  description: "Panel administrasi Karang Taruna Dusun Kembang.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </body>
    </html>
  );
}
