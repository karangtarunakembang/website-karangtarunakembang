import { prisma } from "@/lib/prisma";
import { MarketplaceCategory, MarketplaceInput } from "@/types";
import { TRPCError } from "@trpc/server";

export const listMarketplace = async () => {
  return await prisma.marketplaceItem.findMany({
    orderBy: { createdAt: "asc" },
  });
};

export const getMarketplaceBySlug = async (slug: string) => {
  const item = await prisma.marketplaceItem.findUnique({
    where: { slug },
  });

  if (!item) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Item tidak ditemukan" });
  }

  return item;
};

export const getRelatedMarketplace = async (input: {
  category?: MarketplaceCategory;
  excludeSlug?: string;
}) => {
  return await prisma.marketplaceItem.findMany({
    where: {
      category: input.category,
      slug: { not: input.excludeSlug },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      imageUrl: true,
      category: true,
    },
  });
};

export const createMarketplace = async (input: MarketplaceInput) => {
  const cleanSlug = input.slug
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return await prisma.marketplaceItem.create({
    data: {
      title: input.title,
      slug: cleanSlug,
      category: input.category,
      description: input.description,
      imageUrl: input.imageUrl ?? null,
      noHp: input.noHp ?? null,
    },
  });
};

export const updateMarketplace = async (input: MarketplaceInput) => {
  if (!input.id) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "ID is required for update",
    });
  }

  const cleanSlug = input.slug
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return await prisma.marketplaceItem.update({
    where: { id: input.id },
    data: {
      title: input.title,
      slug: cleanSlug,
      category: input.category,
      description: input.description,
      imageUrl: input.imageUrl ?? null,
      noHp: input.noHp ?? null,
    },
  });
};

export const deleteMarketplace = async (id: number) => {
  return await prisma.marketplaceItem.delete({
    where: { id },
  });
};
