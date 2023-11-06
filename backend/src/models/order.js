import crypto from 'crypto';
//Read a json file ESModule
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const orders = require('../orders.json');

export class orderModel{
    static async getAll({status}){
        if (status) {
            return orders.filter((order) => order.status.toLocaleLowerCase() === status.toLocaleLowerCase());
        }
        return orders
    }

    static async getById({id}){
        return orders.find((order) => order.id === id);
    }

    static async create({input}){
        const id = crypto.randomBytes(16).toString("hex");
        const newOrder = { ...input, id};
        orders.push(newOrder);
        return newOrder;
    }

    static async update({id, input}){
        const orderIndex = orders.findIndex((order) => order.id === id);
        if (orderIndex === -1) {
            return null;
        }
        const existingOrder = orders[orderIndex];
        const updatedOrder = { ...existingOrder, ...input };
        orders[orderIndex] = updatedOrder;
        return updatedOrder;
    }

}