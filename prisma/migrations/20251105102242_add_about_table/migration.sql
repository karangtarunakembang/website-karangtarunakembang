-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "visi" TEXT,
    "misi" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);
