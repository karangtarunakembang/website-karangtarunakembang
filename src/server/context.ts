import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/server/service/tokenService";
import { tokenTypes } from "@/constants/config/tokens";
import { cookies } from "next/headers";

export async function createContext() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let dbUser = null;

  if (token) {
    try {
      const payload = await verifyToken(token, tokenTypes.ACCESS);

      dbUser = await prisma.user.findUnique({
        where: { id: payload.sub },
      });
    } catch (err) {
      console.log("Invalid or expired token:", err);
    }
  }

  return {
    prisma,
    dbUser,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
