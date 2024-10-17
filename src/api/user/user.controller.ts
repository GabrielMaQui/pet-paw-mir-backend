import type { Request, Response } from 'express';
import { createUser, getAllUsers } from './user.service';

// Obtener todos los usuarios
export async function getAllUsersHandler(req: Request, res: Response) {
  const users = await getAllUsers();
  res.json(users);
}

// Crear un nuevo usuario
export async function createUserHandler(req: Request, res: Response) {
  const userData = req.body;
  try {
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}
