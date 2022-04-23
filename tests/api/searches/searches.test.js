const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');
const Users = require('../../../api/users/users.model');
const Universities = require('../../../api/universities/universities.model');
const Offers = require('../../../api/offers/offers.model');
const Careers = require('../../../api/careers/careers.model');
const {
  adminUser,
  initialUniversities,
  initialCareers,
  initialOffers,
  initialBillings,
  initialTests,
  initialTestResults,
} = require('../../testHelpers/initialData');
const Billings = require('../../../api/billings/billings.model');
const Results = require('../../../api/testResults/testResults.model');
const VocationalTest = require('../../../api/vocationalTest/vocationalTest.model');

const request = supertest(app);

let token;
let userUid;
let universityId;
let careerId;
let offerId;
let billingId;
let billingTransaction;
let testId;
let testResultId;

describe('Searches enpoints tests', () => {
  beforeAll(async () => {
    await connectDB();

    const university = await Universities.create(initialUniversities[0]);

    universityId = university.id;

    const res = await request.post('/api/users')
      .send({ ...adminUser, university: universityId });

    await request.get(`/auth/local/login/activate/${res.body.passResetToken}`);

    let response = await request
      .post('/auth/local/login')
      .send({
        email: adminUser.email,
        password: adminUser.password,
      });

    token = response.body.token;
    userUid = response.body.user.uid;

    response = await request.post('/api/careers')
      .set('Authorization', `Bearer ${token}`)
      .send(initialCareers[0]);

    careerId = response.body.id;

    response = await request.post('/api/offers')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...initialOffers[0], university: universityId, career: careerId });

    offerId = response.body.id;

    response = await request.post('/api/billings')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...initialBillings[0], user: userUid });

    billingId = response.body.id;
    billingTransaction = response.body.transactionNumber;

    response = await request.post('/api/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(initialTests[0]);

    testId = response.body.id;

    response = await request
      .post('/api/results')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...initialTestResults[0],
        user: userUid,
        test: testId,
      });

    testResultId = response.body.id;
  });

  afterAll(async () => {
    await Users.deleteMany();
    await Universities.deleteMany();
    await Careers.deleteMany();
    await Offers.deleteMany();
    await Billings.deleteMany();
    await VocationalTest.deleteMany();
    await Results.deleteMany();
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

  test('should not search an university with a wrong id', async () => {
    const response = await request
      .get(`/api/search/universities/${userUid}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(0);
  });

  test('should search an university by id', async () => {
    const response = await request
      .get(`/api/search/universities/${universityId}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(1);
  });

  test('should search an university by name', async () => {
    const response = await request
      .get(`/api/search/universities/${initialUniversities[0].name}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(1);
    expect(response.body.results[0].name).toBe(initialUniversities[0].name);
  });

  test('should search an university by city', async () => {
    const response = await request
      .get(`/api/search/universities/${initialUniversities[0].location.city}`);

    const universitiesName = await response.body.results.map((result) => result.name);

    expect(response.status).toBe(200);
    expect(universitiesName).toContain(initialUniversities[0].name);
  });

  test('should search an university by country', async () => {
    const response = await request
      .get(`/api/search/universities/${initialUniversities[0].location.country}`);

    const universitiesName = await response.body.results.map((result) => result.name);

    expect(response.status).toBe(200);
    expect(universitiesName).toContain(initialUniversities[0].name);
  });

  test('sholud search a career by id', async () => {
    const response = await request
      .get(`/api/search/careers/${careerId}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(1);
    expect(response.body.results[0].name).toBe(initialCareers[0].name);
  });

  test('should not search a career with a wrong id', async () => {
    const response = await request
      .get(`/api/search/careers/${userUid}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(0);
  });

  test('should search a career by name', async () => {
    const response = await request
      .get(`/api/search/careers/${initialCareers[0].name}`);

    const careersNames = await response.body.results.map((result) => result.name);

    expect(response.status).toBe(200);
    expect(careersNames).toContain(initialCareers[0].name);
  });

  test('should search a offer by id', async () => {
    const response = await request
      .get(`/api/search/offers/${offerId}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(1);
    expect(response.body.results[0].name).toBe(initialOffers[0].name);
  });

  test('should not search an offer with a wrong id', async () => {
    const response = await request
      .get(`/api/search/offers/${userUid}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(0);
  });

  test('should shearch offers by university id', async () => {
    const response = await request
      .get(`/api/search/offers/${universityId}?target=university`);

    const offerUniversityIds = await response.body.results.map((result) => result.university._id);

    expect(response.status).toBe(200);
    expect(offerUniversityIds).toContain(universityId);
  });

  test('should search offers by career id', async () => {
    const response = await request
      .get(`/api/search/offers/${careerId}?target=career`);

    const offerCareerIds = await response.body.results.map((result) => result.career._id);

    expect(response.status).toBe(200);
    expect(offerCareerIds).toContain(careerId);
  });

  test('should search offers by name', async () => {
    const response = await request
      .get(`/api/search/offers/${initialOffers[0].name}`);

    const offerNames = await response.body.results.map((result) => result.name);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalDocs');
    expect(offerNames).toContain(initialOffers[0].name);
  });

  test('should search billings by id', async () => {
    const response = await request
      .get(`/api/search/billings/${billingId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(1);
    expect(response.body.results[0].paymentMethod).toBe(initialBillings[0].paymentMethod);
  });

  test('should not search a billing with a wrong id', async () => {
    const response = await request
      .get(`/api/search/billings/${userUid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(0);
  });

  test('should search billings by user id', async () => {
    const response = await request
      .get(`/api/search/billings/${userUid}?target=user`)
      .set('Authorization', `Bearer ${token}`);

    const usersIds = await response.body.results.map((result) => result.user.uid);

    expect(response.status).toBe(200);
    expect(usersIds).toContain(userUid);
  });

  test('should search billings by payment method', async () => {
    const response = await request
      .get(`/api/search/billings/${initialBillings[0].paymentMethod}`)
      .set('Authorization', `Bearer ${token}`);

    const billingPaymentMethods = await response.body.results.map((result) => result.paymentMethod);

    expect(response.status).toBe(200);
    expect(billingPaymentMethods).toContain(initialBillings[0].paymentMethod);
  });

  test('should search a billing by transactionNumber', async () => {
    const response = await request
      .get(`/api/search/billings/${billingTransaction}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(1);
    expect(response.body.results[0].transactionNumber).toBe(billingTransaction);
  });

  test('should search billings by condition', async () => {
    const response = await request
      .get(`/api/search/billings/${initialBillings[0].condition}`)
      .set('Authorization', `Bearer ${token}`);

    const billingConditions = await response.body.results.map((result) => result.condition);

    expect(response.status).toBe(200);
    expect(billingConditions).toContain(initialBillings[0].condition);
  });

  test('should search a testResult by id', async () => {
    const response = await request
      .get(`/api/search/results/${testResultId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.totalDocs).toBe(1);
    expect(response.body.results[0].id).toBe(testResultId);
  });

  test('should not search a testResult with a invalid id', async () => {
    const response = await request
      .get('/api/search/results/INVALID_ID')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  test('should search testResults by user id', async () => {
    const response = await request
      .get(`/api/search/results/${userUid}?target=user`)
      .set('Authorization', `Bearer ${token}`);
    const usersIds = await response.body.results.map((result) => result.user._id);

    expect(response.status).toBe(200);
    expect(usersIds).toContain(userUid);
  });

  test('should search testResults by test id', async () => {
    const response = await request
      .get(`/api/search/results/${testId}?target=test`)
      .set('Authorization', `Bearer ${token}`);

    const testIds = await response.body.results.map((result) => result.test._id);

    expect(response.status).toBe(200);
    expect(testIds).toContain(testId);
  });

  test('should not search testResults wwhit an invalid target', async () => {
    const response = await request
      .get(`/api/search/results/${universityId}?target=INVALID_TARGET`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
