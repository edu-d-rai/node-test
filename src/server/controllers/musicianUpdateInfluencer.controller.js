import { CREATED } from 'http-status';
import { MusicianUpdateInfluencerService, MusicianService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class MusicianUpdateInfluencerController {
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { influencer } = req.body;
      if (influencer !== null && typeof influencer !== 'undefined') {
        if (!(await MusicianService.get(influencer))) {
          throw new NotFound(`Musician ${influencer} not found`);
        }
      }

      const updatedMusician = await MusicianUpdateInfluencerService.update(id, influencer);

      res.locals.data = updatedMusician;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { influencer } = req.body;
      if (influencer !== null && typeof influencer !== 'undefined') {
        if (!(await MusicianService.get(influencer))) {
          throw new NotFound(`Musician ${influencer} not found`);
        }
      }

      const updatedMusician = await MusicianUpdateInfluencerService.partialUpdate(id, influencer);

      res.locals.data = updatedMusician;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { MusicianUpdateInfluencerController };
