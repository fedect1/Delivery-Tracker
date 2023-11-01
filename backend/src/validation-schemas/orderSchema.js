import zod from 'zod';

const itemSchema = zod.object({
    itemName: zod.string(),
    quantity: zod.number().positive(),
    pricePerItem: zod.number().positive(),
});
const statusUpdateSchema = zod.object({
    timestamp: zod.date(),
    update: zod.string(),
});

const orderSchema = zod.object({
    trackerNumber: zod.string(),
    costumerInfo: zod.object({
        name: zod.string(),
        address: zod.string(),
        phone: zod.string(),
        email: zod.string().email(),
    }),
    orderDetails: zod.object({
        items: zod.array(itemSchema),
        totalPrice: zod.number().positive(),
    }),
    status: zod.enum(['received', 'preparing', 'out for delivery', 'delivered']),
    statusUpdates: zod.array(statusUpdateSchema),
});

const validateOrder = (order) => {
    order.statusUpdates = order.statusUpdates.map(update => ({
        ...update,
        timestamp: new Date(update.timestamp),
    }));

    const validationResult = orderSchema.safeParse(order);
    console.log("Se valido el pedido");
    if (!validationResult.success) {
        console.log(validationResult.error);
    }
    return validationResult.data;
}

export default validateOrder;