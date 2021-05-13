import { MusicianFetchInfluencerRepository } from 'data/repositories';

class MusicianFetchInfluencerService {
  static get(id) {
    return MusicianFetchInfluencerRepository.get(id);
  }
}

export { MusicianFetchInfluencerService };
