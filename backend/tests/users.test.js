
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
 

describe('User tests', () => {

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
                expect(response.body.message).toContain('User with this username already exists');
            }) 
    })

    test('Create a new user with an existing email', async () => {
        await api
            .post('/users')
            .send({ username: 'usr3', email:'user3@gmail.com', password:"123456#Ab" })
            .expect(409)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain('User with this email already exists');
            })
    })

    test('Create a new user with an invalid password', async () => {
        await api
            .post('/users')
            .send({ username: 'user4', email:'user4@gmail.com', password:"123456" })
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toBe('Validation failed: Password must be at least 8 characters long, Password must contain at least one lowercase letter, one uppercase letter, one number and one special character');
            })
    })

    test('Create a new user with an invalid email', async () => {
        await api
            .post('/users')
            .send({ username: 'user4', email:'user4gmail.com', password:"123456#Ab" })
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toBe('Validation failed: Invalid email');
            })
    })

    test('Create a new user with an invalid username', async () => {
        await api
            .post('/users')
            .send({ username: 'u', email:'user5@gmail.com', password:"123456#Ab" })
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.message).toBe('Validation failed: Name must be at least 3 characters long');
            })
    })

    test('Create a new order and check if user is updated with the id of that order', async () => {
        await api.post('/users')
            .send({ username: 'usuario6', email:'user6@gmail.com',password:'123456#Ab' })
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const tokenResponse = await api
            .post('/login')
            .send({email:'user6@gmail.com', password:'123456#Ab'})
            .expect(200)


        const newOrder = {
            "trackerNumber": "ORD-12345",
            "costumerInfo": {
                "name": "John Smith",
                "phone": "123-456-7890",
                "address": "123 Main St, Townsville, Nation",
                "email": "raul@gmail.com"
            },
            "orderDetails": {
                "items": [
                    {
                        "itemName": "Apple",
                        "quantity": 5,
                        "pricePerItem": 0.6
                    },
                    {
                        "itemName": "Orange",
                        "quantity": 4,
                        "pricePerItem": 1.0
                    },
                    {
                        "itemName": "Banana",
                        "quantity": 15,
                        "pricePerItem": 0.4
                    }
                ],
                "totalPrice": 10.5
            }
        }

        await api.post('/orders')
            .set('Authorization', `Bearer ${tokenResponse.body.token}`)
            .send(newOrder)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const updatedUser = await UserModel.findOne({username: 'usuario6'});
        expect(updatedUser.orders).toHaveLength(1);

    })  
});

afterAll(() => {
    mongoose.connection.close();
    server.close();
})