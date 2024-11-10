import { Router } from 'express';
import {
  addFavoriteHandler,
  deleteFavoriteHandler,
  getAllFavoritesHandler,
} from './favorites.controller';

const router = Router();

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorite posts for a user
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's authentication token
 *     responses:
 *       200:
 *         description: A list of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   postId:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Invalid token
 */
router.get('/', getAllFavoritesHandler);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a post to favorites
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The favorite post created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 postId:
 *                   type: string
 *       400:
 *         description: Invalid token
 */
router.post('/', addFavoriteHandler);

/**
 * @swagger
 * /favorites:
 *   delete:
 *     summary: Delete a post from favorites
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The favorite post deleted
 *       400:
 *         description: Invalid token
 */
router.delete('/', deleteFavoriteHandler);

export default router;
