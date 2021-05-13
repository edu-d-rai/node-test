import { Musician } from 'data/models';
import { NotFound } from 'server/utils/errors';

class MusicianOnlyFetchApiRepository {
  static get(id) {
    return Musician.findByPk(id, { include: ['prodRecords'] });
  }

  static getAll(filters) {
    return Musician.findAll({
      where: filters,
      include: ['prodRecords'],
    });
  }
}

export { MusicianOnlyFetchApiRepository };
