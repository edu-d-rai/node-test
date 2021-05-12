import request from 'supertest';
import { buildM2, buildM1, createM2, createM1 } from './factories';
import { startDatabase } from './utils';
import { M2 } from 'data/models';
import { app } from 'server/app';


const ENDPOINT = '/m2';

describe('M2 tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });
  
  test('/POST - Response with a new created m2', async () => {

    const fakeM2 = await buildM2({  });

    const response = await request(app)
      .post(ENDPOINT)
      .send(fakeM2);
      
    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseM2 = response.body.data;

    const m2 = await M2.findByPk(responseM2.id);

    
  });

  test('/POST - Response with a new created m2 album with many to many related models', async () => {

    const m1sDict = await buildM1({});
    const fakeM1s = await createM1(m1sDict);

    const fakeM2 = await buildM2({ m1s: [fakeM1s.id],  });

    const response = await request(app)
      .post(ENDPOINT)
      .send(fakeM2);
      
    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseM2 = response.body.data;

    const m2 = await M2.findByPk(responseM2.id, { include: ['m1s'] });

    expect(m2.m1s[0].id).toBe(fakeM1s.id);
    expect(m2.m1s.length).toBe(1);    
  });

  
  

  test('/GET - Response with a m2', async () => {

    const m2Dict = await buildM2({  });
    const fakeM2 = await createM2(m2Dict);

    const response = await request(app)
      .get(`${ENDPOINT}/${ fakeM2.id }`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeM2.id);

  });

  test('/GET - Response with a m2 not found', async () => {
    const m2Dict = await buildM2({});
    const fakeM2 = await createM2(m2Dict);
    const { id } = fakeM2;
    await fakeM2.destroy();
    
    const response = await request(app).get(`${ENDPOINT}/${ id }`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  

  test('/GET - Response with a list of m2s', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allM2 = await M2.findAll()
    expect(data.length).toBe(allM2.length);
  });

  test('/PUT - Response with an updated m2', async () => {

    const m2Dict = await buildM2({  });
    const fakeM2 = await createM2(m2Dict);


    const anotherFakeM2 = await buildM2({  });

    const response = await request(app)
      .put(`${ENDPOINT}/${ fakeM2.id }`)
      .send({
      });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);


    const updatedM2 = await M2.findByPk(fakeM2.id);

    
  });



  test('/PUT - M2 does not exists, m2 cant be updated', async () => {
    const m2Dict = await buildM2({});
    const fakeM2 = await createM2(m2Dict);
    const { id } = fakeM2;
    await fakeM2.destroy();
    
    const response = await request(app)
      .put(`${ENDPOINT}/${ id }`)
      .send({
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated m2 (no updates)', async () => {

    const m2Dict = await buildM2({  });
    const fakeM2 = await createM2(m2Dict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${ fakeM2.id }`)
      .send({ m1s: [],  });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });


  
  test('/DELETE - Response with a deleted m2', async () => {
    const m2Dict = await buildM2({});
    const fakeM2 = await createM2(m2Dict);

    const response = await request(app)
      .delete(`${ENDPOINT}/${ fakeM2.id }`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeM2.id);

    const deletedM2 = await M2.findByPk(fakeM2.id);
    expect(deletedM2).toBe(null);
  });
  
  test('/DELETE - M2 does not exists, m2 cant be deleted', async () => {
    const m2Dict = await buildM2({});
    const fakeM2 = await createM2(m2Dict);
    const { id } = fakeM2;
    await fakeM2.destroy();
    
    const response = await request(app)
      .delete(`${ENDPOINT}/${ id }`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});

