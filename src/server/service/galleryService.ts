import { PrismaClient, Gallery, GalleryCategory } from "@prisma/client";

const prisma = new PrismaClient();

type CreateGalleryInput = {
  title: string;
  category: GalleryCategory;
  imageUrl: string;
};

type UpdateGalleryInput = Partial<CreateGalleryInput>;

export const galleryService = {
  async getAllGalleries(): Promise<Gallery[]> {
    return await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async createGallery(data: CreateGalleryInput): Promise<Gallery> {
    return await prisma.gallery.create({ data });
  },

  async deleteGallery(id: number): Promise<Gallery> {
    return await prisma.gallery.delete({
      where: { id },
    });
  },

  async updateGallery(id: number, data: UpdateGalleryInput): Promise<Gallery> {
    return await prisma.gallery.update({
      where: { id },
      data: data,
    });
  },
};
