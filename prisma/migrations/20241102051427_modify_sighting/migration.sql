/*
  Warnings:

  - You are about to drop the column `description` on the `Sighting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[petId]` on the table `Sighting` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sighting" DROP COLUMN "description";

-- CreateIndex
CREATE UNIQUE INDEX "Sighting_petId_key" ON "Sighting"("petId");
