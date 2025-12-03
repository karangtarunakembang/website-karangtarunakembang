import { prisma } from "@/lib/prisma";
import { messageInput } from "../validation/messageSchema";

export const messageService = {
  async createComment(data: messageInput) {
    return await prisma.message.create({
      data,
    });
  },

  async getAllComments() {
    return await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async deleteComment(id: string) {
    return await prisma.message.delete({
      where: { id },
    });
  },
};
