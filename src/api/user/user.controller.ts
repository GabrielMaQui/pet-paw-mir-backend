import type { User } from '@prisma/client';
import { NextFunction, type Request, type Response } from 'express';
import { UserService } from './user.service';

const userService = new UserService();

// Obtener todos los usuarios
export async function getAllUsersHandler(req: Request, res: Response) {
  const users = await userService.getAllUsers();
  res.json(users);
}

// Crear un nuevo usuario
export async function createUserHandler(req: Request, res: Response) {
  const data = req.body as User;

  // Validar datos antes de crear el usuario
  /*const validation = userService.validateUserData(userData);
  if (!validation.valid) {
    res.status(400).json({ error: validation.message });
    return;
  }*/

  try {
    const newUser = await userService.createUser(data);

    // Send Email

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

// Obtener un usuario por ID
export function getOneUserHandler(req: Request, res: Response): void {
  const id = req.params.id;
  const user = userService.getUserById(id);
  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }
  res.json(user);
}
