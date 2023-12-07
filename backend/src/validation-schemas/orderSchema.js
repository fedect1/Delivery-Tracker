import zod from 'zod';

// VALIDATION SCHEMAS FOR POST /orders


const orderSchema = zod.object({
    costumerInfo: zod.object({
        name: zod.string(),
        address: zod.string(),
        phone: zod.string(),
        email: zod.string().email(),
    }),

});

const validateOrder = (order) => {
  return orderSchema.safeParse(order);
}



// VALIDATION SCHEMAS FOR PATCH /orders/:trackerNumber/status
const statusSchema = zod.object({
    status: zod.enum(['received', 'preparing', 'out for delivery', 'delivered']),
});


const validateStatusUpdate = (statusUpdate) => {
    return statusSchema.safeParse(statusUpdate);
}

//VALIDATION SCHEMAS FOR PATCH /orders/:trackerNumber/order-details

const validateOrderDetails = (orderDetails) => {
    const validationResult = itemSchema.safeParse(orderDetails);
    if (!validationResult.success) {
        console.log(validationResult.error);
    }
    return validationResult.data;
}

export { validateOrder, validateStatusUpdate, validateOrderDetails };