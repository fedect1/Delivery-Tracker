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
            const validatedOrder = validateOrder(req.body)
            if (!validatedOrder.success) {
                const errorTitle = validatedOrder.error.issues[0].path[0];
                const errorMessages = validatedOrder.error.issues.map((issue) => issue.message );
                const combinedErrorMessage = `Validation failed: ${(errorTitle).charAt(0).toUpperCase() + (errorTitle).slice(1)} is ${errorMessages.join(', ').toLowerCase()}`;
                const error = new Error(combinedErrorMessage);
                error.type = 'ZodError';
                throw error;
            }
            const userId = req.userId;
            const order = await OrderModel.createOrder({input: validatedOrder.data, userId});
            const response = {
                id: order._id,
                trackerNumber: order.trackerNumber,
                costumerInfo: order.costumerInfo,
                status: order.status,
                statusUpdates: order.statusUpdates,
                createdAt: order.statusUpdates[0]?.timestamp,
            }
            
            res.status(201).json(response);
        } catch (err) {
            next(err)
        }
    }

    static async updateStatus(req, res, next){
        try{
            const { orderId } = req.params;
            const validatedInput = validateStatusUpdate(req.body);
            const userId = req.userId;
            const order = await OrderModel.updateStatus({orderId, input: validatedInput, userId});
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

    static async deleteOrder(req, res, next){
        try{
            const { id } = req.params;
            const userId = req.userId;
            const order = await OrderModel.deleteOrder({id, userId});
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(204).send();
        } catch (err) {
            next(err)
        }
    }

}