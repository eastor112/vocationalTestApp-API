const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');
const Billings = require('../../../api/billings/billings.model');
const Users = require('../../../api/users/users.model');

const request = supertest(app);

const adminUser = {
  name: 'admin',
  email: 'admin@test.com',
  password: '123456',
  role: 'ADMIN',
};

let initialBillings = [{
  paymentMethod: 'CREDIT CARD',
}, {
  paymentMethod: 'DEBIT CARD',
}, {
  paymentMethod: 'PAYPAL',
}];

let token = '';
let idBilling = '';

describe('Billings enpoints tests', () => {
  beforeAll(async () => {
    await connectDB();

    const res = await request.post('/api/users').send(
      adminUser,
    );

    await request.get(`/auth/local/login/activate/${res.body.passResetToken}`);

    const response = await request
      .post('/auth/local/login')
      .send({
        email: adminUser.email,
        password: adminUser.password,
      });

    const { uid } = response.body.user;
    token = response.body.token;

    initialBillings = initialBillings.map((c) => ({ ...c, user: uid }));
  });

  afterAll(async () => {
    await Billings.deleteMany({});
    await Users.deleteMany({});
    await mongoose.connection.close();
  });

  test('should create a new billing', async () => {
    const response = await request
      .post('/api/billings')
      .set('Authorization', `Bearer ${token}`)
      .send(initialBillings[0]);

    idBilling = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.paymentMethod).toBe(initialBillings[0].paymentMethod);
  });

  test('should not create a new billing without user or paymentMethod', async () => {
    const response = await request
      .post('/api/billings')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });

  test('should not create a new billing with invalid paymentMethod', async () => {
    const response = await request
      .post('/api/billings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        paymentMethod: 'INVALID',
      });

    expect(response.status).toBe(400);
  });

  test('should not create a new billing with invalid user', async () => {
    const response = await request
      .post('/api/billings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: 'INVALID',
      });

    expect(response.status).toBe(400);
  });

  test('should get all billings', async () => {
    const response = await request
      .get('/api/billings')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('billings');
    expect(response.body.totalDocs > 0).toBe(true);
  });

  test('should get one billing', async () => {
    const response = await request
      .get(`/api/billings/${idBilling}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('paymentMethod');
    expect(response.body.id).toBe(idBilling);
  });

  test('should not get one billing with invalid id', async () => {
    const response = await request
      .get('/api/billings/INVALID')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  test('should update one billing', async () => {
    const diferentMethod = initialBillings[1].paymentMethod;

    const response = await request
      .patch(`/api/billings/${idBilling}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        paymentMethod: diferentMethod,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('paymentMethod');
    expect(response.body.paymentMethod).toBe(diferentMethod);
  });

  test('should not update one billing with invalid id', async () => {
    const response = await request
      .patch('/api/billings/INVALID')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: 'INVALID',
      });

    expect(response.status).toBe(400);
  });

  test('should not update one billing with invalid paymentMethod', async () => {
    const response = await request
      .patch(`/api/billings/${idBilling}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        paymentMethod: 'INVALID',
      });

    expect(response.status).toBe(400);
  });

  test('should delete one billing', async () => {
    let response = await request
      .delete(`/api/billings/${idBilling}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    response = await request
      .get(`/api/billings/${idBilling}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
