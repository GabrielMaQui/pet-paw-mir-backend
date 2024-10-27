import type {
  PetAge,
  PetGender,
  PetSize,
  Post as PostPrisma,
} from '@prisma/client';
import type { PetState, PetType, Visibility } from '@prisma/client';

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
  petData: {
    name: string;
    petType: PetType;
    breed: string | null;
    fur: string | null;
    eyeColor: string | null;
    gender: PetGender;
    age: PetAge;
    size: PetSize;
    state: PetState;
    description: string | null;
    imageUrl: string | null;
    validated: boolean;
  };
};
