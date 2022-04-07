const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');
const User = require('../../../api/users/users.model');
const Careers = require('../../../api/careers/careers.model');

const request = supertest(app);

const adminUser = {
  name: 'admin',
  email: 'admin@test.com',
  password: '123456',
  role: 'ADMIN',
};

const initialCareers = [{
  name: 'Engineer',
  description: 'Engineer',
  field: {
    description: 'Engineer',
    list: ['Engineer'],
    references: ['Engineer'],
  },
  skills: {
    description: 'Engineer',
    list: ['Engineer'],
    references: ['Engineer'],
  },
  photo: 'Engineer',
}, {
  name: 'Lawer',
  description: 'Lawer',
  field: {
    description: 'Lawer',
    list: ['Lawer'],
    references: ['Lawer'],
  },
  skills: {
    description: 'Lawer',
    list: ['Lawer'],
    references: ['Lawer'],
  },
  photo: 'Lawer',
}, {
  name: 'Doctor',
  description: 'Doctor',
  field: {
    description: 'Doctor',
    list: ['Doctor'],
    references: ['Doctor'],
  },
  skills: {
    description: 'Doctor',
    list: ['Doctor'],
    references: ['Doctor'],
  },
  photo: 'Doctor',
}];

let token = '';
let id = '';

describe('Careers enpoints tests', () => {
  beforeAll(async () => {
    await connectDB();
    await request.post('/api/users').send(
      adminUser,
    );

    const response = await request
      .post('/auth/local/login')
      .send({
        email: adminUser.email,
        password: adminUser.password,
      });

    token = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Careers.deleteMany({});

    await mongoose.connection.close();
  });

  test('should create a new careers', async () => {
    const response = await request
      .post('/api/careers')
      .send(initialCareers[0])
      .set('Authorization', `Bearer ${token}`);

    id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('should not create a new career without name', async () => {
    const response = await request
      .post('/api/careers')
      .send({})
      .set('Authorization', `Bearer ${token}`);

    const paramsError = response.body.errors.map((error) => error.param);

    expect(response.status).toBe(400);
    expect(paramsError).toContain('name');
  });

  test('should get all careers', async () => {
    const response = await request
      .get('/api/careers');

    const careers = response.body.careers.map((r) => r.name);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalDocs');
    expect(careers).toContain(initialCareers[0].name);
  });

  test('should get one career', async () => {
    const response = await request
      .get(`/api/careers/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(initialCareers[0].name);
  });

  test('should not get one career with invalid id', async () => {
    const response = await request
      .get('/api/careers/invalid-id');

    expect(response.status).toBe(400);
  });

  test('should update one career', async () => {
    const newName = 'Engineer2';

    const response = await request
      .patch(`/api/careers/${id}`)
      .send({ name: newName })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(newName);
  });

  test('should not update one career with invalid id', async () => {
    const response = await request
      .patch('/api/careers/invalid-id')
      .send({ name: 'Engineer2' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  test('should delete one career', async () => {
    let response = await request
      .get('/api/careers');

    const totalCareersPre = response.body.careers.length;

    response = await request
      .delete(`/api/careers/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    response = await request
      .get('/api/careers');

    const totalCareersPost = response.body.careers.length;

    expect(totalCareersPre - totalCareersPost).toBe(1);
  });

  test('should not delete one career with invalid id', async () => {
    const response = await request
      .delete('/api/careers/invalid-id')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
