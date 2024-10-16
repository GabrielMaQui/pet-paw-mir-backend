import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
} from './user.controller';

//Manejador de rutas
const router = Router();

//Lista de rutas para un modelo (tabla)
router.get('/', getAllUsersHandler);
router.post('/', createUserHandler);
router.patch('/:id', getOneUserHandler);

//exportar la aplicacion
export default router;
