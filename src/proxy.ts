import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ambil token dari cookie
  const token = req.cookies.get("token")?.value;

  // Lindungi semua route /admin/ dan /auth/register dengan middleware
  if (pathname.startsWith("/admin") || pathname.startsWith("/auth/register")) {
    if (!token) {
      // Tidak ada token -> redirect ke login
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      // Verifikasi token
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.error("Invalid JWT:", err);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Kalau sudah login tidak boleh buka halaman login lagi
  if (pathname.startsWith("/auth/login") && token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/", req.url));
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Path yang diawasi middleware
export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
