import { PrismaClient } from '@prisma/client';
import type { User } from './user.type';

//TODO : Falta implementación de Prisma
export class UserService {
  //Servicio basado en lista
  private users: User[] = [];
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Agregar un usuario
  public async createUser(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });

    return newUser;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  // Encontrar un usuario por ID
  public async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  /*
  public validateUserData(userData: Partial<User>): {
    valid: boolean;
    message?: string;
  } {
    const { nombre, apellido, correo_electronico, contrasena } = userData;

    if (!nombre || !apellido || !correo_electronico || !contrasena) {
      return { valid: false, message: 'Faltan datos obligatorios' };
    }

    return { valid: true };
  }
  */
}
