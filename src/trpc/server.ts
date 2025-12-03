import { appRouter } from "@/server";
import { createContext } from "@/server/context";

export const api = appRouter.createCaller(await createContext());
