-- CreateEnum
CREATE TYPE "Status" AS ENUM ('approved', 'not_approved', 'pending');

-- CreateTable
CREATE TABLE "Fluig" (
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

    CONSTRAINT "Fluig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Fluig_code_idx" ON "Fluig"("code");

-- CreateIndex
CREATE INDEX "Fluig_date_idx" ON "Fluig"("date");

-- CreateIndex
CREATE INDEX "Fluig_userId_idx" ON "Fluig"("userId");

-- AddForeignKey
ALTER TABLE "Fluig" ADD CONSTRAINT "Fluig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
