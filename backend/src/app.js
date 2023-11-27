import express from 'express';
import cors from 'cors';
import { usersRouter } from './routes/users.js';
import { ordersRouter } from './routes/orders.js';
import { loginRouter } from './routes/login.js';
import { connectToMongoDB } from './database-connection.js';
import { notFound } from './middleware/notFound.js';
import {errorHandler} from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

connectToMongoDB();

app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/orders", ordersRouter);

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT ?? 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is running on port http://localhost:" + PORT + "/");
});


export { app, server}