import request from 'supertest';
import { Musician, Song } from 'data/models';
import { app } from 'server/app';
import {
  buildMusician,
  buildSong,
  buildAlbum,
  createMusician,
  createSong,
  createAlbum,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/musician-fetch-all';

describe('MusicianFetchAll tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/GET - Response with a musician', async () => {
    const influencerDict = await buildMusician({});
    const fakeInfluencer = await createMusician(influencerDict);
    const preferredSongDict = await buildSong({});
    const fakePreferredSong = await createSong(preferredSongDict);

    const musicianDict = await buildMusician({
      influencer: fakeInfluencer.id,
      preferredSong: fakePreferredSong.id,
    });
    const fakeMusician = await createMusician(musicianDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeMusician.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeMusician.id);
    expect(data.firstName).toBe(fakeMusician.firstName);
    expect(data.lastName).toBe(fakeMusician.lastName);
    expect(data.instrument).toBe(fakeMusician.instrument);
    expect(data.age).toBe(fakeMusician.age);
    expect(data.fans).toBe(fakeMusician.fans);
    expect(data.inspiredAt).toBe(fakeMusician.inspiredAt);

    expect(data.prodRecords).toEqual([]);
    expect(data.mainConcerts).toEqual([]);
    expect(data.secondaryConcerts).toEqual([]);
    expect(data.influencedMusicians).toEqual([]);
    expect(data.composedSongs).toEqual([]);
    expect(data.influencer).toBe(fakeMusician.influencer);
    expect(data.preferredSong).toBe(fakeMusician.preferredSong);
  });

  test('/GET - Response with a musician not found', async () => {
    const musicianDict = await buildMusician({});
    const fakeMusician = await createMusician(musicianDict);
    const { id } = fakeMusician;
    await fakeMusician.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a list of musicians', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allMusician = await Musician.findAll();
    expect(data.length).toBe(allMusician.length);
  });
});
