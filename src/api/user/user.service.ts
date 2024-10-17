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
