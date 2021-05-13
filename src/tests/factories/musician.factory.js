import { date, datatype, random } from 'faker';
import { Musician } from 'data/models';
import { musicianInstrumentChoices } from 'server/utils/constants/fieldChoices';
import { dateToUTC, getRandomValueFromArray } from 'server/utils/functions';

const buildMusician = async (musicianFks) => {
  const resMusician = {};
  const { influencer } = musicianFks;
  const { preferredSong } = musicianFks;

  resMusician.firstName = random.word().slice(0, 70);
  resMusician.lastName = random.word().slice(0, 40);
  resMusician.instrument = getRandomValueFromArray(musicianInstrumentChoices);
  resMusician.age = datatype.number({ min: 0 });
  resMusician.fans = datatype.number({ min: 0 });
  resMusician.inspiredAt = dateToUTC(date.past()).format('HH:mm:ss');

  resMusician.influencer = influencer;
  resMusician.preferredSong = preferredSong;

  if (musicianFks.albums !== null || typeof musicianFks.albums !== 'undefined') {
    resMusician.albums = musicianFks.albums;
  }
  if (musicianFks.collabAlbums !== null || typeof musicianFks.collabAlbums !== 'undefined') {
    resMusician.collabAlbums = musicianFks.collabAlbums;
  }

  return resMusician;
};

const createMusician = async (fakeMusician) => {
  const musician = await Musician.create(fakeMusician);
  return musician;
};

export { buildMusician, createMusician };
