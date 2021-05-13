import { MusicianOnlyFetchApiRepository } from 'data/repositories';

class MusicianOnlyFetchApiService {
  static get(id) {
    return MusicianOnlyFetchApiRepository.get(id);
  }

  static getAll(args) {
    return MusicianOnlyFetchApiRepository.getAll(args);
  }
}

export { MusicianOnlyFetchApiService };
