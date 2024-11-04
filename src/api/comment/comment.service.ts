import { PrismaClient } from '@prisma/client';
import type { Comment } from './comment.type';

const prisma = new PrismaClient();

export const createComment = async (input: Comment) => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        postId: input.postId,
        userId: input.userId,
        content: input.content,
      },
    });
    return newComment;
  } catch (error) {
    throw new Error(`Failed to create comment: ${error}`);
  }
};

export async function fetchCommentsFromDatabase(postId: number) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
    return comments;
  } catch (error) {
    console.error('Error fetching comments from database:', error);
    throw error;
  }
}
