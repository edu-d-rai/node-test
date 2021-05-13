import { AlbumRepository } from 'data/repositories';

class AlbumService {
  static create(
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
    return AlbumRepository.create(
      name,
      genre,
      releaseDate,
      numStars,
      ranking,
      upc,
      producer,
      interpreters,
      collaborators
    );
  }

  static get(id) {
    return AlbumRepository.get(id);
  }

  static getAll(args) {
    return AlbumRepository.getAll(args);
  }

  static update(
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
    return AlbumRepository.update(
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
    );
  }

  static partialUpdate(
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
    return AlbumRepository.partialUpdate({
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

  static destroy(id) {
    return AlbumRepository.destroy(id);
  }
}

export { AlbumService };
