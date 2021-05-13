import { CREATED } from 'http-status';
import { SongService, AlbumService, MusicianService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class SongController {
  static async create(req, res, next) {
    try {
      const { id, name, lyrics, album, composer } = req.body;
      if (album !== null && typeof album !== 'undefined') {
        const dbalbum = await AlbumService.get(album);
        if (!dbalbum) {
          throw new NotFound(`Album ${album} not found`);
        }
      }
      if (composer !== null && typeof composer !== 'undefined') {
        const dbcomposer = await MusicianService.get(composer);
        if (!dbcomposer) {
          throw new NotFound(`Musician ${composer} not found`);
        }
      }
      const newSong = await SongService.create(id, name, lyrics, album, composer);
      res.locals.status = CREATED;
      res.locals.data = newSong;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const song = await SongService.get(id);
      if (!song) {
        throw new NotFound(`Song with primary key ${id} not found`);
      }
      res.locals.data = song;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allSongs = await SongService.getAll(filters);
      res.locals.data = allSongs;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, lyrics, album, composer } = req.body;
      if (album !== null && typeof album !== 'undefined') {
        if (!(await AlbumService.get(album))) {
          throw new NotFound(`Album ${album} not found`);
        }
      }
      if (composer !== null && typeof composer !== 'undefined') {
        if (!(await MusicianService.get(composer))) {
          throw new NotFound(`Musician ${composer} not found`);
        }
      }

      const updatedSong = await SongService.update(id, name, lyrics, album, composer);

      res.locals.data = updatedSong;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { name, lyrics, album, composer } = req.body;
      if (album !== null && typeof album !== 'undefined') {
        if (!(await AlbumService.get(album))) {
          throw new NotFound(`Album ${album} not found`);
        }
      }
      if (composer !== null && typeof composer !== 'undefined') {
        if (!(await MusicianService.get(composer))) {
          throw new NotFound(`Musician ${composer} not found`);
        }
      }

      const updatedSong = await SongService.partialUpdate(id, name, lyrics, album, composer);

      res.locals.data = updatedSong;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const songDelete = await SongService.destroy(id);
      res.locals.data = songDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { SongController };
