/*
  Warnings:

  - You are about to drop the column `active` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "active",
DROP COLUMN "price",
DROP COLUMN "sector",
ALTER COLUMN "stock" SET DATA TYPE TEXT,
ALTER COLUMN "cost" SET DATA TYPE TEXT;
