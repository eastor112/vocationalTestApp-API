const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');
const Users = require('../../../api/users/users.model');
const Universities = require('../../../api/universities/universities.model');
const { adminUser, initialUniversities } = require('../../testHelpers/initialData');

const request = supertest(app);

let token;
let userUid;
let universityId;

describe('Searches enpoints tests', () => {
  beforeAll(async () => {
    await connectDB();

    const university = await Universities.create(initialUniversities[0]);

    universityId = university.id;

    await request.post('/api/users')
      .send({ ...adminUser, university: universityId });

    const response = await request
      .post('/auth/local/login')
      .send({
        email: adminUser.email,
        password: adminUser.password,
      });

    token = response.body.token;
    userUid = response.body.user.uid;
  });

  afterAll(async () => {
    await Users.deleteMany();
    await mongoose.connection.close();
  });

  test('should search an user by uid', async () => {
    const response = await request
      .get(`/api/search/users/${userUid}`)
      .set('Authorization', `Bearer ${token}`);

    const uids = response.body.results.map((result) => result.uid);

    expect(response.status).toBe(200);
    expect(uids).toContain(userUid);
  });

  test('should search an user by email', async () => {
    const response = await request
      .get(`/api/search/users/${adminUser.email}`)
      .set('Authorization', `Bearer ${token}`);

    const emails = response.body.results.map((result) => result.email);

    expect(response.status).toBe(200);
    expect(emails).toContain(adminUser.email);
  });

  test('should search an user by names', async () => {
    const response = await request
      .get(`/api/search/users/${adminUser.names}`)
      .set('Authorization', `Bearer ${token}`);

    const names = response.body.results.map((result) => result.names);

    expect(response.status).toBe(200);
    expect(names).toContain(adminUser.names);
  });

  test('should search an user by university', async () => {
    const response = await request
      .get(`/api/search/users/${universityId}`)
      .set('Authorization', `Bearer ${token}`);

    const universityIds = response.body.results.map((result) => result.university._id);

    expect(response.status).toBe(200);
    expect(universityIds).toContain(universityId);
  });
});
