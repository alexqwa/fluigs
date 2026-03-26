/*
  Warnings:

  - You are about to drop the `jwks` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `fluig` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "fluig_code_idx";

-- DropIndex
DROP INDEX "fluig_date_idx";

-- AlterTable
ALTER TABLE "fluig" ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "jwks";
