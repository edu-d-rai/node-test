import { Concert } from 'data/models';
import { NotFound } from 'server/utils/errors';

class ConcertRepository {
  static async create(name, place, date, isFree, mainArtist, secondaryArtist) {
    const createdConcert = await Concert.create({
      name,
      place,
      date,
      isFree,
      mainArtist,
      secondaryArtist,
    });

    return createdConcert;
  }

  static get(name) {
    return Concert.findByPk(name, { include: [] });
  }

  static getAll(filters) {
    return Concert.findAll({
      where: filters,
      include: [],
    });
  }

  static async update(name, place, date, isFree, mainArtist, secondaryArtist) {
    return this.partialUpdate({
      name,
      place,
      date,
      isFree,
      mainArtist,
      secondaryArtist,
    });
  }

  static async partialUpdate({ name, place, date, isFree, mainArtist, secondaryArtist }) {
    const foundConcert = await Concert.findByPk(name);
    if (!foundConcert) throw new NotFound(`Concert with primary key ${name} not found`);
    if (place !== undefined) foundConcert.place = place;
    if (date !== undefined) foundConcert.date = date;
    if (isFree !== undefined) foundConcert.isFree = isFree;
    if (mainArtist !== undefined) foundConcert.mainArtist = mainArtist;
    if (secondaryArtist !== undefined) foundConcert.secondaryArtist = secondaryArtist;
    await foundConcert.save();
    return foundConcert.reload();
  }

  static async destroy(name) {
    const foundConcert = await Concert.findByPk(name);
    if (!foundConcert) throw new NotFound(`Concert with primary key ${name} not found`);
    await foundConcert.destroy();
    return foundConcert;
  }
}

export { ConcertRepository };
