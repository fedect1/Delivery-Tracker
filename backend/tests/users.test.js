
import supertest from 'supertest';
import mongoose from 'mongoose';
import UserModel from '../src/models/mongodb/User.js';
import { app, server } from '../src/app.js';

import bcrypt from 'bcrypt';

const api = supertest(app);
describe('User tests', () => {

    beforeEach(async () => {
        await UserModel.deleteMany({});

        const passwordHash = await bcrypt.hash('123456#Ab', 10);
        const user = new UserModel({ username: 'usuario3', email:'user3@gmail.com', password: passwordHash });
        
        await user.save();
    })

    test('There is one user', async () => {
        const users = await UserModel.find({});
        expect(users).toHaveLength(1);

    })

    test('The name of the user is usuario3', async () => {
        const users = await UserModel.find({});
        expect(users[0].username).toBe('usuario3');
    })

    test('Create a new user', async () => {
        await api
            .post('/users')
            .send({ username: 'usuario4', email:'user4@gmail.com', password:"123456#Ab" })
            .expect(201)
            .expect('Content-Type', /application\/json/);
    })


    test('Create a new user with an existing username', async () => {
        await api
            .post('/users')
            .send({ username: 'usuario3', email:'usr3@gmail.com', password:"123456#Ab" })
            .expect(409)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain('Duplicate key error');
            }) 
    })

    test('Create a new user with an existing email', async () => {
        await api
            .post('/users')
            .send({ username: 'usr3', email:'user3@gmail.com', password:"123456#Ab" })
            .expect(409)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain('Duplicate key error');
            })
    })

    test('Create a new user with an invalid password', async () => {
        await api
            .post('/users')
            .send({ username: 'user4', email:'user4@gmail.com', password:"123456" })
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain('Validation failed');
            })
    })

    test('Create a new user with an invalid email', async () => {
        await api
            .post('/users')
            .send({ username: 'user4', email:'user4gmail.com', password:"123456#Ab" })
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain('Validation failed');
            })
    })

    test('Create a new user with an invalid username', async () => {
        await api
            .post('/users')
            .send({ username: 'u', email:'user5@gmail.com', password:"123456#Ab" })
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain('Validation failed');
            })
    })


    afterAll(() => {
        mongoose.connection.close();
        server.close();
    })

});