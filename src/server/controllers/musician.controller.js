import { CREATED } from 'http-status';
import { MusicianService, SongService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class MusicianController {
  static async create(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        instrument,
        age,
        fans,
        inspiredAt,
        influencer,
        preferredSong,
        albums,
        collabAlbums,
      } = req.body;
      if (influencer !== null && typeof influencer !== 'undefined') {
        const dbinfluencer = await MusicianService.get(influencer);
        if (!dbinfluencer) {
          throw new NotFound(`Musician ${influencer} not found`);
        }
      }
      if (preferredSong !== null && typeof preferredSong !== 'undefined') {
        const dbpreferredSong = await SongService.get(preferredSong);
        if (!dbpreferredSong) {
          throw new NotFound(`Song ${preferredSong} not found`);
        }
      }
      const newMusician = await MusicianService.create(
        firstName,
        lastName,
        instrument,
        age,
        fans,
        inspiredAt,
        influencer,
        preferredSong,
        albums,
        collabAlbums
      );
      res.locals.status = CREATED;
      res.locals.data = newMusician;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const musician = await MusicianService.get(id);
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
      const allMusicians = await MusicianService.getAll(filters);
      res.locals.data = allMusicians;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        instrument,
        age,
        fans,
        inspiredAt,
        influencer,
        preferredSong,
        albums,
        collabAlbums,
      } = req.body;
      if (influencer !== null && typeof influencer !== 'undefined') {
        if (!(await MusicianService.get(influencer))) {
          throw new NotFound(`Musician ${influencer} not found`);
        }
      }
      if (preferredSong !== null && typeof preferredSong !== 'undefined') {
        if (!(await SongService.get(preferredSong))) {
          throw new NotFound(`Song ${preferredSong} not found`);
        }
      }

      const updatedMusician = await MusicianService.update(
        id,
        firstName,
        lastName,
        instrument,
        age,
        fans,
        inspiredAt,
        influencer,
        preferredSong,
        albums,
        collabAlbums
      );

      res.locals.data = updatedMusician;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        instrument,
        age,
        fans,
        inspiredAt,
        influencer,
        preferredSong,
        albums,
        collabAlbums,
      } = req.body;
      if (influencer !== null && typeof influencer !== 'undefined') {
        if (!(await MusicianService.get(influencer))) {
          throw new NotFound(`Musician ${influencer} not found`);
        }
      }
      if (preferredSong !== null && typeof preferredSong !== 'undefined') {
        if (!(await SongService.get(preferredSong))) {
          throw new NotFound(`Song ${preferredSong} not found`);
        }
      }

      const updatedMusician = await MusicianService.partialUpdate(
        id,
        firstName,
        lastName,
        instrument,
        age,
        fans,
        inspiredAt,
        influencer,
        preferredSong,
        albums,
        collabAlbums
      );

      res.locals.data = updatedMusician;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const musicianDelete = await MusicianService.destroy(id);
      res.locals.data = musicianDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { MusicianController };
