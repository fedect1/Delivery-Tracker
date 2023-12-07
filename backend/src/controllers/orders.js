import OrderModel from '../models/mongodb/order.js';
import { validateOrder, validateStatusUpdate, validateOrderDetails } from '../validation-schemas/orderSchema.js';
export class orderController{
    static async findAll(req, res, next){
        try{
            const userId = req.userId;
            const orders = await OrderModel.findAll(userId);
            const response = orders.map(order => {
                return {
                    _id: order._id,
                    trackerNumber: order.trackerNumber,
                    costumerInfo: order.costumerInfo,
                    status: order.status,
                    statusUpdates: order.statusUpdates,
                    createdAt: order.statusUpdates[0]?.timestamp,
                }
            })
            res.status(200).json(response);
        } catch (err) {
            next(err)
        }
    }
    static async create(req, res, next){
        try{
            const validatedOrder = validateOrder(req.body)
            if (!validatedOrder.success) {
                const errorPath = validatedOrder.error.issues[0].path;
                const errorField = errorPath.length > 1 ? errorPath[1] : errorPath[0];
                const errorMessages = validatedOrder.error.issues.map(issue => issue.message);
                const combinedErrorMessage = `Validation failed: ${errorField.charAt(0).toUpperCase() + errorField.slice(1)} is ${errorMessages.join(', ').toLowerCase()}`;
                const error = new Error(combinedErrorMessage);
                error.type = 'ZodError';
                throw error;
            }
            const userId = req.userId;
            const order = await OrderModel.createOrder({input: validatedOrder.data, userId});
            const response = {
                _id: order._id,
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
            if (!validatedInput.success) {
                const errorPath = validatedInput.error.issues[0].path;
                const errorField = errorPath.length > 1 ? errorPath[1] : errorPath[0];
                const errorMessages = validatedInput.error.issues.map(issue => issue.message);
                const combinedErrorMessage = `Validation failed: ${errorField.charAt(0).toUpperCase() + errorField.slice(1)} is ${errorMessages.join(', ').toLowerCase()}`;
                const error = new Error(combinedErrorMessage);
                error.type = 'ZodError';
                throw error;
            }
            const userId = req.userId;
            const order = await OrderModel.updateStatus({orderId, input: validatedInput.data, userId});
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            const response = {
                _id: order._id,
                status: order.status,
                statusUpdates: order.statusUpdates,
            }
            res.status(200).json(response);
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

            const response = {
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