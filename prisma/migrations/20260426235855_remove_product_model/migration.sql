/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `branch` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "user_branch_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "branch" SET NOT NULL;

-- DropTable
DROP TABLE "product";
