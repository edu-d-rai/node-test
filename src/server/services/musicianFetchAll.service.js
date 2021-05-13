import { MusicianFetchAllRepository } from 'data/repositories';

class MusicianFetchAllService {
  static get(id) {
    return MusicianFetchAllRepository.get(id);
  }

  static getAll(args) {
    return MusicianFetchAllRepository.getAll(args);
  }
}

export { MusicianFetchAllService };
