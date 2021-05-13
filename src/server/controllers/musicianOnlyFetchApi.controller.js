import { CREATED } from 'http-status';
import { MusicianOnlyFetchApiService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class MusicianOnlyFetchApiController {
  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const musician = await MusicianOnlyFetchApiService.get(id);
      if (!musician) {
        throw new NotFound(`Musician with primary key ${id} not found`);
      }
      res.locals.data = musician;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allMusicians = await MusicianOnlyFetchApiService.getAll(filters);
      res.locals.data = allMusicians;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { MusicianOnlyFetchApiController };
