import { CREATED } from 'http-status';
import { GetAlbumsByStarsService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class GetAlbumsByStarsController {
  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allAlbums = await GetAlbumsByStarsService.getAll(filters);
      res.locals.data = allAlbums;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { GetAlbumsByStarsController };
