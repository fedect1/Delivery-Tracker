import {Router} from 'express';
import OrderSchema from '../validation-schemas/orderSchema.js'
import orderModel from '../models/orderModel.js';
import zod from 'zod';
//Read a json file ESModule
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const orders = require('../orders.json');

export const ordersRouter = Router();

ordersRouter.get("/", async (req, res) => {
    const {status} = req.query;
    const orders = await orderModel.getAll({status});
    res.json(orders);
});

ordersRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const order = await orderModel.getById({id});
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
});

ordersRouter.post("/", async (req, res) => {
    try{
        const validatedOrder = OrderSchema.parse(req.body);
        const order = await orderModel.create({input: validatedOrder});
        res.status(201).json(order);
    } catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({message: error.message})
        } else {
            res.status(500).json({message: "Internal server error"})
        }   
    }
});

ordersRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { input } = req.body;
    const validatedInput = OrderSchema.parse(input);
    const order = await orderModel.update({id, input: validatedInput});
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
});
