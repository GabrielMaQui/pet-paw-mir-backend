import type { Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './user.service';

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

export async function getOneUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await updateUser(id, userData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(id);
    res.json({ message: 'Usuario eliminado correctamente', deletedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}
