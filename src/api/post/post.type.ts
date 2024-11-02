import type { Post as PostPrisma } from '@prisma/client';
import type { PetState, PetType, Visibility } from '@prisma/client';
import type { PetData } from '../pet/pet.type';

export type Post = PostPrisma;

export type CreatePostWithPetInput = {
  title: string;
  description: string;
  tags: string;
  location: string;
  state: PetState;
  visibility: Visibility;
  commentsEnabled: boolean;
  userId: string;
  petData: PetData;
  sightingData: {
    latitude: number;
    longitude: number;
  };
};
