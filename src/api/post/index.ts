import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getOnePostHandler,
  getPostsByUserHandler,
  getUserPostsHandler,
  updatePostHandler,
} from './post.controller';

const router = Router();
/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retorna una lista de todos los posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts obtenida exitosamente.
 *       500:
 *         description: Error del servidor.
 */
router.get('/', getAllPostsHandler);

/**
 * @swagger
 * /api/posts/myposts:
 *   get:
 *     summary: Retorna los posts del usuario autenticado
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posts del usuario obtenidos exitosamente.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.get('/myposts', hasRole(['USER']), getUserPostsHandler);

/**
 * @swagger
 * /api/posts/user/{userId}:
 *   get:
 *     summary: Retorna los posts de un usuario específico
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario cuyos posts se van a obtener
 *     responses:
 *       200:
 *         description: Posts del usuario obtenidos exitosamente.
 *       404:
 *         description: Usuario no encontrado o sin posts.
 *       500:
 *         description: Error del servidor.
 */
router.get('/user/:userId', getPostsByUserHandler);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Retorna un post por su ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post a obtener
 *     responses:
 *       200:
 *         description: Post obtenido exitosamente.
 *       404:
 *         description: Post no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get('/:id', getOnePostHandler);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Elimina un post por su ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post a eliminar
 *     responses:
 *       200:
 *         description: Post eliminado exitosamente.
 *       404:
 *         description: Post no encontrado.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.delete('/:id', deletePostHandler);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Crea un nuevo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del post.
 *               content:
 *                 type: string
 *                 description: Contenido del post.
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Post creado exitosamente.
 *       400:
 *         description: Error en la creación del post.
 */
router.post('/', hasRole(['USER']), createPostHandler);

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Actualiza un post existente
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título actualizado del post.
 *               content:
 *                 type: string
 *                 description: Contenido actualizado del post.
 *     responses:
 *       200:
 *         description: Post actualizado exitosamente.
 *       404:
 *         description: Post no encontrado.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.patch('/:id', updatePostHandler);

export default router;

/*
localhost:3000/api/posts                GET   Get all posts
localhost:3000/api/posts/myposts        GET   Get all posts of the authenticated user
localhost:3000/api/posts/user/:userId   GET   Get all posts of a user
localhost:3000/api/posts/:id            GET   Get a post by id
localhost:3000/api/posts                POST  Create a post
localhost:3000/api/posts/:id            PATCH Update a post
*/
