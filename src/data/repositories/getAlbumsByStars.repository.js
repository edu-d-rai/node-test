import { Album } from 'data/models';
import { NotFound } from 'server/utils/errors';

class GetAlbumsByStarsRepository {
  static getAll(filters) {
    return Album.findAll({
      where: filters,
      include: [],
    });
  }
}

export { GetAlbumsByStarsRepository };
