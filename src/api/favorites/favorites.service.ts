import { FavoriteRepository } from './favorite.repository';

export class FavoritesService {
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }

  public async getAllFavorites(userId: string) {
    return this.favoriteRepository.getAllFavorites(userId);
  }

  public async createFavorite(userId: string, postId: string) {
    return this.favoriteRepository.createFavorite(userId, postId);
  }

  public async deleteFavorite(userId: string, postId: number) {
    return this.favoriteRepository.deleteFavorite(userId, postId);
  }
}
