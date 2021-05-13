import { GetAlbumSongsRepository } from 'data/repositories';

class GetAlbumSongsService {
  static getAll(args) {
    return GetAlbumSongsRepository.getAll(args);
  }
}

export { GetAlbumSongsService };
