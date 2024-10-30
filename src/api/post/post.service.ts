import { PrismaClient } from '@prisma/client';

import type { CreatePostWithPetInput, Post } from './post.type';

export class PostService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        pet: true,
      },
    });
  }

  public async createPostWithPet(
    postData: CreatePostWithPetInput,
  ): Promise<Post> {
    if (!postData || !postData.petData) {
      throw new Error('postData or petData is undefined');
    }

    return await this.prisma.$transaction(async (prisma) => {
      const newPet = await prisma.pet.create({
        data: {
          ...postData.petData,
          owner: { connect: { id: postData.userId } },
        },
      });

      return await prisma.post.create({
        data: {
          user: { connect: { id: postData.userId } },
          pet: { connect: { id: newPet.id } },
          title: postData.title,
          description: postData.description,
          tags: postData.tags,
          location: postData.location,
          state: postData.state,
          visibility: postData.visibility,
          commentsEnabled: postData.commentsEnabled,
        },
        include: { pet: true },
      });
    });
  }

  public async getOnePostById(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: { id },
      include: { pet: true },
    });
  }

  public async updatePostById(
    id: number,
    postData: Partial<Post>,
  ): Promise<Post | null> {
    return await this.prisma.post.update({
      where: { id },
      data: postData,
      include: { pet: true },
    });
  }

  public async deletePostById(id: number): Promise<Post | null> {
    return await this.prisma.post.delete({
      where: { id },
      include: { pet: true },
    });
  }

  public async getPostsByUser(userId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: { pet: true },
    });
  }
}
