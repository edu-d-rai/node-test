import { CREATED } from 'http-status';
import { MusicianFetchInfluencerService, MusicianService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class MusicianFetchInfluencerController {
  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const musician = await MusicianFetchInfluencerService.get(id);
      if (!musician) {
        throw new NotFound(`Musician with primary key ${id} not found`);
      }
      res.locals.data = musician;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { MusicianFetchInfluencerController };
