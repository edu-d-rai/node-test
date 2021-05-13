import { random, datatype, date } from 'faker';
import { Album } from 'data/models';
import { albumGenreChoices } from 'server/utils/constants/fieldChoices';
import { dateToUTC, getRandomValueFromArray } from 'server/utils/functions';

const buildAlbum = async (albumFks) => {
  const resAlbum = {};
  const { producer } = albumFks;

  resAlbum.name = random.word().slice(0, 80);
  resAlbum.genre = getRandomValueFromArray(albumGenreChoices);
  resAlbum.releaseDate = dateToUTC(date.past()).format('YYYY-MM-DD');
  resAlbum.numStars = datatype.number({ min: 0, max: 5 });
  resAlbum.ranking = datatype.float({ min: 2.0, max: 10.2 });
  resAlbum.upc = random.word().slice(0, 12);

  resAlbum.producer = producer;

  if (albumFks.interpreters !== null || typeof albumFks.interpreters !== 'undefined') {
    resAlbum.interpreters = albumFks.interpreters;
  }
  if (albumFks.collaborators !== null || typeof albumFks.collaborators !== 'undefined') {
    resAlbum.collaborators = albumFks.collaborators;
  }

  return resAlbum;
};

const createAlbum = async (fakeAlbum) => {
  const album = await Album.create(fakeAlbum);
  return album;
};

export { buildAlbum, createAlbum };
