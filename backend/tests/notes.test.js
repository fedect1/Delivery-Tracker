import mongoose from 'mongoose';
import supertest from 'supertest';
import { app, server } from '../src/app.js';

const api = supertest(app);

test("orders are returned as json", async () => {
    await api
        .get("/orders")
        .expect(200)
        .expect("Content-Type", /application\/json/);
})

afterAll(() => {
    mongoose.connection.close();
    server.close();
})