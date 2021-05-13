import { GetAlbumsByStarsRepository } from 'data/repositories';

class GetAlbumsByStarsService {
  static getAll(args) {
    return GetAlbumsByStarsRepository.getAll(args);
  }
}

export { GetAlbumsByStarsService };
