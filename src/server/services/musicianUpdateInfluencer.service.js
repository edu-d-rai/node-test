import { MusicianUpdateInfluencerRepository } from 'data/repositories';

class MusicianUpdateInfluencerService {
  static update(id, influencer) {
    return MusicianUpdateInfluencerRepository.update(id, influencer);
  }

  static partialUpdate(id, influencer) {
    return MusicianUpdateInfluencerRepository.partialUpdate({ id, influencer });
  }
}

export { MusicianUpdateInfluencerService };
