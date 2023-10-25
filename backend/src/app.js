import express from 'express';
import crypto from 'crypto';
import orders from './orders.json' assert { type: 'json' };
import OrderSchema from './validation-schemas/orderSchema.js'

const app = express();
app.use(express.json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.get("/orders", (req, res) => {
    const {status} = req.query;
    console.log(status)
    if (status) {
        const filteredOrdersByStatus = orders.filter((order) => order.status.toLocaleLowerCase() === status.toLocaleLowerCase());
        res.json(filteredOrdersByStatus);
    }
});

app.get("/orders/:id", (req, res) => {
    const { id } = req.params;
    const order = orders.find((order) => order.id === id);
    if (!order) {
        res.status(404).json({ message: "Order not found" });
    } else {
        res.json(order);
    }
});

app.post("/orders", (req, res) => {
    try{
    const validatedOrder = OrderSchema.parse(req.body);
    const id = crypto.randomBytes(16).toString("hex");
    const order = { ...validatedOrder, id};
    console.log(validatedOrder)
    orders.push(order);
    res.status(201).json(order);
    } catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({message: error.message})
        } else {
            res.status(500).json({message: "Internal server error"})
        }   
    }
})



const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT + "/");
});
