import { CREATED } from 'http-status';
import { GetAlbumSongsService, AlbumService, MusicianService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class GetAlbumSongsController {
  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allSongs = await GetAlbumSongsService.getAll(filters);
      res.locals.data = allSongs;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { GetAlbumSongsController };
