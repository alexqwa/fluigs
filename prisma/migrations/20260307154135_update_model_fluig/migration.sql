/*
  Warnings:

  - Added the required column `cost` to the `fluig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fluig" ADD COLUMN     "cost" TEXT NOT NULL;
