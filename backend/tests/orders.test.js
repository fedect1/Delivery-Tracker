import mongoose from 'mongoose';
import supertest from 'supertest';
import OrderModel from '../src/models/mongodb/order.js';
import UserModel from '../src/models/mongodb/User.js';
import { app, server } from '../src/app.js';
import { initialOrders, initialUsers } from './test_helper.js';
import { response } from 'express';

const api = supertest(app);
let tokenTestUser;
beforeEach(async () => {
    const userId = [];
    await UserModel.deleteMany({});
    await OrderModel.deleteMany({});
    for (const user of initialUsers) {
        const userObject = new UserModel(user);
        const savedUser = await userObject.save();
        userId.push(savedUser._id.toString());
    }
    for (const [index, order] of initialOrders.entries()) {
        if (userId[index]) {
            order.user = userId[index];
        }   
        const orderObject = new OrderModel(order);
        await orderObject.save();
    }
    await api
        .post("/users")
        .send({
            "username": "testUser",
            "email": "testuser@gmail.com",
            "password": "123456#Ab"
        })
        .expect(201)
    
    const response = await api
        .post("/login")
        .send({
            "email": "testuser@gmail.com",
            "password": "123456#Ab"
        })
        .expect(200)

    tokenTestUser = response.body.token
})
describe("when the orders are posted", () => {
    test("orders are returned as json", async () => {

        await api
            .get("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    })
    test("a valid order can be added", async () => {
        const newOrder = {
            "trackerNumber": "ORD-12345ABO",
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
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(201)
            .expect("Content-Type", /application\/json/);
    })
    test("valid order can be added and response: _id, trackerNumber, costumerInfo, status, statusUpdates, createdAt", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Mario Luis Espinetta",
                "phone": "123-854-7320",
                "address": "133 Carl, Berlin, Germany",
                "email": "spi@gmail.com"
            }
        }
        const response = await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("trackerNumber")
        expect(response.body).toHaveProperty("costumerInfo")
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("statusUpdates")
        expect(response.body).toHaveProperty("createdAt")
        expect(Object.keys(response.body).length).toBe(6)
    })
    test("order with additional properties can be added taking the vaild ones", async () => {
        const newOrder = {
            "trackerNumber": "ORD-12345ABO",
            "costumerInfo": {
                "name": "Mario Luis",
                "phone": "567-854-7320",
                "address": "156 Rosentales, Berlin, Germany",
                "email": "mar@gmail.com",
                "additionalProperty": "additionalProperty"
            },
        }
        const response = await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("trackerNumber")
        expect(response.body).toHaveProperty("costumerInfo")
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("statusUpdates")
        expect(response.body).toHaveProperty("createdAt")
        expect(Object.keys(response.body).length).toBe(6)
    })
})
describe("checking Zod validation", () => {
    test("order with missing required property name can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "phone": "567-854-7320",
                "address": "1578 Kreuz, Berlin, Germany",
                "email": "mari@gmail.com",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Name is required");
            }) 
    })
    test("order with missing required property phone can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Jose Lues",
                "address": "1563 Kreuz, Berlin, Germany",
                "email": "fed@gmail.com",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Phone is required");
            })
    })
    test("order with missing required property address can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Pepe Picetto",
                "phone": "982-653-4750",
                "email": "pepe@gmail.com",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Address is required");
            })
    })
    test("order with missing required property email can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Pepe Picetto",
                "phone": "982-653-4750",
                "address": "1563 Kreuz, Berlin, Germany",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Email is required");
            })
    })

})        

afterAll(() => {
    mongoose.connection.close();
    server.close();
})