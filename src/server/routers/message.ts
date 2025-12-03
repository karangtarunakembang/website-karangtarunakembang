import { messageService } from "../service/messageService";
import { publicProcedure, router } from "../trpc";
import { messageSchema } from "../validation/messageSchema";
import { z } from "zod";

export const messageRouter = router({
  create: publicProcedure.input(messageSchema).mutation(async ({ input }) => {
    const comment = await messageService.createComment(input);
    return comment;
  }),

  getAll: publicProcedure.query(async () => {
    const comments = await messageService.getAllComments();
    return comments;
  }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const deleted = await messageService.deleteComment(input.id);
      return deleted;
    }),
});
