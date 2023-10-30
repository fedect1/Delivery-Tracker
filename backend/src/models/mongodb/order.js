import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
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