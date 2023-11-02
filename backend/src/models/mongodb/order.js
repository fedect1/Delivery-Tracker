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
}, {_id: false});

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
    static async update({trackerNumber, input}) {
        try {
            const order = await this.findOneAndUpdate({ trackerNumber }, input, { new: true });
            return order;
        } catch (err) {
            throw err;
        } finally {
            mongoose.connection.close();
        }
    }
    static async updateStatus({trackerNumber, input}) {
        try {
            const order = await this.findOne({ trackerNumber });
            order.status = input.status;
            order.statusUpdates.push({
                timestamp: new Date(),
                update: input.status,
            });
            await order.save();
            return order;
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