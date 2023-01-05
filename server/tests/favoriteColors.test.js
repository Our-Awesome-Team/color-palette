const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

require('dotenv').config();

// Connecting to the database before each test.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Auth test user
let token;
const body = {
  email: 'user3@mail.com',
  password: '12345',
};
beforeEach(async () => {
  const res = await request(app).post('/api/users/login').send(body);
  token = res.body.token;
});

// Dropping the database and closing connection after each test.
afterAll(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// Testing the API endpoints.
describe('POST /api/favoriteColors', () => {
  it('should create a favorite color', async () => {
    const res = await request(app)
      .post('/api/favoriteColors')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      })
      .send({
        id: 123,
        tags: [{ id: 123, name: 'white' }],
        hex: '#ffffff',
        user: '123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.hex).toBe('#ffffff');
  });
});

describe('GET /api/favoriteColors', () => {
  it('should return all favorite colors', async () => {
    const res = await request(app)
      .get('/api/favoriteColors')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// describe('GET /api/favoriteColors/:id', () => {
//   it('should return a favorite color', async () => {
//   });
// });

// describe('PUT /api/favoriteColor/:id', () => {
//   it('should update a favorite color', async () => {
//   });
// });

describe('DELETE /api/favoriteColors/:id', () => {
  it('should delete a favorite color', async () => {
    const res = await request(app)
      .delete('/api/favoriteColors/123')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      });
    expect(res.statusCode).toBe(200);
  });
});
