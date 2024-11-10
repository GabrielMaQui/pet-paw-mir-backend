import { PrismaClient } from '@prisma/client';

export class FavoriteRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllFavorites(idUser: string) {
    return this.prisma.favorite.findMany({
      where: {
        userId: idUser,
      },
    });
  }

  public async createFavorite(userId: string, postId: number) {
    return this.prisma.favorite.create({
      data: {
        userId,
        postId,
      },
    });
  }

  public async deleteFavorite(userId: string, postId: number) {
    return this.prisma.favorite.deleteMany({
      where: {
        userId,
        postId,
      },
    });
  }
}
