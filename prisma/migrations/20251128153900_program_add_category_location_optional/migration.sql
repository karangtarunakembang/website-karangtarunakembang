/*
  Warnings:

  - You are about to drop the `About` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HeroSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProgramCategory" AS ENUM ('SOSIAL', 'BUDAYA', 'PENDIDIKAN', 'LINGKUNGAN');

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "category" "ProgramCategory",
ADD COLUMN     "location" TEXT;

-- DropTable
DROP TABLE "public"."About";

-- DropTable
DROP TABLE "public"."HeroSection";
