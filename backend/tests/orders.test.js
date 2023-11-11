import mongoose from 'mongoose';
import supertest from 'supertest';
import OrderModel from '../src/models/mongodb/order.js';
import UserModel from '../src/models/mongodb/User.js';
import { app, server } from '../src/app.js';
import { initialOrders, initialUsers } from './test_helper.js';

const api = supertest(app);

beforeEach(async () => {
    await OrderModel.deleteMany({});
    await UserModel.deleteMany({});
    for (const order of initialOrders) {
    const orderObject = new OrderModel(order);
    await orderObject.save();
    }
    for (const user of initialUsers) {
        const userObject = new UserModel(user);
        await userObject.save();
    }
})

test("orders are returned as json", async () => {
    await api
        .get("/orders")
        .expect(200)
        .expect("Content-Type", /application\/json/);
})

test("there are two orders", async () => {
    const response = await api.get("/orders");
    expect(response.body).toHaveLength(initialOrders.length);
})

test("the first order is John Smith's", async () => {
    const response = await api.get("/orders");
    const contents = response.body.map(order => order.costumerInfo.name);
    expect(contents).toContain("John Smith");
})

test("a valid order can be added", async () => {
    const user = await UserModel.findOne({username: "fede"});
    const newOrder = {
        "userId": user._id,
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
        "status": "preparing",
        "statusUpdates": [
            {
                "timestamp": "2023-10-23T11:10:00Z",
                "update": "Order has been confirmed and is currently being prepared."
            }
        ]
    }
    await api.post("/orders").send(newOrder).expect(201).expect("Content-Type", /application\/json/);
    const response = await api.get("/orders");
    const contents = response.body.map(order => order.costumerInfo.name);
    expect(response.body).toHaveLength(initialOrders.length + 1);
    expect(contents).toContain("John Smith");
})


afterAll(() => {
    mongoose.connection.close();
    server.close();
})