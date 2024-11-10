import type { Favorite as FavoritePrisma } from '@prisma/client';

export type Favorite = FavoritePrisma;

export type CreateFavoriteInput = {
  userId: string;
  postId: string;
};
