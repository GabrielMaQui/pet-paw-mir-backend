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
}
