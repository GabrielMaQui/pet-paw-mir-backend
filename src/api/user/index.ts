import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller'
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
  updateUserHandler,
} from './user.controller';

//Manejador de rutas
const router = Router();

//Lista de rutas para un modelo (tabla)
router.get('/', hasRole(['USER']), getAllUsersHandler);
router.post('/', createUserHandler);
//router.get('/:id', getOneUserHandler);
router.patch('/:id', hasRole(['ADMINISTRADOR']), updateUserHandler);
router.delete('/:id',hasRole(['ADMINISTRADOR']), deleteUserHandler);

//exportar la aplicacion
export default router;
