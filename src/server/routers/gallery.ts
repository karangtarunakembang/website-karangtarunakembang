// server/routers/gallery.ts

import { z } from "zod";
import { galleryService } from "../service/galleryService";
import { GalleryCategory } from "@prisma/client";
import { publicProcedure, router } from "../trpc";

const GalleryCategorySchema = z.enum(GalleryCategory);

const GalleryInputSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter."),
  category: GalleryCategorySchema,
  imageUrl: z.string().url("URL gambar tidak valid."),
});

export const galleryRouter = router({
  getAll: publicProcedure.query(() => {
    return galleryService.getAllGalleries();
  }),

  create: publicProcedure.input(GalleryInputSchema).mutation(({ input }) => {
    return galleryService.createGallery(input);
  }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return galleryService.deleteGallery(input.id);
    }),

  // Update (Hanya Admin)
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: GalleryInputSchema.partial(),
      })
    )
    .mutation(({ input }) => {
      return galleryService.updateGallery(input.id, input.data);
    }),
});
