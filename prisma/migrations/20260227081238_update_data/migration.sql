/*
  Warnings:

  - Added the required column `filialId` to the `Enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enterprise" ADD COLUMN     "filialId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Fluig" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "date" DROP DEFAULT;
