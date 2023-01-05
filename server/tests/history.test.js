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
describe('POST /api/history', () => {
  it('should create a history item', async () => {
    const res = await request(app)
      .post('/api/history')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      })
      .send({
        id: '123',
        title: 'test title',
        date: '123456789',
        user: '123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.date).toBe('123456789');
    expect(res.body.title).toBe('test title');
  });
});

describe('GET /api/history', () => {
  it('should return all history', async () => {
    const res = await request(app)
      .get('/api/history')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// describe('GET /api/history/:id', () => {
//   it('should return a history item', async () => {
//   });
// });

// describe('DELETE /api/history/:id', () => {
//   it('should delete a history item', async () => {
//     const res = await request(app)
//       .delete('/api/history/123')
//       .set({
//         Authorization: 'Bearer ' + token,
//         'Content-Type': 'application/json',
//       });
//     expect(res.statusCode).toBe(200);
//   });
// });

describe('DELETE /api/history/', () => {
  it('should delete a all history', async () => {
    const res = await request(app)
      .delete('/api/history')
      .set({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      });
    expect(res.statusCode).toBe(200);
  });
});
