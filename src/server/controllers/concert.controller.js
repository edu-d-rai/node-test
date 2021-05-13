import { CREATED } from 'http-status';
import { ConcertService, MusicianService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class ConcertController {
  static async create(req, res, next) {
    try {
      const { name, place, date, isFree, mainArtist, secondaryArtist } = req.body;
      if (mainArtist !== null && typeof mainArtist !== 'undefined') {
        const dbmainArtist = await MusicianService.get(mainArtist);
        if (!dbmainArtist) {
          throw new NotFound(`Musician ${mainArtist} not found`);
        }
      }
      if (secondaryArtist !== null && typeof secondaryArtist !== 'undefined') {
        const dbsecondaryArtist = await MusicianService.get(secondaryArtist);
        if (!dbsecondaryArtist) {
          throw new NotFound(`Musician ${secondaryArtist} not found`);
        }
      }
      const newConcert = await ConcertService.create(
        name,
        place,
        date,
        isFree,
        mainArtist,
        secondaryArtist
      );
      res.locals.status = CREATED;
      res.locals.data = newConcert;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { name } = req.params;
      const concert = await ConcertService.get(name);
      if (!concert) {
        throw new NotFound(`Concert with primary key ${name} not found`);
      }
      res.locals.data = concert;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allConcerts = await ConcertService.getAll(filters);
      res.locals.data = allConcerts;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { name } = req.params;
      const { place, date, isFree, mainArtist, secondaryArtist } = req.body;
      if (mainArtist !== null && typeof mainArtist !== 'undefined') {
        if (!(await MusicianService.get(mainArtist))) {
          throw new NotFound(`Musician ${mainArtist} not found`);
        }
      }
      if (secondaryArtist !== null && typeof secondaryArtist !== 'undefined') {
        if (!(await MusicianService.get(secondaryArtist))) {
          throw new NotFound(`Musician ${secondaryArtist} not found`);
        }
      }

      const updatedConcert = await ConcertService.update(
        name,
        place,
        date,
        isFree,
        mainArtist,
        secondaryArtist
      );

      res.locals.data = updatedConcert;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { name } = req.params;
      const { place, date, isFree, mainArtist, secondaryArtist } = req.body;
      if (mainArtist !== null && typeof mainArtist !== 'undefined') {
        if (!(await MusicianService.get(mainArtist))) {
          throw new NotFound(`Musician ${mainArtist} not found`);
        }
      }
      if (secondaryArtist !== null && typeof secondaryArtist !== 'undefined') {
        if (!(await MusicianService.get(secondaryArtist))) {
          throw new NotFound(`Musician ${secondaryArtist} not found`);
        }
      }

      const updatedConcert = await ConcertService.partialUpdate(
        name,
        place,
        date,
        isFree,
        mainArtist,
        secondaryArtist
      );

      res.locals.data = updatedConcert;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { name } = req.params;
      const concertDelete = await ConcertService.destroy(name);
      res.locals.data = concertDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { ConcertController };
