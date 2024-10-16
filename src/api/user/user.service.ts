import type { User } from './user.type';

//TODO : Falta implementación de Prisma
export class UserService {
  //Servicio basado en lista
  private users: User[] = [];

  // Agregar un usuario
  public createUser(
    userData: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ): User {
    const newUser: User = {
      ...userData,
      id: Date.now(), // Generar ID simple
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  // Encontrar un usuario por ID
  public getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

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
}
