import { Song } from 'data/models';
import { NotFound } from 'server/utils/errors';

class SongRepository {
  static async create(id, name, lyrics, album, composer) {
    const createdSong = await Song.create({
      id,
      name,
      lyrics,
      album,
      composer,
    });

    return createdSong;
  }

  static get(id) {
    return Song.findByPk(id, { include: ['songMusicianFans'] });
  }

  static getAll(filters) {
    return Song.findAll({
      where: filters,
      include: ['songMusicianFans'],
    });
  }

  static async update(id, name, lyrics, album, composer) {
    return this.partialUpdate({
      id,
      name,
      lyrics,
      album,
      composer,
    });
  }

  static async partialUpdate({ id, name, lyrics, album, composer }) {
    const foundSong = await Song.findByPk(id);
    if (!foundSong) throw new NotFound(`Song with primary key ${id} not found`);
    if (name !== undefined) foundSong.name = name;
    if (lyrics !== undefined) foundSong.lyrics = lyrics;
    if (album !== undefined) foundSong.album = album;
    if (composer !== undefined) foundSong.composer = composer;
    await foundSong.save();
    return foundSong.reload();
  }

  static async destroy(id) {
    const foundSong = await Song.findByPk(id);
    if (!foundSong) throw new NotFound(`Song with primary key ${id} not found`);
    await foundSong.destroy();
    return foundSong;
  }
}

export { SongRepository };
