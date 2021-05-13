import { datatype, date, random } from 'faker';
import { Concert } from 'data/models';
import { buildMusician, createMusician } from './musician.factory';

const buildConcert = async (concertFks) => {
  const resConcert = {};
  let { mainArtist } = concertFks;
  const { secondaryArtist } = concertFks;

  resConcert.name = random.word().slice(0, 50);
  resConcert.place = random.word().slice(0, 200);
  resConcert.date = date.past().toJSON();
  resConcert.isFree = datatype.boolean();

  if (concertFks.mainArtist === null || typeof concertFks.mainArtist === 'undefined') {
    const fakeMainArtist = await buildMusician({});
    const createdFakeMainArtist = await createMusician(fakeMainArtist);
    mainArtist = createdFakeMainArtist.id;
  }
  resConcert.mainArtist = mainArtist;
  resConcert.secondaryArtist = secondaryArtist;

  return resConcert;
};

const createConcert = async (fakeConcert) => {
  const concert = await Concert.create(fakeConcert);
  return concert;
};

export { buildConcert, createConcert };
