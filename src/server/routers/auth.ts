import { publicProcedure, router } from "../trpc";
import { registerSchema, loginSchema } from "@/server/validation/authSchema";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "@/server/service/authService";

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await registerUser(ctx, input);
      return user;
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const result = await loginUser(ctx, input);
    return result;
  }),

  logout: publicProcedure.mutation(async () => {
    const result = await logoutUser();
    return result;
  }),
});
