import { CREATED } from 'http-status';
import { MusicianFetchAllService, MusicianService, SongService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class MusicianFetchAllController {
  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const musician = await MusicianFetchAllService.get(id);
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
      const allMusicians = await MusicianFetchAllService.getAll(filters);
      res.locals.data = allMusicians;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { MusicianFetchAllController };
