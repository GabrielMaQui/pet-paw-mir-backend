//favorites/favorites.controller.ts
import { getUserByToken } from '../user/user.service';
import { FavoritesService } from './favorites.service';

const favoritesService = new FavoritesService();
import type { Request, Response } from 'express';

export async function getAllFavoritesHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { token } = req.params;

  try {
    const user = await getUserByToken(token);
    if (!user) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }
    const favorites = await favoritesService.getAllFavorites(user.id);
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the favorites' });
  }
}

export async function addFavoriteHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { token } = req.params;
  const { postId } = req.body;

  try {
    const user = await getUserByToken(token);
    if (!user) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }
    const favorite = await favoritesService.createFavorite(user.id, postId);
    res.json(favorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: error });
  }
}

export async function deleteFavoriteHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { token } = req.params;
  const { postId } = req.body;

  try {
    const user = await getUserByToken(token);
    if (!user) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }
    const favorite = await favoritesService.deleteFavorite(user.id, postId);
    res.json(favorite);
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the favorite' });
  }
}
