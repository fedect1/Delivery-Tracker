import OrderModel from '../models/mongodb/order.js';
import { validateOrder, validateOrderUpdate, validateStatusUpdate, validateOrderDetails } from '../validation-schemas/orderSchema.js';
export class orderController{
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
        const { trackerNumber } = req.params;
        const validatedInput = validateOrderUpdate(req.body);
        const order = await OrderModel.update({trackerNumber, input: validatedInput});
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
    static async updateStatus(req, res){
        const { trackerNumber } = req.params;
        const validatedInput = validateStatusUpdate(req.body);
        const order = await OrderModel.updateStatus({trackerNumber, input: validatedInput});
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
    static async addOrderDetailItem(req, res){
        const { trackerNumber } = req.params;
        const validatedInput = validateOrderDetails(req.body);
        const order = await OrderModel.addOrderDetailItem({trackerNumber, input: validatedInput});
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
}