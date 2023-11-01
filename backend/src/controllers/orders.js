import OrderModel from '../models/mongodb/order.js';
import zod from 'zod';
import validateOrder from '../validation-schemas/orderSchema.js';
export class orderController{
    static async getAll(req, res){
        const {status} = req.query;
        const orders = await OrderModel.getAll({status});
        res.json(orders);
    }

    static async getById(req, res){
        const { id } = req.params;
        const order = await OrderModel.getById({id});
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    }

    static async create(req, res){
        try{
            const validatedOrder = validateOrder(req.body);
            const order = await OrderModel.createOrder({input: validatedOrder});
            res.status(201).json(order);
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
              throw new Error('Validación fallida: ' + err.message);
            } else {
              throw err;
            }
        }
    }

    static async update(req, res){
        const { id } = req.params;
        const { input } = req.body;
        const validatedInput = OrderSchema.parse(input);
        const order = await OrderModel.update({id, input: validatedInput});
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    }
}