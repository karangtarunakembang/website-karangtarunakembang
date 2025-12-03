import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import {
  listMarketplace,
  getMarketplaceBySlug,
  getRelatedMarketplace,
  createMarketplace,
  updateMarketplace,
  deleteMarketplace,
} from "@/server/service/marketplaceService";
import { MarketplaceCategory, MarketplaceInput } from "@/types";

export const marketplaceRouter = router({
  list: publicProcedure.query(() => {
    return listMarketplace();
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => {
      return getMarketplaceBySlug(input.slug);
    }),

  getRelated: publicProcedure
    .input(
      z.object({
        category: z.enum(MarketplaceCategory).optional(),
        excludeSlug: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return getRelatedMarketplace(input as MarketplaceInput);
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        category: z.enum(MarketplaceCategory),
        description: z.string(),
        noHp: z.string().nullable().optional(),
        imageUrl: z.string().nullable().optional(),
      })
    )
    .mutation(({ input }) => createMarketplace(input as MarketplaceInput)),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
        category: z.enum(MarketplaceCategory),
        description: z.string(),
        noHp: z.string().nullable().optional(),
        imageUrl: z.string().nullable().optional(),
      })
    )
    .mutation(({ input }) => updateMarketplace(input as MarketplaceInput)),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteMarketplace(input.id)),
});
