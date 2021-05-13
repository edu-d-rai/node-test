import request from 'supertest';
import { Album } from 'data/models';
import { app } from 'server/app';
import { buildAlbum, createAlbum } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/get-albums-by-stars';

describe('GetAlbumsByStars tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/GET - Response with a list of albums', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allAlbum = await Album.findAll();
    expect(data.length).toBe(allAlbum.length);
  });
});
