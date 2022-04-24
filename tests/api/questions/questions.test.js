const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');
const Tests = require('../../../api/vocationalTest/vocationalTest.model');
const Questions = require('../../../api/questions/questions.model');
const Users = require('../../../api/users/users.model');
const { initialTests } = require('../../testHelpers/initialData');

const request = supertest(app);

let initialQuestions = [
  {
    test: null,
    type: 'MULTIPLE-2',
    statement: 'What is Jest?',
    optionA: 'JavaScript Testing Framework',
  }, {
    test: null,
    type: 'MULTIPLE-4',
    statement: 'What is react?',
    optionA: 'JavaScript front-end Framework',
  },
];

const adminUser = {
  names: 'admin',
  email: 'admin@test.com',
  password: '123456',
  role: 'ADMIN',
};

let token = '';
let idTest = '';
let idQuestion = '';
let instanceDB;

describe('Questions enpoints tests', () => {
  beforeAll(async () => {
    instanceDB = await connectDB();

    const res = await request.post('/api/users')
      .send(adminUser);

    await request.get(`/auth/local/login/activate/${res.body.passResetToken}`);

    let response = await request
      .post('/auth/local/login')
      .send({
        email: adminUser.email,
        password: adminUser.password,
      });

    token = response.body.token;

    response = await request
      .post('/api/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(initialTests[0]);

    idTest = response.body.id;

    initialQuestions = initialQuestions.map((q) => ({ ...q, test: idTest }));
  });

  afterAll(async () => {
    await Tests.deleteMany();
    await Questions.deleteMany();
    await Users.deleteMany();

    await mongoose.connection.close();
  });

  test('should create a new Question', async () => {
    const response = await request
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send(initialQuestions[0]);

    idQuestion = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('test');
  });

  test('should get all Questions', async () => {
    const response = await request
      .get('/api/questions')
      .set('Authorization', `Bearer ${token}`);

    const statements = response.body.questions.map((q) => q.statement);

    expect(response.status).toBe(200);
    expect(response.body.questions[0]).toHaveProperty('id');
    expect(statements).toContain(initialQuestions[0].statement);
  });

  test('should get one Question', async () => {
    const response = await request
      .get(`/api/questions/${idQuestion}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.statement).toBe(initialQuestions[0].statement);
  });

  test('sholud not get a Question with invalid id', async () => {
    const response = await request
      .get('/api/questions/INVALID_ID')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  test('should update a Question', async () => {
    const diferentStatement = 'What is redux?';

    const response = await request
      .patch(`/api/questions/${idQuestion}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        statement: diferentStatement,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.statement).toBe(diferentStatement);
  });

  test('should not update a Question with invalid id', async () => {
    const response = await request
      .patch('/api/questions/INVALID_ID')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...initialQuestions[1] });

    const errors = response.body.errors.map((e) => e.param);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(errors).toContain('id');
  });

  test('should delete a Question', async () => {
    const response = await request
      .delete(`/api/questions/${idQuestion}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  test('should not create a Question with invalid test Id', async () => {
    const response = await request
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...initialQuestions[0], test: 'INVALID_ID' });

    expect(response.status).toBe(400);
  });

  test('should not create a Question with invalid type', async () => {
    const invalidType = 'INVALID_TYPE';

    const response = await request
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...initialQuestions[0], type: invalidType });

    const errors = response.body.errors.map((e) => e.param);

    expect(response.status).toBe(400);
    expect(errors).toContain('type');
  });
});
