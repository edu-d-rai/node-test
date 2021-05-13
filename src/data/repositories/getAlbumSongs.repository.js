import { Song } from 'data/models';
import { NotFound } from 'server/utils/errors';

class GetAlbumSongsRepository {
  static getAll(filters) {
    return Song.findAll({
      where: filters,
      include: ['songMusicianFans', 'album_', 'composer_'],
    });
  }
}

export { GetAlbumSongsRepository };
