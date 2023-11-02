import zod from 'zod';

// VALIDATION SCHEMAS FOR POST /orders
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

// VALIDATION SCHEMAS FOR PUT /orders/:trackerNumber
const orderUpdateSchema = zod.object({
    costumerInfo: zod.object({
        name: zod.string().optional(),
        address: zod.string().optional(),
        phone: zod.string().optional(),
        email: zod.string().email().optional(),
    }).optional(),
    orderDetails: zod.object({
        items: zod.array(itemSchema).optional(),
        totalPrice: zod.number().positive().optional(),
    }).optional(),
    status: zod.enum(['received', 'preparing', 'out for delivery', 'delivered']).optional(),
    statusUpdates: zod.array(statusUpdateSchema).optional(),
});

const validateOrderUpdate = (order) => {
    if (order.statusUpdates){
        order.statusUpdates = order.statusUpdates.map(update => ({
            ...update,
            timestamp: new Date(update.timestamp),
        }));
    }

    const validationResult = orderUpdateSchema.safeParse(order);
    if (!validationResult.success) {
        console.log(validationResult.error);
    }
    return validationResult.data;
}

// VALIDATION SCHEMAS FOR PATCH /orders/:trackerNumber/status
const statusSchema = zod.object({
    status: zod.enum(['received', 'preparing', 'out for delivery', 'delivered']),
});


const validateStatusUpdate = (statusUpdate) => {
    const validationResult = statusSchema.safeParse(statusUpdate);
    if (!validationResult.success) {
        console.log(validationResult.error);
    }
    return validationResult.data;
}


export { validateOrder, validateOrderUpdate, validateStatusUpdate };