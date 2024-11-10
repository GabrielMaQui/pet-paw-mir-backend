import type {
  PetAge,
  PetGender,
  Pet as PetModel,
  PetSize,
  PetState,
  PetType,
} from '@prisma/client';

export type Pet = PetModel;

export type PetData = {
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
