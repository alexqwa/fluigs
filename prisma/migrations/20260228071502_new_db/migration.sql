/*
  Warnings:

  - You are about to drop the `Enterprise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fluig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enterprise" DROP CONSTRAINT "Enterprise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Fluig" DROP CONSTRAINT "Fluig_enterpriseId_fkey";

-- DropTable
DROP TABLE "Enterprise";

-- DropTable
DROP TABLE "Fluig";
