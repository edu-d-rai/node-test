import request from 'supertest';
import { Concert, Musician } from 'data/models';
import { app } from 'server/app';
import { buildConcert, buildMusician, createConcert, createMusician } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/concert-api';

describe('ConcertApi tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created concert', async () => {
    const mainArtistDict = await buildMusician({});
    const fakeMainArtist = await createMusician(mainArtistDict);
    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const fakeConcert = await buildConcert({
      mainArtist: fakeMainArtist.id,
      secondaryArtist: fakeSecondaryArtist.id,
    });

    const response = await request(app).post(ENDPOINT).send(fakeConcert);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseConcert = response.body.data;

    const concert = await Concert.findByPk(responseConcert.name);

    expect(concert.place).toBe(fakeConcert.place);
    expect(concert.date.toISOString()).toEqual(fakeConcert.date);
    expect(concert.isFree).toBe(fakeConcert.isFree);

    expect(concert.mainArtist).toBe(fakeConcert.mainArtist);
    expect(concert.secondaryArtist).toBe(fakeConcert.secondaryArtist);
  });

  test('/POST - mainArtist does not exists, concert cant be created', async () => {
    const fakeConcert = await buildConcert({});
    const mainArtist = await Musician.findOne({ where: { id: fakeConcert.mainArtist } });
    await mainArtist.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeConcert);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - secondaryArtist does not exist, concert cant be created', async () => {
    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const { id } = fakeSecondaryArtist;
    await fakeSecondaryArtist.destroy();

    const fakeConcert = await buildConcert({ secondaryArtist: id });

    const response = await request(app).post(ENDPOINT).send(fakeConcert);

    expect(response.statusCode).toBe(404);
  });

  test('/GET - Response with a concert', async () => {
    const mainArtistDict = await buildMusician({});
    const fakeMainArtist = await createMusician(mainArtistDict);
    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const concertDict = await buildConcert({
      mainArtist: fakeMainArtist.id,
      secondaryArtist: fakeSecondaryArtist.id,
    });
    const fakeConcert = await createConcert(concertDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeConcert.name}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.name).toBe(fakeConcert.name);
    expect(data.place).toBe(fakeConcert.place);
    expect(data.date).toBe(fakeConcert.date.toISOString());
    expect(data.isFree).toBe(fakeConcert.isFree);

    expect(data.mainArtist).toBe(fakeConcert.mainArtist);
    expect(data.secondaryArtist).toBe(fakeConcert.secondaryArtist);
  });

  test('/GET - Response with a concert not found', async () => {
    const concertDict = await buildConcert({});
    const fakeConcert = await createConcert(concertDict);
    const { name } = fakeConcert;
    await fakeConcert.destroy();

    const response = await request(app).get(`${ENDPOINT}/${name}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a list of concerts', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allConcert = await Concert.findAll();
    expect(data.length).toBe(allConcert.length);
  });

  test('/PUT - Response with an updated concert', async () => {
    const mainArtistDict = await buildMusician({});
    const fakeMainArtist = await createMusician(mainArtistDict);
    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const concertDict = await buildConcert({
      mainArtist: fakeMainArtist.id,
      secondaryArtist: fakeSecondaryArtist.id,
    });
    const fakeConcert = await createConcert(concertDict);

    const anotherMainArtistDict = await buildMusician({});
    const anotherFakeMainArtist = await createMusician(anotherMainArtistDict);
    const anotherSecondaryArtistDict = await buildMusician({});
    const anotherFakeSecondaryArtist = await createMusician(anotherSecondaryArtistDict);

    const anotherFakeConcert = await buildConcert({
      mainArtist: anotherFakeMainArtist.id,
      secondaryArtist: anotherFakeSecondaryArtist.id,
    });

    const response = await request(app).put(`${ENDPOINT}/${fakeConcert.name}`).send({
      place: anotherFakeConcert.place,
      date: anotherFakeConcert.date,
      isFree: anotherFakeConcert.isFree,
      mainArtist: anotherFakeConcert.mainArtist,
      secondaryArtist: anotherFakeConcert.secondaryArtist,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.place).toBe(anotherFakeConcert.place);
    expect(data.date).toBe(anotherFakeConcert.date);
    expect(data.isFree).toBe(anotherFakeConcert.isFree);

    expect(data.mainArtist).toBe(anotherFakeConcert.mainArtist);

    expect(data.secondaryArtist).toBe(anotherFakeConcert.secondaryArtist);

    const updatedConcert = await Concert.findByPk(fakeConcert.name);

    expect(updatedConcert.place).toBe(anotherFakeConcert.place);
    expect(updatedConcert.date.toISOString()).toEqual(anotherFakeConcert.date);
    expect(updatedConcert.isFree).toBe(anotherFakeConcert.isFree);

    expect(updatedConcert.mainArtist).toBe(anotherFakeConcert.mainArtist);
    expect(updatedConcert.secondaryArtist).toBe(anotherFakeConcert.secondaryArtist);
  });

  test('/PUT - mainArtist does not exists, concert cant be updated', async () => {
    const mainArtistDict = await buildMusician({});
    const fakeMainArtist = await createMusician(mainArtistDict);
    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const concertDict = await buildConcert({
      mainArtist: fakeMainArtist.id,
      secondaryArtist: fakeSecondaryArtist.id,
    });
    const fakeConcert = await createConcert(concertDict);

    const anotherMainArtistDict = await buildMusician({});
    const anotherFakeMainArtist = await createMusician(anotherMainArtistDict);

    concertDict.mainArtist = anotherFakeMainArtist.id;

    await anotherFakeMainArtist.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeConcert.name}`).send({
      place: concertDict.place,
      date: concertDict.date,
      isFree: concertDict.isFree,
      mainArtist: concertDict.mainArtist,
      secondaryArtist: concertDict.secondaryArtist,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - secondaryArtist does not exists, concert cant be updated', async () => {
    const mainArtistDict = await buildMusician({});
    const fakeMainArtist = await createMusician(mainArtistDict);
    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const concertDict = await buildConcert({
      mainArtist: fakeMainArtist.id,
      secondaryArtist: fakeSecondaryArtist.id,
    });
    const fakeConcert = await createConcert(concertDict);

    const anotherSecondaryArtistDict = await buildMusician({});
    const anotherFakeSecondaryArtist = await createMusician(anotherSecondaryArtistDict);

    concertDict.secondaryArtist = anotherFakeSecondaryArtist.id;

    await anotherFakeSecondaryArtist.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeConcert.name}`).send({
      place: concertDict.place,
      date: concertDict.date,
      isFree: concertDict.isFree,
      mainArtist: concertDict.mainArtist,
      secondaryArtist: concertDict.secondaryArtist,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Concert does not exists, concert cant be updated', async () => {
    const concertDict = await buildConcert({});
    const fakeConcert = await createConcert(concertDict);
    const { name } = fakeConcert;
    await fakeConcert.destroy();

    const response = await request(app).put(`${ENDPOINT}/${name}`).send({
      place: concertDict.place,
      date: concertDict.date,
      isFree: concertDict.isFree,
      mainArtist: concertDict.mainArtist,
      secondaryArtist: concertDict.secondaryArtist,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated concert (no updates)', async () => {
    const mainArtistDict = await buildMusician({});
    const fakeMainArtist = await createMusician(mainArtistDict);
    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const concertDict = await buildConcert({
      mainArtist: fakeMainArtist.id,
      secondaryArtist: fakeSecondaryArtist.id,
    });
    const fakeConcert = await createConcert(concertDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeConcert.name}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated concert', async () => {
    const mainArtistDict = await buildMusician({});
    const fakeMainArtist = await createMusician(mainArtistDict);
    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const concertDict = await buildConcert({
      mainArtist: fakeMainArtist.id,
      secondaryArtist: fakeSecondaryArtist.id,
    });
    const fakeConcert = await createConcert(concertDict);

    const anotherMainArtistDict = await buildMusician({});
    const anotherFakeMainArtist = await createMusician(anotherMainArtistDict);
    const anotherSecondaryArtistDict = await buildMusician({});
    const anotherFakeSecondaryArtist = await createMusician(anotherSecondaryArtistDict);

    const anotherFakeConcert = await buildConcert({
      mainArtist: anotherFakeMainArtist.id,
      secondaryArtist: anotherFakeSecondaryArtist.id,
    });

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeConcert.name}`)
      .send({ place: anotherFakeConcert.place });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.place).toBe(anotherFakeConcert.place);

    const updatedConcert = await Concert.findByPk(fakeConcert.name);

    expect(updatedConcert.place).toBe(anotherFakeConcert.place);
  });

  test('/PATCH - mainArtist does not exists, concert cant be updated', async () => {
    const concertDict = await buildConcert({});
    const fakeConcert = await createConcert(concertDict);

    const mainArtistDict = await buildMusician({});
    const fakeMainArtist = await createMusician(mainArtistDict);

    const fakeMainArtistId = fakeMainArtist.id;
    await fakeMainArtist.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${fakeConcert.name}`).send({
      mainArtist: fakeMainArtistId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - secondaryArtist does not exists, concert cant be updated', async () => {
    const concertDict = await buildConcert({});
    const fakeConcert = await createConcert(concertDict);

    const secondaryArtistDict = await buildMusician({});
    const fakeSecondaryArtist = await createMusician(secondaryArtistDict);

    const fakeSecondaryArtistId = fakeSecondaryArtist.id;
    await fakeSecondaryArtist.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${fakeConcert.name}`).send({
      secondaryArtist: fakeSecondaryArtistId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Concert does not exists, concert cant be updated', async () => {
    const concertDict = await buildConcert({});
    const fakeConcert = await createConcert(concertDict);
    const { name } = fakeConcert;
    const { place } = fakeConcert;
    await fakeConcert.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${name}`).send({ place });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted concert', async () => {
    const concertDict = await buildConcert({});
    const fakeConcert = await createConcert(concertDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeConcert.name}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(fakeConcert.name);

    const deletedConcert = await Concert.findByPk(fakeConcert.name);
    expect(deletedConcert).toBe(null);
  });

  test('/DELETE - Concert does not exists, concert cant be deleted', async () => {
    const concertDict = await buildConcert({});
    const fakeConcert = await createConcert(concertDict);
    const { name } = fakeConcert;
    await fakeConcert.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${name}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
