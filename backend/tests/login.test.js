import supertest from 'supertest';
import mongoose from 'mongoose';
import UserModel from '../src/models/mongodb/User.js';
import OrderModel from '../src/models/mongodb/order.js';
import { app, server } from '../src/app.js';

import bcrypt from 'bcrypt';

const api = supertest(app);

beforeEach(async () => {
    await UserModel.deleteMany({});
    await OrderModel.deleteMany({});

    const passwordHash = await bcrypt.hash('123456#Ab', 10);
    const user = new UserModel({ username: 'usuario3', email:'user3@gmail.com', password: passwordHash });
    
    await user.save();
})


describe('POST /login', () => {

    test('should return a token and username on successful user login', async () => {
      await api.post('/login')
        .send({ email:'user3@gmail.com', password:"123456#Ab" })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(response => {
            expect(response.body.token).toBeDefined();
            expect(response.body.username).toBe('usuario3');
        })
    })

    test('should return 401 on unsuccessful user login', async () => {
        await api.post('/login')
          .send({ email:'panchito@gmail.com', password:"123456#Ab" })
          .expect(401)
    })

    test('should return 401 and error message on unsuccessful user login', async () => {
        await api.post('/login')
        .send({ email:'panchito@gmail.com', password:"123456#Ab" })
        .expect(401)
        .expect('Content-Type', /application\/json/)
        .expect(response => {
            expect(response.body.message).toContain('Invalid credentials');
        })
    })
})

describe('GET /login/renew', () => {

    test('should return a token and username on successful token renewal', async () => {
        const loginResponse = await api.post('/login')
            .send({ email:'user3@gmail.com', password:"123456#Ab" })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const token = loginResponse.body.token;
        await api.get('/login/renew')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.token).toBeDefined();
                expect(response.body.username).toBe('usuario3');
            })
    })

    test('should return 401 on unsuccessful token renewal', async () => {
        await api.get('/login/renew')
            .expect(401)
    })

    test('should return 401 and error message on unsuccessful token renewal', async () => {
        await api.get('/login/renew')
            .expect(401)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain('Missing or invalid token');
            })
    })
})


afterAll(() => {
    mongoose.connection.close();
    server.close();
})