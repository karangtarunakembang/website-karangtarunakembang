export type MessageFormData = {
  name: string;
  email: string;
  message: string;
};

export type ProgramInput = {
  slug: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string | null;
  category: ProgramCategory;
  location?: string | null;
};

export type ProgramUpdateInput = {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string | null;
  category: ProgramCategory;
  location?: string | null;
};

export type ProgramItem = {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl: string | null;
  date: Date;
  category: string;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type MarketplaceItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  noHp: string | null;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type MarketplaceInput = {
  id?: number;
  title: string;
  slug: string;
  category: MarketplaceCategory;
  description: string;
  imageUrl?: string | null;
  noHp?: string | null;
};

export enum MarketplaceCategory {
  Umkm = "UMKM",
  Wisata = "Wisata",
  Cafe = "Cafe",
  Event = "Event",
  Accommodation = "Accommodation",
}

export enum ProgramCategory {
  SOSIAL = "SOSIAL",
  BUDAYA = "BUDAYA",
  PENDIDIKAN = "PENDIDIKAN",
  LINGKUNGAN = "LINGKUNGAN",
}

export type MarketplaceCategoryType = keyof typeof MarketplaceCategory;
export type ProgramCategoryType = keyof typeof ProgramCategory;
