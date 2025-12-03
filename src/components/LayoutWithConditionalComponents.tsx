"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWithConditionalComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isExcludedNavbar =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/marketplace");

  const isExcludeFooter =
    pathname.startsWith("/admin") || pathname.startsWith("/auth");

  return (
    <>
      {!isExcludedNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isExcludeFooter && <Footer />}
    </>
  );
}
