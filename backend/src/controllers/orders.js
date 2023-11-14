import OrderModel from '../models/mongodb/order.js';
import { validateOrder, validateOrderUpdate, validateStatusUpdate, validateOrderDetails } from '../validation-schemas/orderSchema.js';
export class orderController{
    static async findAll(req, res, next){
        try{
            const userId = req.userId;
            const orders = await OrderModel.findAll(userId);
            res.status(200).json(orders);
        } catch (err) {
            next(err)
        }
    }
    static async create(req, res, next){
        try{
            const validatedOrder = validateOrder(req.body);
            const userId = req.userId;
            const order = await OrderModel.createOrder({input: validatedOrder, userId});
            res.status(201).json(order);
        } catch (err) {
            next(err)
        }
    }
    static async update(req, res, next){
        try{
            const { trackerNumber } = req.params;
            const validatedInput = validateOrderUpdate(req.body);
            const order = await OrderModel.update({trackerNumber, input: validatedInput});
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (err) {
            next(err)
        }
    }
    static async updateStatus(req, res, next){
        try{
            const { trackerNumber } = req.params;
            const validatedInput = validateStatusUpdate(req.body);
            const userId = req.userId;
            const order = await OrderModel.updateStatus({trackerNumber, input: validatedInput, userId});
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (err) {
            next(err)
        }
    }
    static async addOrderDetailItem(req, res){
        try{

            const { trackerNumber } = req.params;
            const validatedInput = validateOrderDetails(req.body);
            const order = await OrderModel.addOrderDetailItem({trackerNumber, input: validatedInput});
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (err) {
            next(err)
        }
    }
    static async findOrderByTrackerNumber(req, res, next){
        try{
            const { trackerNumber } = req.params;
            const order = await OrderModel.findOrderByTrackerNumber(trackerNumber);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (err) {
            next(err)
        }
    }

}