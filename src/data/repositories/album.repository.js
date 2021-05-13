import { Album } from 'data/models';
import { NotFound } from 'server/utils/errors';

class AlbumRepository {
  static async create(
    name,
    genre,
    releaseDate,
    numStars,
    ranking,
    upc,
    producer,
    interpreters,
    collaborators
  ) {
    const createdAlbum = await Album.create({
      name,
      genre,
      releaseDate,
      numStars,
      ranking,
      upc,
      producer,
    });

    if (interpreters) await createdAlbum.setInterpreters(interpreters);

    if (collaborators) await createdAlbum.setCollaborators(collaborators);

    return createdAlbum;
  }

  static get(id) {
    return Album.findByPk(id, { include: ['songs', 'interpreters', 'collaborators'] });
  }

  static getAll(filters) {
    return Album.findAll({
      where: filters,
      include: ['songs', 'interpreters', 'collaborators'],
    });
  }

  static async update(
    id,
    name,
    genre,
    releaseDate,
    numStars,
    ranking,
    upc,
    producer,
    interpreters,
    collaborators
  ) {
    return this.partialUpdate({
      id,
      name,
      genre,
      releaseDate,
      numStars,
      ranking,
      upc,
      producer,
      interpreters,
      collaborators,
    });
  }

  static async partialUpdate({
    id,
    name,
    genre,
    releaseDate,
    numStars,
    ranking,
    upc,
    producer,
    interpreters,
    collaborators,
  }) {
    const foundAlbum = await Album.findByPk(id);
    if (!foundAlbum) throw new NotFound(`Album with primary key ${id} not found`);
    if (name !== undefined) foundAlbum.name = name;
    if (genre !== undefined) foundAlbum.genre = genre;
    if (releaseDate !== undefined) foundAlbum.releaseDate = releaseDate;
    if (numStars !== undefined) foundAlbum.numStars = numStars;
    if (ranking !== undefined) foundAlbum.ranking = ranking;
    if (upc !== undefined) foundAlbum.upc = upc;
    if (producer !== undefined) foundAlbum.producer = producer;
    if (interpreters !== undefined) await foundAlbum.setInterpreters(interpreters);
    if (collaborators !== undefined) await foundAlbum.setCollaborators(collaborators);
    await foundAlbum.save();
    return foundAlbum.reload();
  }

  static async destroy(id) {
    const foundAlbum = await Album.findByPk(id);
    if (!foundAlbum) throw new NotFound(`Album with primary key ${id} not found`);
    await foundAlbum.destroy();
    return foundAlbum;
  }
}

export { AlbumRepository };
