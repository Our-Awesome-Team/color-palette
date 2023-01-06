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
describe('POST /api/favoriteSchemes', () => {
  it('should create a favorite scheme', async () => {
    const res = await request(app)
      .post('/api/favoriteSchemes')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      })
      .send({
        id: '123',
        tags: [{ id: 123, name: 'white' }],
        colors: ['#ffffff', '#ffffff', '#ffffff'],
        user: '123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.colors).toEqual(['#ffffff', '#ffffff', '#ffffff']);
  });
});

describe('GET /api/favoriteSchemes', () => {
  it('should return all favorite schemes', async () => {
    const res = await request(app)
      .get('/api/favoriteSchemes')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// describe('GET /api/favoriteSchemes/:id', () => {
//   it('should return a favorite scheme', async () => {
//   });
// });

// describe('PUT /api/favoriteSchemes/:id', () => {
//   it('should update a favorite scheme', async () => {
//   });
// });

describe('DELETE /api/favoriteSchemes/:id', () => {
  it('should delete a favorite scheme', async () => {
    const res = await request(app)
      .delete('/api/favoriteSchemes/123')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      });
    expect(res.statusCode).toBe(200);
  });
});
