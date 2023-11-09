import express from 'express';
import cors from 'cors';
import { usersRouter } from './routes/users.js';
import { ordersRouter } from './routes/orders.js';
import { connectToMongoDB } from './database-connection.js';
import { notFound } from './middleware/notFound.js';
import {errorHandler} from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

connectToMongoDB();

app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT + "/");
});

