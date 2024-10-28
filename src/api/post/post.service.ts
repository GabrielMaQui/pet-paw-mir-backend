import { PrismaClient } from '@prisma/client';

import { decodeToken } from '../../auth/auth.service';
import type { Pet } from '../Pet/Pet.type';
import type { CreatePostWithPetInput, Post } from './post.type';

export class PostService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        Pet: true,
      },
    });
  }

  public async createPostWithPet(
    postData: CreatePostWithPetInput,
  ): Promise<Post> {
    if (!postData || !postData.PetData) {
      throw new Error('postData or PetData is undefined');
    }

    const newPost = await this.prisma.$transaction(async (prisma) => {
      const newPet = await prisma.Pet.create({
        data: {
          ...postData.PetData,
          owner: { connect: { id: postData.userId } },
        },
      });

      return await prisma.post.create({
        data: {
          user: { connect: { id: postData.userId } },
          Pet: { connect: { id: newPet.id } },
          title: postData.title,
          description: postData.description,
          tags: postData.tags,
          location: postData.location,
          state: postData.state,
          visibility: postData.visibility,
          commentsEnabled: postData.commentsEnabled,
        },
        include: { Pet: true },
      });
    });

    return newPost;
  }

  public async getOnePostById(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: { id },
      include: { Pet: true },
    });
  }

  public async updatePostById(
    id: number,
    postData: Partial<Post>,
  ): Promise<Post | null> {
    return await this.prisma.post.update({
      where: { id },
      data: postData,
      include: { Pet: true },
    });
  }

  public async deletePostById(id: number): Promise<Post | null> {
    return await this.prisma.post.delete({
      where: { id },
      include: { Pet: true },
    });
  }

  public async getPostsByUser(userId: string): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: { Pet: true },
    });
  }
}
