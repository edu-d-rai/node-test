import { CREATED } from 'http-status';
import { AlbumService, MusicianService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class AlbumController {
  static async create(req, res, next) {
    try {
      const {
        name,
        genre,
        releaseDate,
        numStars,
        ranking,
        upc,
        producer,
        interpreters,
        collaborators,
      } = req.body;
      if (producer !== null && typeof producer !== 'undefined') {
        const dbproducer = await MusicianService.get(producer);
        if (!dbproducer) {
          throw new NotFound(`Musician ${producer} not found`);
        }
      }
      const newAlbum = await AlbumService.create(
        name,
        genre,
        releaseDate,
        numStars,
        ranking,
        upc,
        producer,
        interpreters,
        collaborators
      );
      res.locals.status = CREATED;
      res.locals.data = newAlbum;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const album = await AlbumService.get(id);
      if (!album) {
        throw new NotFound(`Album with primary key ${id} not found`);
      }
      res.locals.data = album;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allAlbums = await AlbumService.getAll(filters);
      res.locals.data = allAlbums;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        genre,
        releaseDate,
        numStars,
        ranking,
        upc,
        producer,
        interpreters,
        collaborators,
      } = req.body;
      if (producer !== null && typeof producer !== 'undefined') {
        if (!(await MusicianService.get(producer))) {
          throw new NotFound(`Musician ${producer} not found`);
        }
      }

      const updatedAlbum = await AlbumService.update(
        id,
        name,
        genre,
        releaseDate,
        numStars,
        ranking,
        upc,
        producer,
        interpreters,
        collaborators
      );

      res.locals.data = updatedAlbum;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        genre,
        releaseDate,
        numStars,
        ranking,
        upc,
        producer,
        interpreters,
        collaborators,
      } = req.body;
      if (producer !== null && typeof producer !== 'undefined') {
        if (!(await MusicianService.get(producer))) {
          throw new NotFound(`Musician ${producer} not found`);
        }
      }

      const updatedAlbum = await AlbumService.partialUpdate(
        id,
        name,
        genre,
        releaseDate,
        numStars,
        ranking,
        upc,
        producer,
        interpreters,
        collaborators
      );

      res.locals.data = updatedAlbum;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const albumDelete = await AlbumService.destroy(id);
      res.locals.data = albumDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { AlbumController };
