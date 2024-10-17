import { PrismaClient } from '@prisma/client';
import type { User } from './user.type';

const prisma = new PrismaClient();

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(input: User) {
  if (!input.password) {
    throw new Error('Password is required');
  }
  const newUser = await prisma.user.create({
    data: input,
  });

  return newUser;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function updateUser(id: string, input: Partial<User>) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: input,
  });

  return updatedUser;
}

// Eliminar un usuario
export async function deleteUser(id: string) {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  return deletedUser;
}
