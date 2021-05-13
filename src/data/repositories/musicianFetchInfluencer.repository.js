import { Musician } from 'data/models';
import { NotFound } from 'server/utils/errors';

class MusicianFetchInfluencerRepository {
  static get(id) {
    return Musician.findByPk(id, { include: ['influencer_'] });
  }
}

export { MusicianFetchInfluencerRepository };
