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

const ENDPOINT = '/song-api';

describe('SongApi tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created song', async () => {
    const albumDict = await buildAlbum({});
    const fakeAlbum = await createAlbum(albumDict);
    const composerDict = await buildMusician({});
    const fakeComposer = await createMusician(composerDict);

    const fakeSong = await buildSong({ album: fakeAlbum.id, composer: fakeComposer.id });

    const response = await request(app).post(ENDPOINT).send(fakeSong);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseSong = response.body.data;

    const song = await Song.findByPk(responseSong.id);

    expect(song.name).toBe(fakeSong.name);
    expect(song.lyrics).toBe(fakeSong.lyrics);

    expect(song.album).toBe(fakeSong.album);
    expect(song.composer).toBe(fakeSong.composer);
  });

  test('/POST - album does not exists, song cant be created', async () => {
    const fakeSong = await buildSong({});
    const album = await Album.findOne({ where: { id: fakeSong.album } });
    await album.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeSong);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - composer does not exists, song cant be created', async () => {
    const fakeSong = await buildSong({});
    const composer = await Musician.findOne({ where: { id: fakeSong.composer } });
    await composer.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeSong);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a song', async () => {
    const albumDict = await buildAlbum({});
    const fakeAlbum = await createAlbum(albumDict);
    const composerDict = await buildMusician({});
    const fakeComposer = await createMusician(composerDict);

    const songDict = await buildSong({ album: fakeAlbum.id, composer: fakeComposer.id });
    const fakeSong = await createSong(songDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeSong.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeSong.id);
    expect(data.name).toBe(fakeSong.name);
    expect(data.lyrics).toBe(fakeSong.lyrics);
    expect(data.code).toBe(fakeSong.code);

    expect(data.songMusicianFans).toEqual([]);
    expect(data.album).toBe(fakeSong.album);
    expect(data.composer).toBe(fakeSong.composer);
  });

  test('/GET - Response with a song not found', async () => {
    const songDict = await buildSong({});
    const fakeSong = await createSong(songDict);
    const { id } = fakeSong;
    await fakeSong.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
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

  test('/PUT - Response with an updated song', async () => {
    const albumDict = await buildAlbum({});
    const fakeAlbum = await createAlbum(albumDict);
    const composerDict = await buildMusician({});
    const fakeComposer = await createMusician(composerDict);

    const songDict = await buildSong({ album: fakeAlbum.id, composer: fakeComposer.id });
    const fakeSong = await createSong(songDict);

    const anotherAlbumDict = await buildAlbum({});
    const anotherFakeAlbum = await createAlbum(anotherAlbumDict);
    const anotherComposerDict = await buildMusician({});
    const anotherFakeComposer = await createMusician(anotherComposerDict);

    const anotherFakeSong = await buildSong({
      album: anotherFakeAlbum.id,
      composer: anotherFakeComposer.id,
    });

    const response = await request(app).put(`${ENDPOINT}/${fakeSong.id}`).send({
      name: anotherFakeSong.name,
      lyrics: anotherFakeSong.lyrics,
      album: anotherFakeSong.album,
      composer: anotherFakeSong.composer,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeSong.name);
    expect(data.lyrics).toBe(anotherFakeSong.lyrics);

    expect(data.album).toBe(anotherFakeSong.album);

    expect(data.composer).toBe(anotherFakeSong.composer);

    const updatedSong = await Song.findByPk(fakeSong.id);

    expect(updatedSong.name).toBe(anotherFakeSong.name);
    expect(updatedSong.lyrics).toBe(anotherFakeSong.lyrics);

    expect(updatedSong.album).toBe(anotherFakeSong.album);
    expect(updatedSong.composer).toBe(anotherFakeSong.composer);
  });

  test('/PUT - album does not exists, song cant be updated', async () => {
    const albumDict = await buildAlbum({});
    const fakeAlbum = await createAlbum(albumDict);
    const composerDict = await buildMusician({});
    const fakeComposer = await createMusician(composerDict);

    const songDict = await buildSong({ album: fakeAlbum.id, composer: fakeComposer.id });
    const fakeSong = await createSong(songDict);

    const anotherAlbumDict = await buildAlbum({});
    const anotherFakeAlbum = await createAlbum(anotherAlbumDict);

    songDict.album = anotherFakeAlbum.id;

    await anotherFakeAlbum.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeSong.id}`).send({
      name: songDict.name,
      lyrics: songDict.lyrics,
      album: songDict.album,
      composer: songDict.composer,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - composer does not exists, song cant be updated', async () => {
    const albumDict = await buildAlbum({});
    const fakeAlbum = await createAlbum(albumDict);
    const composerDict = await buildMusician({});
    const fakeComposer = await createMusician(composerDict);

    const songDict = await buildSong({ album: fakeAlbum.id, composer: fakeComposer.id });
    const fakeSong = await createSong(songDict);

    const anotherComposerDict = await buildMusician({});
    const anotherFakeComposer = await createMusician(anotherComposerDict);

    songDict.composer = anotherFakeComposer.id;

    await anotherFakeComposer.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeSong.id}`).send({
      name: songDict.name,
      lyrics: songDict.lyrics,
      album: songDict.album,
      composer: songDict.composer,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Song does not exists, song cant be updated', async () => {
    const songDict = await buildSong({});
    const fakeSong = await createSong(songDict);
    const { id } = fakeSong;
    await fakeSong.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      name: songDict.name,
      lyrics: songDict.lyrics,
      album: songDict.album,
      composer: songDict.composer,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated song (no updates)', async () => {
    const albumDict = await buildAlbum({});
    const fakeAlbum = await createAlbum(albumDict);
    const composerDict = await buildMusician({});
    const fakeComposer = await createMusician(composerDict);

    const songDict = await buildSong({ album: fakeAlbum.id, composer: fakeComposer.id });
    const fakeSong = await createSong(songDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeSong.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated song', async () => {
    const albumDict = await buildAlbum({});
    const fakeAlbum = await createAlbum(albumDict);
    const composerDict = await buildMusician({});
    const fakeComposer = await createMusician(composerDict);

    const songDict = await buildSong({ album: fakeAlbum.id, composer: fakeComposer.id });
    const fakeSong = await createSong(songDict);

    const anotherAlbumDict = await buildAlbum({});
    const anotherFakeAlbum = await createAlbum(anotherAlbumDict);
    const anotherComposerDict = await buildMusician({});
    const anotherFakeComposer = await createMusician(anotherComposerDict);

    const anotherFakeSong = await buildSong({
      album: anotherFakeAlbum.id,
      composer: anotherFakeComposer.id,
    });

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeSong.id}`)
      .send({ name: anotherFakeSong.name });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeSong.name);

    const updatedSong = await Song.findByPk(fakeSong.id);

    expect(updatedSong.name).toBe(anotherFakeSong.name);
  });

  test('/PATCH - album does not exists, song cant be updated', async () => {
    const songDict = await buildSong({});
    const fakeSong = await createSong(songDict);

    const albumDict = await buildAlbum({});
    const fakeAlbum = await createAlbum(albumDict);

    const fakeAlbumId = fakeAlbum.id;
    await fakeAlbum.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${fakeSong.id}`).send({
      album: fakeAlbumId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - composer does not exists, song cant be updated', async () => {
    const songDict = await buildSong({});
    const fakeSong = await createSong(songDict);

    const composerDict = await buildMusician({});
    const fakeComposer = await createMusician(composerDict);

    const fakeComposerId = fakeComposer.id;
    await fakeComposer.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${fakeSong.id}`).send({
      composer: fakeComposerId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Song does not exists, song cant be updated', async () => {
    const songDict = await buildSong({});
    const fakeSong = await createSong(songDict);
    const { id } = fakeSong;
    const { name } = fakeSong;
    await fakeSong.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ name });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted song', async () => {
    const songDict = await buildSong({});
    const fakeSong = await createSong(songDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeSong.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeSong.id);

    const deletedSong = await Song.findByPk(fakeSong.id);
    expect(deletedSong).toBe(null);
  });

  test('/DELETE - Song does not exists, song cant be deleted', async () => {
    const songDict = await buildSong({});
    const fakeSong = await createSong(songDict);
    const { id } = fakeSong;
    await fakeSong.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
