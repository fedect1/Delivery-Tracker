import mongoose from 'mongoose';
import supertest from 'supertest';
import OrderModel from '../src/models/mongodb/order.js';
import UserModel from '../src/models/mongodb/User.js';
import { app, server } from '../src/app.js';
import { initialOrders, initialUsers } from './test_helper.js';


const api = supertest(app);
test('works as expected creating a valid user', async () => {
    const newUser = {
        "username": "raul",
        "password": "123456"
    }
    await api
        .post('/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const usersAtEnd = await UserModel.find({});
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1);
    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
})
