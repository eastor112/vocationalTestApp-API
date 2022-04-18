const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');
const Users = require('../../../api/users/users.model');

const request = supertest(app);

const initialUsers = [{
  names: 'user1',
  email: 'test1@test.com',
  password: '123456',
  role: 'ADMIN',
},
{
  names: 'user2',
  email: 'test2@test.com',
  password: '123456',
  role: 'INSTITUTION',
},
{
  names: 'user3',
  email: 'test3@test.com',
  password: '123456',
  role: 'STUDENT',
}];

let token = '';
let uid = '';

describe('Users enpoints tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await Users.deleteMany();
    await mongoose.connection.close();
  });

  test('should create 3 users, and login with an admin account', async () => {
    const usersPromises = initialUsers.map((user) => request.post('/api/users').send(user));
    const [r1, r2, r3] = await Promise.all(usersPromises);

    await request.get(`/auth/local/login/activate/${r1.body.passResetToken}`);
    await request.get(`/auth/local/login/activate/${r2.body.passResetToken}`);
    await request.get(`/auth/local/login/activate/${r3.body.passResetToken}`);

    let response = await request
      .post('/auth/local/login')
      .send({
        email: initialUsers[0].email,
        password: initialUsers[0].password,
      });

    token = response.body.token;
    uid = response.body.user.uid;

    response = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBe(initialUsers.length);
  });

  test('should not create a user with a same email', async () => {
    const res = await request
      .post('/api/users/')
      .send({
        email: 'test1@test.com',
        password: '123456',
        role: 'STUDENT',
      });

    expect(res.statusCode).toEqual(400);
  });

  test('should not get a user without token', async () => {
    const res = await request
      .get(`/api/users/${uid}`);

    expect(res.statusCode).toEqual(401);
  });

  test('should return one user', async () => {
    const response = await request
      .get(`/api/users/${uid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.uid).toBe(uid);
  });

  test('should not get a user with invalid uid', async () => {
    const response = await request
      .get('/api/users/invalid-uid')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  test('should update a user', async () => {
    const diferentNames = 'diferentNames';

    const response = await request
      .patch(`/api/users/${uid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        names: diferentNames,
        role: initialUsers[0].role,
      });

    expect(response.status).toBe(200);
    expect(response.body.names).toBe(diferentNames);
  });

  test('should not update a user with invalid uid', async () => {
    const diferentNames = 'diferentNames';

    const response = await request
      .patch('/api/users/invalid-uid')
      .set('Authorization', `Bearer ${token}`)
      .send({
        names: diferentNames,
      });

    expect(response.status).toBe(400);
  });

  test('should update a user password', async () => {
    const difirentPassword = '1234567';

    const response = await request
      .patch(`/api/users/${uid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: difirentPassword,
      });

    expect(response.status).toBe(200);
  });

  test('should not update a user with invalid role', async () => {
    const diferentNames = 'diferentNames';

    const response = await request
      .patch(`/api/users/${uid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        names: diferentNames,
        role: 'INVALID_ROLE',
      });

    expect(response.status).toBe(400);
  });

  test('should delete a user', async () => {
    const response = await request
      .delete(`/api/users/${uid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
