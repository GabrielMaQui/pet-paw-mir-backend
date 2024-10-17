import { Router } from 'express';
import { createUserHandler, getAllUsersHandler } from './user.controller';

//Manejador de rutas
const router = Router();

//Lista de rutas para un modelo (tabla)
router.get('/', getAllUsersHandler);
router.post('/', createUserHandler);

//exportar la aplicacion
export default router;
