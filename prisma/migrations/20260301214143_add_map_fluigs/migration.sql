/*
  Warnings:

  - You are about to drop the `Fluig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fluig" DROP CONSTRAINT "Fluig_userId_fkey";

-- DropTable
DROP TABLE "Fluig";

-- CreateTable
CREATE TABLE "fluig" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "product" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "nFluig" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "costTotal" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "fluig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fluig_code_idx" ON "fluig"("code");

-- CreateIndex
CREATE INDEX "fluig_date_idx" ON "fluig"("date");

-- CreateIndex
CREATE INDEX "fluig_userId_idx" ON "fluig"("userId");

-- AddForeignKey
ALTER TABLE "fluig" ADD CONSTRAINT "fluig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
