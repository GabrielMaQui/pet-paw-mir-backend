import { Router } from 'express';
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
router.get('/', getAllUsersHandler);
router.post('/', createUserHandler);
//router.get('/:id', getOneUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

//exportar la aplicacion
export default router;
