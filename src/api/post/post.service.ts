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
        pet: {
          include: {
            sightings: true,
          },
        },
      },
    });
  }

  public async createPostWithPet(
    postData: CreatePostWithPetInput,
  ): Promise<Post> {
    if (!postData || !postData.petData) {
      throw new Error('Invalid input: postData or petData is missing');
    }
    try {
      const newPost = await this.prisma.$transaction(async (prisma) => {
        const newPet = await prisma.pet.create({
          data: {
            ...postData.petData,
            owner: { connect: { id: postData.userId } },
          },
        });

        const newSighting = await prisma.sighting.create({
          data: {
            pet: { connect: { id: newPet.id } },
            user: { connect: { id: postData.userId } },
            latitude: postData.sightingData.latitude,
            longitude: postData.sightingData.longitude,
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
          include: {
            pet: {
              include: {
                sightings: true,
              },
            },
          },
        });
      });
      return newPost;
    } catch (error) {
      console.error('Error creating post with pet:', error);
      throw new Error('Failed to create post with pet');
    }
  }

  public async getOnePostById(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: { id },
      include: {
        pet: {
          include: {
            sightings: true, // Incluye los avistamientos creados
          },
        },
      },
    });
  }

  public async updatePostById(
    id: number,
    postData: Partial<Post>,
  ): Promise<Post | null> {
    return await this.prisma.post.update({
      where: { id },
      data: postData,
      include: {
        pet: {
          include: {
            sightings: true, // Incluye los avistamientos creados
          },
        },
      },
    });
  }

  public async deletePostById(id: number): Promise<Post | null> {
    return await this.prisma.post.delete({
      where: { id },
      include: {
        pet: {
          include: {
            sightings: true, // Incluye los avistamientos creados
          },
        },
      },
    });
  }

  public async getPostsByUser(userId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        pet: {
          include: {
            sightings: true, // Incluye los avistamientos creados
          },
        },
      },
    });
  }
}
