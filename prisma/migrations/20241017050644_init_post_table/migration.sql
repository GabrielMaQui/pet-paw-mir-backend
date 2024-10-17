-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT', 'BIRD', 'RABBIT', 'OTHER');

-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('PUPPY', 'YOUNG', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "PetState" AS ENUM ('LOST', 'FOUND', 'ADOPTION', 'ADOPTED');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pet_type" "PetType" NOT NULL,
    "pet_gender" "PetGender" NOT NULL,
    "pet_description" TEXT NOT NULL,
    "pet_size" "PetSize" NOT NULL,
    "pet_age" "PetAge" NOT NULL,
    "date_lost" TIMESTAMP(3) NOT NULL,
    "reward" TEXT,
    "picture" TEXT NOT NULL,
    "pet_state" "PetState" NOT NULL,
    "tags" TEXT[],
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
