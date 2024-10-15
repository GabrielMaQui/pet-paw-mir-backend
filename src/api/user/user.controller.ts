import { Request, Response, NextFunction } from "express";
import { UserService } from './user.servive';

const userService = new UserService();

// Obtener todos los usuarios
export function getAllUsersHandler(req: Request, res: Response): void {
  const users = userService.getUsers();
  res.json(users);
}

// Crear un nuevo usuario
export function createUserHandler(req: Request, res: Response): void {
  const userData = req.body;

  // Validar datos antes de crear el usuario
  const validation = userService.validateUserData(userData);
  if (!validation.valid) {
      res.status(400).json({ error: validation.message });
      return;
  }

  try {
    const newUser = userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}


// Obtener un usuario por ID
export function getOneUserHandler(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const user = userService.getUserById(id);
  if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
  }
  res.json(user);
}

