import { SongRepository } from 'data/repositories';

class SongService {
  static create(id, name, lyrics, album, composer) {
    return SongRepository.create(id, name, lyrics, album, composer);
  }

  static get(id) {
    return SongRepository.get(id);
  }

  static getAll(args) {
    return SongRepository.getAll(args);
  }

  static update(id, name, lyrics, album, composer) {
    return SongRepository.update(id, name, lyrics, album, composer);
  }

  static partialUpdate(id, name, lyrics, album, composer) {
    return SongRepository.partialUpdate({ id, name, lyrics, album, composer });
  }

  static destroy(id) {
    return SongRepository.destroy(id);
  }
}

export { SongService };
