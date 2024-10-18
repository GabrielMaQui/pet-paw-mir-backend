import exp from 'node:constants';
import { PrismaClient } from '@prisma/client';
import type { Post } from './post.type';

export class PostService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllPosts(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  public async createPost(post: Post): Promise<Post> {
    const newPost = await this.prisma.post.create({ data: post });
    return newPost;
  }

  public async getOnePostById(id: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    return post;
  }

  public async updatePostById(id: string, post: Post): Promise<Post | null> {
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: post,
    });
    return updatedPost;
  }

  public async deletePostById(id: string): Promise<Post | null> {
    const deletedPost = await this.prisma.post.delete({
      where: { id },
    });
    return deletedPost;
  }

  public async getPostsByUser(userId: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        user_id: userId,
      },
    });
    return posts;
  }
}
