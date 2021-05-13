import request from 'supertest';
import { Musician } from 'data/models';
import { app } from 'server/app';
import { buildMusician, createMusician } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/musician-only-fetch-api';

describe('MusicianOnlyFetchApi tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/GET - Response with a musician', async () => {
    const musicianDict = await buildMusician({});
    const fakeMusician = await createMusician(musicianDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeMusician.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeMusician.id);
    expect(data.firstName).toBe(fakeMusician.firstName);
    expect(data.lastName).toBe(fakeMusician.lastName);

    expect(data.prodRecords).toEqual([]);
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
