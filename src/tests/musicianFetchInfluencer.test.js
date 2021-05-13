import request from 'supertest';
import { Musician } from 'data/models';
import { app } from 'server/app';
import { buildMusician, createMusician } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/musician-fetch-influencer';

describe('MusicianFetchInfluencer tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/GET - Response with a musician', async () => {
    const influencerDict = await buildMusician({});
    const fakeInfluencer = await createMusician(influencerDict);

    const musicianDict = await buildMusician({ influencer: fakeInfluencer.id });
    const fakeMusician = await createMusician(musicianDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeMusician.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeMusician.id);

    expect(data.influencer).toBe(fakeMusician.influencer);
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
});
