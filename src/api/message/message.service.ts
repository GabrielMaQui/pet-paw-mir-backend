import { PrismaClient } from '@prisma/client';
import type { Message } from './message.type';

const prisma = new PrismaClient();

export const createMessage = async (
  chatId: number,
  senderId: string,
  receiverId: string,
  content: string,
): Promise<Message> => {
  return prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
  });
};

export const getMessagesByChatId = async (id: number): Promise<Message[]> => {
  return prisma.message.findMany({
    where: { id },
    orderBy: { sentAt: 'asc' },
  });
};
