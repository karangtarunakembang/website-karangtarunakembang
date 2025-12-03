import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import {
  listPrograms,
  getProgram,
  getProgramBySlug,
  getRelatedPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from "@/server/service/programService";
import { ProgramCategory, ProgramInput, ProgramUpdateInput } from "@/types";

const ProgramCategoryValues = Object.values(ProgramCategory) as [
  ProgramCategory,
  ...ProgramCategory[]
];

const ProgramCategoryZod = z.enum(ProgramCategoryValues);

export const programRouter = router({
  list: publicProcedure
    .input(
      z
        .object({ take: z.number().optional(), skip: z.number().optional() })
        .optional()
    )
    .query(({ ctx, input }) => {
      return listPrograms(ctx, input!);
    }),

  get: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return getProgram(ctx, input.slug);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return getProgramBySlug(ctx, input.slug);
    }),

  getRelated: publicProcedure.query(({ ctx }) => {
    return getRelatedPrograms(ctx);
  }),

  create: publicProcedure
    .input(
      z.object({
        slug: z.string().min(3),
        title: z.string(),
        date: z.string(),
        description: z.string(),
        imageUrl: z.string().nullable().optional(),
        category: ProgramCategoryZod,
        location: z.string().nullable().optional(),
      })
    )
    .mutation(({ input }) => {
      return createProgram(input as ProgramInput);
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        slug: z.string(),
        title: z.string(),
        date: z.string(),
        description: z.string(),
        imageUrl: z.string().nullable().optional(),
        category: ProgramCategoryZod,
        location: z.string().nullable().optional(),
      })
    )
    .mutation(({ input }) => {
      return updateProgram(input as ProgramUpdateInput);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return deleteProgram(ctx, input.id);
    }),
});
