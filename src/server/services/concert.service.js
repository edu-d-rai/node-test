import { ConcertRepository } from 'data/repositories';

class ConcertService {
  static create(name, place, date, isFree, mainArtist, secondaryArtist) {
    return ConcertRepository.create(name, place, date, isFree, mainArtist, secondaryArtist);
  }

  static get(name) {
    return ConcertRepository.get(name);
  }

  static getAll(args) {
    return ConcertRepository.getAll(args);
  }

  static update(name, place, date, isFree, mainArtist, secondaryArtist) {
    return ConcertRepository.update(name, place, date, isFree, mainArtist, secondaryArtist);
  }

  static partialUpdate(name, place, date, isFree, mainArtist, secondaryArtist) {
    return ConcertRepository.partialUpdate({
      name,
      place,
      date,
      isFree,
      mainArtist,
      secondaryArtist,
    });
  }

  static destroy(name) {
    return ConcertRepository.destroy(name);
  }
}

export { ConcertService };
