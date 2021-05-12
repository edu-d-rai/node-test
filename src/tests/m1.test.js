import request from 'supertest';
import { buildM1, buildM2, createM1, createM2 } from './factories';
import { startDatabase } from './utils';
import { M1 } from 'data/models';
import { app } from 'server/app';


const ENDPOINT = '/m1';

describe('M1 tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });
  
  test('/POST - Response with a new created m1', async () => {

    const fakeM1 = await buildM1({  });

    const response = await request(app)
      .post(ENDPOINT)
      .send(fakeM1);
      
    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseM1 = response.body.data;

    const m1 = await M1.findByPk(responseM1.id);

    
  });

  test('/POST - Response with a new created m1 album with many to many related models', async () => {

    const m2sDict = await buildM2({});
    const fakeM2s = await createM2(m2sDict);

    const fakeM1 = await buildM1({ m2s: [fakeM2s.id],  });

    const response = await request(app)
      .post(ENDPOINT)
      .send(fakeM1);
      
    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseM1 = response.body.data;

    const m1 = await M1.findByPk(responseM1.id, { include: ['m2s'] });

    expect(m1.m2s[0].id).toBe(fakeM2s.id);
    expect(m1.m2s.length).toBe(1);    
  });

  
  

  test('/GET - Response with a m1', async () => {

    const m1Dict = await buildM1({  });
    const fakeM1 = await createM1(m1Dict);

    const response = await request(app)
      .get(`${ENDPOINT}/${ fakeM1.id }`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeM1.id);

  });

  test('/GET - Response with a m1 not found', async () => {
    const m1Dict = await buildM1({});
    const fakeM1 = await createM1(m1Dict);
    const { id } = fakeM1;
    await fakeM1.destroy();
    
    const response = await request(app).get(`${ENDPOINT}/${ id }`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  

  test('/GET - Response with a list of m1s', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allM1 = await M1.findAll()
    expect(data.length).toBe(allM1.length);
  });

  test('/PUT - Response with an updated m1', async () => {

    const m1Dict = await buildM1({  });
    const fakeM1 = await createM1(m1Dict);


    const anotherFakeM1 = await buildM1({  });

    const response = await request(app)
      .put(`${ENDPOINT}/${ fakeM1.id }`)
      .send({
      });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);


    const updatedM1 = await M1.findByPk(fakeM1.id);

    
  });



  test('/PUT - M1 does not exists, m1 cant be updated', async () => {
    const m1Dict = await buildM1({});
    const fakeM1 = await createM1(m1Dict);
    const { id } = fakeM1;
    await fakeM1.destroy();
    
    const response = await request(app)
      .put(`${ENDPOINT}/${ id }`)
      .send({
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated m1 (no updates)', async () => {

    const m1Dict = await buildM1({  });
    const fakeM1 = await createM1(m1Dict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${ fakeM1.id }`)
      .send({ m2s: [],  });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });


  
  test('/DELETE - Response with a deleted m1', async () => {
    const m1Dict = await buildM1({});
    const fakeM1 = await createM1(m1Dict);

    const response = await request(app)
      .delete(`${ENDPOINT}/${ fakeM1.id }`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeM1.id);

    const deletedM1 = await M1.findByPk(fakeM1.id);
    expect(deletedM1).toBe(null);
  });
  
  test('/DELETE - M1 does not exists, m1 cant be deleted', async () => {
    const m1Dict = await buildM1({});
    const fakeM1 = await createM1(m1Dict);
    const { id } = fakeM1;
    await fakeM1.destroy();
    
    const response = await request(app)
      .delete(`${ENDPOINT}/${ id }`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});

