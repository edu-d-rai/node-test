import request from 'supertest';
import { Musician } from 'data/models';
import { app } from 'server/app';
import { buildMusician, createMusician } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/musician-update-influencer';

describe('MusicianUpdateInfluencer tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/PUT - Response with an updated musician', async () => {
    const influencerDict = await buildMusician({});
    const fakeInfluencer = await createMusician(influencerDict);

    const musicianDict = await buildMusician({ influencer: fakeInfluencer.id });
    const fakeMusician = await createMusician(musicianDict);

    const anotherInfluencerDict = await buildMusician({});
    const anotherFakeInfluencer = await createMusician(anotherInfluencerDict);

    const anotherFakeMusician = await buildMusician({ influencer: anotherFakeInfluencer.id });

    const response = await request(app).put(`${ENDPOINT}/${fakeMusician.id}`).send({
      influencer: anotherFakeMusician.influencer,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.influencer).toBe(anotherFakeMusician.influencer);

    const updatedMusician = await Musician.findByPk(fakeMusician.id);

    expect(updatedMusician.influencer).toBe(anotherFakeMusician.influencer);
  });

  test('/PUT - influencer does not exists, musician cant be updated', async () => {
    const influencerDict = await buildMusician({});
    const fakeInfluencer = await createMusician(influencerDict);

    const musicianDict = await buildMusician({ influencer: fakeInfluencer.id });
    const fakeMusician = await createMusician(musicianDict);

    const anotherInfluencerDict = await buildMusician({});
    const anotherFakeInfluencer = await createMusician(anotherInfluencerDict);

    musicianDict.influencer = anotherFakeInfluencer.id;

    await anotherFakeInfluencer.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeMusician.id}`).send({
      influencer: musicianDict.influencer,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Musician does not exists, musician cant be updated', async () => {
    const musicianDict = await buildMusician({});
    const fakeMusician = await createMusician(musicianDict);
    const { id } = fakeMusician;
    await fakeMusician.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      influencer: musicianDict.influencer,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated musician (no updates)', async () => {
    const influencerDict = await buildMusician({});
    const fakeInfluencer = await createMusician(influencerDict);

    const musicianDict = await buildMusician({ influencer: fakeInfluencer.id });
    const fakeMusician = await createMusician(musicianDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeMusician.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });
});
