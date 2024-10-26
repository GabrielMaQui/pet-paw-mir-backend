import { PrismaClient } from '@prisma/client';
import type { Pet } from './pet.type';

const prisma = new PrismaClient();

export async function getAllPets(): Promise<Pet[]> {
  const pets = await prisma.pet.findMany();
  return pets;
}

export async function createPet(input: Pet): Promise<Pet> {
  const newPet = await prisma.pet.create({
    data: input,
  });

  return newPet;
}

export async function updatePet(id: number, input: Partial<Pet>): Promise<Pet> {
  const updatedPet = await prisma.pet.update({
    where: { id },
    data: input,
  });

  return updatedPet;
}
