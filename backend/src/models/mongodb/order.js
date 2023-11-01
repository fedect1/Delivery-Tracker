import mongoose from "mongoose";

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
});

const statusUpdateSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    update: {
        type: String,
        required: true,
    }
});

const orderSchema = new mongoose.Schema({
    trackerNumber: {
        type: String,
        required: true,
        unique: true,
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
        },
        totalPrice: {
            type: Number,
            required: true,
        }
    },
    status: {
        type: String,
        enum: ['received', 'preparing', 'out for delivery', 'delivered'],
        required: true,
    },
    statusUpdates: {
        type: [statusUpdateSchema],
        required: true,
    }
});

class Order {
    static async createOrder({input}) {
        try {
            const order = new this(input);
            await order.save();
            return order;
        } catch (err) {
            throw err;
        } finally {
            mongoose.connection.close();
        }
    }
    static async getOrdersByUserId(userId) {
        try {
            const orders = await this.find({ userId });
            return orders;
        } catch (err) {
            throw err;
        } finally {
            mongoose.connection.close();
        }
    }
    static async getAllOrders() {
        try {
            const orders = await this.find();
            return orders;
        } catch (err) {
            throw err;
        } finally {
            mongoose.connection.close();
        }
    }
}

orderSchema.loadClass(Order);
const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;