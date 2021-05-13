import { Musician } from 'data/models';
import { NotFound } from 'server/utils/errors';

class MusicianFetchAllRepository {
  static get(id) {
    return Musician.findByPk(id, {
      include: [
        'prodRecords',
        'mainConcerts',
        'secondaryConcerts',
        'influencedMusicians',
        'composedSongs',
        'influencer_',
        'preferredSong_',
        'albums',
        'collabAlbums',
      ],
    });
  }

  static getAll(filters) {
    return Musician.findAll({
      where: filters,
      include: [
        'prodRecords',
        'mainConcerts',
        'secondaryConcerts',
        'influencedMusicians',
        'composedSongs',
        'influencer_',
        'preferredSong_',
        'albums',
        'collabAlbums',
      ],
    });
  }
}

export { MusicianFetchAllRepository };
