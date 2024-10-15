-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Usuario', 'Administrador');

-- CreateEnum
CREATE TYPE "PreferredLanguage" AS ENUM ('es', 'en');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Habilitado', 'Deshabilitado');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "foto_perfil" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "numero_contacto" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "correo_electronico" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'Usuario',
    "idioma_preferido" "PreferredLanguage" NOT NULL DEFAULT 'es',
    "modo_nocturno" BOOLEAN NOT NULL DEFAULT false,
    "estado" "UserStatus" NOT NULL DEFAULT 'Habilitado',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_correo_electronico_key" ON "Users"("correo_electronico");
