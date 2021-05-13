import request from 'supertest';
import { Song, Album, Musician } from 'data/models';
import { app } from 'server/app';
import {
  buildSong,
  buildAlbum,
  buildMusician,
  createSong,
  createAlbum,
  createMusician,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/get-album-songs';

describe('GetAlbumSongs tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/GET - Response with a list of songs', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allSong = await Song.findAll();
    expect(data.length).toBe(allSong.length);
  });
});
