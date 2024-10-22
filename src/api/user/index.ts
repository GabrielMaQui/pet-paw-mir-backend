import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
  updateUserHandler,
} from './user.controller';

//Manejador de rutas
const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna una lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 */
router.get('/', getAllUsersHandler);

// Crear un nuevo usuario
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               role:
 *                 type: string
 *                 enum: [USER, ADMINISTRADOR]
 *                 description: Rol del usuario en el sistema.
 *             required:
 *               - username
 *               - password
 *               - email
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Error en la creación del usuario.
 */
router.post('/', createUserHandler);

// Actualizar un usuario
/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario (opcional).
 *               password:
 *                 type: string
 *                 description: Contraseña nueva (opcional).
 *               email:
 *                 type: string
 *                 description: Correo electrónico nuevo (opcional).
 *               role:
 *                 type: string
 *                 enum: [USER, ADMINISTRADOR]
 *                 description: Rol actualizado del usuario (opcional).
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       403:
 *         description: No autorizado.
 */
router.patch('/:id', hasRole(['ADMINISTRADOR']), updateUserHandler);

//Eliminar usuario
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       403:
 *         description: No autorizado.
 */
router.delete('/:id', hasRole(['ADMINISTRADOR']), deleteUserHandler);

//exportar la aplicacion
export default router;
