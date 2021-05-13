import { MusicianRepository } from 'data/repositories';

class MusicianService {
  static create(
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
    return MusicianRepository.create(
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
    );
  }

  static get(id) {
    return MusicianRepository.get(id);
  }

  static getAll(args) {
    return MusicianRepository.getAll(args);
  }

  static update(
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
    return MusicianRepository.update(
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
    );
  }

  static partialUpdate(
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
    return MusicianRepository.partialUpdate({
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

  static destroy(id) {
    return MusicianRepository.destroy(id);
  }
}

export { MusicianService };
