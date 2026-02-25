/*
  Warnings:

  - You are about to drop the `Branch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBranch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBranch" DROP CONSTRAINT "UserBranch_branchId_fkey";

-- DropForeignKey
ALTER TABLE "UserBranch" DROP CONSTRAINT "UserBranch_userId_fkey";

-- DropTable
DROP TABLE "Branch";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserBranch";

-- CreateTable
CREATE TABLE "Filial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Filial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fluig" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "product" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "nfluig" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "filialId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fluig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filial_email_key" ON "Filial"("email");

-- CreateIndex
CREATE INDEX "Filial_id_idx" ON "Filial"("id");

-- CreateIndex
CREATE INDEX "Filial_name_idx" ON "Filial"("name");

-- CreateIndex
CREATE INDEX "Fluig_code_idx" ON "Fluig"("code");

-- CreateIndex
CREATE INDEX "Fluig_date_idx" ON "Fluig"("date");

-- CreateIndex
CREATE INDEX "Fluig_filialId_idx" ON "Fluig"("filialId");

-- AddForeignKey
ALTER TABLE "Fluig" ADD CONSTRAINT "Fluig_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
