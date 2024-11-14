import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findChat = async (ownerId: string, friendId: string) => {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        members: {
          every: {
            id: { in: [ownerId, friendId] },
          },
        },
      },
      include: { members: true },
    });
    return chat;
  } catch (error) {
    throw new Error('Error buscando el chat');
  }
};

export const createChat = async (ownerId: string, friendId: string) => {
  try {
    const newChat = await prisma.chat.create({
      data: {
        members: {
          connect: [{ id: ownerId }, { id: friendId }],
        },
      },
      include: { members: true },
    });
    return newChat;
  } catch (error) {
    throw new Error('Error creando el chat');
  }
};

export const getChatsByUserId = async (userId: string) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    return chats;
  } catch (error) {
    throw new Error('Error obteniendo los chats del usuario');
  }
};
