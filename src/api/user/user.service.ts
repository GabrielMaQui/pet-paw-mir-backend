import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../auth/utils/crypto';
import type { User } from './user.type';

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(input: User): Promise<User> {
  if (!input.password) {
    throw new Error('Password is required');
  }

  const hashedPassword = await hashPassword(input.password);

  const data: User = {
    ...input,
    password: hashedPassword,
  };

  const newUser = await prisma.user.create({
    data,
  });

  return newUser;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function updateUser(
  id: string,
  input: Partial<User>,
): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: input,
  });

  return updatedUser;
}

// Eliminar un usuario
export async function deleteUser(id: string): Promise<User> {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  return deletedUser;
}

export async function getUserByToken(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });

  return user;
}
