import { PrismaClient } from '@prisma/client';
import type { Pet, PetData } from './pet.type';

const prisma = new PrismaClient();

export async function getAllPets(): Promise<Pet[]> {
  const pets = await prisma.pet.findMany();
  return pets;
}

export async function createPet(
  petData: PetData,
  userId: string,
): Promise<Pet> {
  const newPet = await prisma.pet.create({
    data: {
      ...petData,
      owner: { connect: { id: userId } },
    },
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
