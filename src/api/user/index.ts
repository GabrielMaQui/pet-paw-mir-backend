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

router.post('/', createUserHandler);
//router.get('/:id', getOneUserHandler);
router.patch('/:id', hasRole(['ADMINISTRADOR']), updateUserHandler);
router.delete('/:id', hasRole(['ADMINISTRADOR']), deleteUserHandler);

//exportar la aplicacion
export default router;
