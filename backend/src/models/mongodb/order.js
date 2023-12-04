import mongoose, { get } from "mongoose";
import UserModel from './User.js';
import { v4 as uuidv4 } from 'uuid';

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    pricePerItem: {
        type: Number,
        required: true,
    }
}, {_id: false});

const statusUpdateSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    update: {
        type: String,
        required: true,
        default: 'received',
    }
}, {_id: false});

const orderSchema = new mongoose.Schema({
    trackerNumber: {
        type: String,
        required: true,
        unique: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    costumerInfo: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    orderDetails: {
        items: {
            type: [itemSchema],
            required: true,
        }
    },
    status: {
        type: String,
        enum: ['received', 'preparing', 'out for delivery', 'delivered'],
        required: true,
        default: 'received',
    },
    statusUpdates: {
        type: [statusUpdateSchema],
        required: true,
    }
});

class Order {
    static async findAll(userId) {
        try {

            const orders = await this.find({user: userId}).populate('user',
            {
                username: 1,
            });
            return orders;
        } catch (err) {
            throw err;
        } 
    }

    static async findOrderByTrackerNumber(trackerNumber) {
        try {
            const order = await this.findOne({ trackerNumber }, { _id:0, __v:0 }).populate('user',
            {
                username: 1,
                _id: 0,
            });
            return order;
        } catch (err) {
            throw err;
        }
    }
    static async createOrder({input, userId}) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            const createTrackerNumber = uuidv4();
            
            const order = new this({...input, user: userId, statusUpdates: [{update: 'received'}], trackerNumber: createTrackerNumber});
            await order.save();

            user.orders.push(order._id)
            await user.save();


            return order;
        } catch (err) {
            throw err;
        } 
    }
    static async updateStatus({orderId, input, userId}) {
        try {
            const order = await this.findById(orderId);
            if (!order) {
                throw new Error("Order not found");
            }
            if (order.user.toString() !== userId) {
                throw new Error("You are not authorized to update this order");
            }
            order.status = input.status;
            order.statusUpdates.push({
                timestamp: new Date(),
                update: input.status,
            });
            await order.save();
            return order;
        } catch (err) {
            throw err;
        } 
    }
    static async deleteOrder({id, userId}) {
        try {
            const order = await this.findById(id);
            if (order.user.toString() !== userId) {
                throw new Error("You are not authorized to delete this order");
            }
            if (!order) {
                throw new Error("Order not found");
            }
            await this.findByIdAndDelete(id);
            return { message: "Order successfully deleted" }
        } catch (err) {
            throw err;
        } 
    }

}

orderSchema.loadClass(Order);
const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;