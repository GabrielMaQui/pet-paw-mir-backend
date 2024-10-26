import exp from 'node:constants';
import { PrismaClient } from '@prisma/client';
import type { Pet } from '../pet/pet.type';
import type { Post } from './post.type';

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
    postData: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'pet_id'> & {
      petData: Omit<Pet, 'id' | 'created_at' | 'updated_at' | 'owner_id'>;
      userId: string;
    },
  ): Promise<Post> {
    if (!postData || !postData.petData) {
      throw new Error('postData or petData is undefined');
    }

    const newPost = await this.prisma.$transaction(async (prisma) => {
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
          titulo: postData.titulo,
          descripcion: postData.descripcion,
          etiquetas: postData.etiquetas,
          ubicacion: postData.ubicacion,
          estado: postData.estado,
          visibilidad: postData.visibilidad,
          comentarios_habilitados: postData.comentarios_habilitados,
        },
        include: { pet: true },
      });
    });

    return newPost;
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
    return await this.prisma.post.findMany({
      where: {
        user_id: userId,
      },
      include: { pet: true },
    });
  }
}
