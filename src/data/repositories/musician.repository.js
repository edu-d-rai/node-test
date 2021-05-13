import { Musician } from 'data/models';
import { NotFound } from 'server/utils/errors';

class MusicianRepository {
  static async create(
    firstName,
    lastName,
    instrument,
    age,
    fans,
    inspiredAt,
    influencer,
    preferredSong,
    albums,
    collabAlbums
  ) {
    const createdMusician = await Musician.create({
      firstName,
      lastName,
      instrument,
      age,
      fans,
      inspiredAt,
      influencer,
      preferredSong,
    });

    if (albums) await createdMusician.setAlbums(albums);

    if (collabAlbums) await createdMusician.setCollabAlbums(collabAlbums);

    return createdMusician;
  }

  static get(id) {
    return Musician.findByPk(id, {
      include: [
        'prodRecords',
        'mainConcerts',
        'secondaryConcerts',
        'influencedMusicians',
        'composedSongs',
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
        'albums',
        'collabAlbums',
      ],
    });
  }

  static async update(
    id,
    firstName,
    lastName,
    instrument,
    age,
    fans,
    inspiredAt,
    influencer,
    preferredSong,
    albums,
    collabAlbums
  ) {
    return this.partialUpdate({
      id,
      firstName,
      lastName,
      instrument,
      age,
      fans,
      inspiredAt,
      influencer,
      preferredSong,
      albums,
      collabAlbums,
    });
  }

  static async partialUpdate({
    id,
    firstName,
    lastName,
    instrument,
    age,
    fans,
    inspiredAt,
    influencer,
    preferredSong,
    albums,
    collabAlbums,
  }) {
    const foundMusician = await Musician.findByPk(id);
    if (!foundMusician) throw new NotFound(`Musician with primary key ${id} not found`);
    if (firstName !== undefined) foundMusician.firstName = firstName;
    if (lastName !== undefined) foundMusician.lastName = lastName;
    if (instrument !== undefined) foundMusician.instrument = instrument;
    if (age !== undefined) foundMusician.age = age;
    if (fans !== undefined) foundMusician.fans = fans;
    if (inspiredAt !== undefined) foundMusician.inspiredAt = inspiredAt;
    if (influencer !== undefined) foundMusician.influencer = influencer;
    if (preferredSong !== undefined) foundMusician.preferredSong = preferredSong;
    if (albums !== undefined) await foundMusician.setAlbums(albums);
    if (collabAlbums !== undefined) await foundMusician.setCollabAlbums(collabAlbums);
    await foundMusician.save();
    return foundMusician.reload();
  }

  static async destroy(id) {
    const foundMusician = await Musician.findByPk(id);
    if (!foundMusician) throw new NotFound(`Musician with primary key ${id} not found`);
    await foundMusician.destroy();
    return foundMusician;
  }
}

export { MusicianRepository };
