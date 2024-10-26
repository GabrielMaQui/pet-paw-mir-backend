/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - The `id` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Favorite` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sentAt` on the `Message` table. All the data in the column will be lost.
  - The `id` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date_lost` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pet_age` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pet_description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pet_gender` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pet_size` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pet_state` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pet_type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `reward` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Post` table. All the data in the column will be lost.
  - The `id` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `darkMode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `preferredLanguage` on the `User` table. All the data in the column will be lost.
  - Added the required column `contenido` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenido` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLICO', 'PRIVADO');

-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDIENTE', 'RESUELTO', 'DESESTIMADO');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_postId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropIndex
DROP INDEX "Post_date_lost_user_id_key";

-- DropIndex
DROP INDEX "Post_name_id_key";

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "content",
DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "contenido" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" BIGINT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" BIGINT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("user_id", "post_id");

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "content",
DROP COLUMN "receiverId",
DROP COLUMN "senderId",
DROP COLUMN "sentAt",
ADD COLUMN     "contenido" TEXT NOT NULL,
ADD COLUMN     "receiver_id" TEXT NOT NULL,
ADD COLUMN     "sender_id" TEXT NOT NULL,
ADD COLUMN     "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "date_lost",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "name",
DROP COLUMN "pet_age",
DROP COLUMN "pet_description",
DROP COLUMN "pet_gender",
DROP COLUMN "pet_size",
DROP COLUMN "pet_state",
DROP COLUMN "pet_type",
DROP COLUMN "picture",
DROP COLUMN "reward",
DROP COLUMN "tags",
ADD COLUMN     "comentarios_habilitados" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descripcion" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "estado" "PetState" NOT NULL,
ADD COLUMN     "etiquetas" TEXT,
ADD COLUMN     "pet_id" BIGINT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD COLUMN     "ubicacion" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visibilidad" "Visibility" NOT NULL DEFAULT 'PUBLICO',
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "darkMode",
DROP COLUMN "preferredLanguage",
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'No especificado';

-- CreateTable
CREATE TABLE "Pet" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_animal" "PetType" NOT NULL,
    "raza" TEXT,
    "pelaje" TEXT,
    "color_ojos" TEXT,
    "sexo" "PetGender" NOT NULL,
    "edad" "PetAge" NOT NULL,
    "tamano" "PetSize" NOT NULL,
    "estado" "PetState" NOT NULL,
    "descripcion" TEXT,
    "imagen_url" TEXT,
    "validado" BOOLEAN NOT NULL DEFAULT false,
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionRequest" (
    "id" BIGSERIAL NOT NULL,
    "pet_id" BIGINT NOT NULL,
    "adopter_id" TEXT NOT NULL,
    "estado" "AdoptionStatus" NOT NULL DEFAULT 'PENDIENTE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdoptionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" BIGSERIAL NOT NULL,
    "tipo_elemento" TEXT NOT NULL,
    "elemento_id" BIGINT NOT NULL,
    "reported_by_id" TEXT NOT NULL,
    "razon" TEXT NOT NULL,
    "estado" "ReportStatus" NOT NULL DEFAULT 'PENDIENTE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFollows" (
    "follower_id" TEXT NOT NULL,
    "followed_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFollows_pkey" PRIMARY KEY ("follower_id","followed_id")
);

-- CreateTable
CREATE TABLE "Sighting" (
    "id" BIGSERIAL NOT NULL,
    "pet_id" BIGINT NOT NULL,
    "user_id" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sighting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "privacidad_cuenta" "Visibility" NOT NULL DEFAULT 'PUBLICO',
    "cuenta_bloqueada" BOOLEAN NOT NULL DEFAULT false,
    "bloqueados" TEXT,
    "idioma" "PreferredLanguage" NOT NULL DEFAULT 'ES',
    "apariencia_modo_nocturno" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_user_id_key" ON "Setting"("user_id");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_adopter_id_fkey" FOREIGN KEY ("adopter_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reported_by_id_fkey" FOREIGN KEY ("reported_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_followed_id_fkey" FOREIGN KEY ("followed_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sighting" ADD CONSTRAINT "Sighting_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sighting" ADD CONSTRAINT "Sighting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
