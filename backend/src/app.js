import express from 'express';
import orders from './orders.json' assert { type: 'json' };


const app = express();
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




const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT + "/");
});
