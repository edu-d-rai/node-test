import { Musician } from 'data/models';
import { NotFound } from 'server/utils/errors';

class MusicianUpdateInfluencerRepository {
  static async update(id, influencer) {
    return this.partialUpdate({
      id,
      influencer,
    });
  }

  static async partialUpdate({ id, influencer }) {
    const foundMusician = await Musician.findByPk(id);
    if (!foundMusician) throw new NotFound(`Musician with primary key ${id} not found`);
    if (influencer !== undefined) foundMusician.influencer = influencer;
    await foundMusician.save();
    return foundMusician.reload();
  }
}

export { MusicianUpdateInfluencerRepository };
