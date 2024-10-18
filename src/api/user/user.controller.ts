import { add } from 'date-fns';
import type { Request, Response } from 'express';
import { sendVerificationEmail } from '../../utils/email.controller';

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
      // Generar el token aleatorio y la fecha de expiración
      const verificationToken = generateRandomToken();
      const currentDate = new Date();
      const tokenExpiresAt = add(currentDate, { days: 1 }); // Establece la expiración para 1 día después

      // Actualizar los datos del usuario con el token y la fecha de expiración
      const userWithTokenData = {
        ...userData,
        verificationToken,
        tokenExpiresAt,
      };

      // Crear el usuario con los datos actualizados
      const newUser = await createUser(userWithTokenData);

      // Enviar el correo con el token de verificación
      await sendVerificationEmail(newUser.email, newUser.name, verificationToken);

      // Responder con el nuevo usuario creado
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

export async function getOneUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  const user = await getUserById(id);

  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  } else {
    res.json(user);
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  const userData = req.body;
  const updatedUser = await updateUser(id, userData);

  if (!updateUser) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  } else {
    res.json(updatedUser);
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


function generateRandomToken(): string {
  return Math.floor(1000000 + Math.random() * 9000000).toString(); // Genera un número de 7 dígitos
}
