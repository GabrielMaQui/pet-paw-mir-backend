/*
  Warnings:

  - You are about to drop the column `breed` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `eyeColor` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `fur` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "breed",
DROP COLUMN "eyeColor",
DROP COLUMN "fur";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "phoneNumber";
