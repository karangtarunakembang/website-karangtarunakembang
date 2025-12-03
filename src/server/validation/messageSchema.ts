import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(1, "Message is required"),
});

export type messageInput = z.infer<typeof messageSchema>;
