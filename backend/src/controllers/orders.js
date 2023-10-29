import  {orderModel}  from "../models/order.js";
import zod from 'zod';
import OrderSchema from '../validation-schemas/orderSchema.js'
export class orderController{
    static async getAll(req, res){
        const {status} = req.query;
        const orders = await orderModel.getAll({status});
        res.json(orders);
    }

    static async getById(req, res){
        const { id } = req.params;
        const order = await orderModel.getById({id});
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    }

    static async create(req, res){
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
    }

    static async update(req, res){
        const { id } = req.params;
        const { input } = req.body;
        const validatedInput = OrderSchema.parse(input);
        const order = await orderModel.update({id, input: validatedInput});
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    }
}