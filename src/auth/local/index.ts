import { Router } from 'express';

import { activateAccountHandler, loginHandler } from './local.controller';

const router = Router();

// POST -> /auth/local/login

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica un usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente.
 *       400:
 *         description: Error en los datos de entrada.
 *       401:
 *         description: Credenciales incorrectas.
 *       500:
 *         description: Error del servidor.
 */
router.post('/login', loginHandler);

/**
 * @swagger
 * /auth/activate/{token}:
 *   get:
 *     summary: Activa la cuenta de un usuario mediante un token de activación
 *     tags: [Autenticación]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de activación enviado al correo del usuario.
 *     responses:
 *       200:
 *         description: Cuenta activada exitosamente.
 *       400:
 *         description: Token inválido o expirado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get('/activate/:token', activateAccountHandler);
//router.patch('/forgot-password', (req, res) => {});

export default router;
