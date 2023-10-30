import express from 'express';
import cors from 'cors';
import { ordersRouter } from './routes/orders.js';
import { connectToMongoDB } from './database-connection.js';


const app = express();
connectToMongoDB();
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

app.use("/orders", ordersRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT + "/");
});
