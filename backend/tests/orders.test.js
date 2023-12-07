import mongoose from 'mongoose';
import supertest from 'supertest';
import OrderModel from '../src/models/mongodb/order.js';
import UserModel from '../src/models/mongodb/User.js';
import { app, server } from '../src/app.js';
import { initialOrders, initialUsers } from './test_helper.js';
import { response } from 'express';

const api = supertest(app);
let tokenTestUser;
let orderIdTestUser;
let nonAccreditedUserToken
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
            "username": "nonAccreditedUser",
            "email": "nonacredite@gmail.com",
            "password": "123456#Ab"
        })
        .expect(201)
    const responseNonAccreditedUser = await api
        .post("/login")
        .send({
            "email": "nonacredite@gmail.com",
            "password": "123456#Ab"
        })
        .expect(200)
    nonAccreditedUserToken = responseNonAccreditedUser.body.token

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
    const orderTestUser = {
        "costumerInfo": {
            "name": "Ricardo Martin",
            "phone": "163-478-7100",
            "address": "123 Main St, Townsville, Nation",
            "email": "ric@gmail.com"
        },
    }
    const responseOrder = await api
        .post("/orders")
        .set('Authorization', `Bearer ${tokenTestUser}`)
        .send(orderTestUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    orderIdTestUser=responseOrder.body._id
})
describe("POST /orders - when the orders are posted", () => {
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
describe("POST /orders - checking Zod validation", () => {
    // missing required property
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

    // invalid property value
    test("order with invalid property type name can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": 123,
                "phone": "982-653-4750",
                "address": "1563 Kreuz, Berlin, Germany",
                "email": "jor@gmail.com",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Name is expected string, received number");
            })
    })
    test("order with invalid property type phone can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Jorge Luis",
                "phone": 123,
                "address": "1563 Kreuz, Berlin, Germany",
                "email": "fede@gmail.com",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Phone is expected string, received number");
            })
    })
    test("order with invalid property type address can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Jorge Luis",
                "phone": "982-653-4750",
                "address": 123,
                "email": "jr@gmail.com",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Address is expected string, received number");
            })
    })
    test("order with invalid property type email can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Jorge Luis",
                "phone": "982-653-4750",
                "address": "1563 Kreuz, Berlin, Germany",
                "email": 123,
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Email is expected string, received number");
            })
    })
    test("order with invalid property type email can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Jorge Luis",
                "phone": "982-653-4750",
                "address": "1563 Kreuz, Berlin, Germany",
                "email": "fedegmail.com",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
    })
    test("order with invalid property type email can not be added", async () => {
        const newOrder = {
            "costumerInfo": {
                "name": "Jorge Luis",
                "phone": "982-653-4750",
                "address": "1563 Kreuz, Berlin, Germany",
                "email": "fede@gmailcom",
            },
        }
        await api
            .post("/orders")
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send(newOrder)
            .expect(400)
    })
})
describe("PATCH /orders/:trackerNumber/status - when the status is updated", () => {
    test("status is updated as json", async () => {
        await api
            .patch(`/orders/${orderIdTestUser}/status`)
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send({
                "status": "preparing"
            })
            .expect(200)
            .expect("Content-Type", /application\/json/);
    })
    test("status is updated and response: _id, status, statusUpdates", async () => {
        const response = await api
            .patch(`/orders/${orderIdTestUser}/status`)
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send({
                "status": "out for delivery"
            })
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("statusUpdates")
        expect(Object.keys(response.body).length).toBe(3)
    })
    test("status is updated and response: _id, status, statusUpdates", async () => {
        const response = await api
            .patch(`/orders/${orderIdTestUser}/status`)
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send({
                "status": "delivered"
            })
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("statusUpdates")
        expect(Object.keys(response.body).length).toBe(3)
    })
    test("status is updated and response: _id, status, statusUpdates", async () => {
        const response = await api
            .patch(`/orders/${orderIdTestUser}/status`)
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send({
                "status": "preparing"
            })
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("statusUpdates")
        expect(Object.keys(response.body).length).toBe(3)
    })
    // invalid status
    test("status is not updated when invalid status is provided", async () => {
        await api
            .patch(`/orders/${orderIdTestUser}/status`)
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send({
                "status": "delayed"
            })
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Status is invalid enum value. expected 'received' | 'preparing' | 'out for delivery' | 'delivered', received 'delayed'");
            })
    })
    // missing status
    test("status is not updated when status is missing", async () => {
        await api
            .patch(`/orders/${orderIdTestUser}/status`)
            .set('Authorization', `Bearer ${tokenTestUser}`)
            .send({
            })
            .expect(400)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("Validation failed: Status is required");
            })
    })
    // change status from an order that is not yours
    test("status is not updated when the order is not yours", async () => {
        await api
            .patch(`/orders/${orderIdTestUser}/status`)
            .set('Authorization', `Bearer ${nonAccreditedUserToken}`)
            .send({
                "status": "preparing"
            })
            .expect(401)
            .expect("Content-Type", /application\/json/)
            .expect(response => {
                expect(response.body.message).toContain("You are not authorized to update this order");
            })
    })
})

afterAll(() => {
    mongoose.connection.close();
    server.close();
})