import zod from 'zod';

const OrderSchema = zod.object({
    // customerInfo: zod.object({
    //   name: zod.string(),
    //   phone: zod.string(),
    //   address: zod.string(),
    //   email: zod.string().email(),
    // }),
    // orderDetails: zod.object({
    //   items: zod.array(
    //     zod.object({
    //       itemName: zod.string(),
    //       quantity: zod.number().int().positive(),
    //       pricePerUnit: zod.number().positive(),
    //     })
    //   ),
    //   totalPrice: zod.number().positive(),
    // }),
    // status: zod.string(),
    // statusUpdates: zod.array(
    //   zod.object({
    //     timestamp: zod.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/), // This is a simple regex for the date-time format. Depending on your requirements, you might want a more sophisticated validation.
    //     update: zod.string(),
    //   })
    // ),
    userId: zod.string(),
    products: zod.array(zod.object({
        productId: zod.string(),
        quantity: zod.number().int().positive(),
    })),
    total: zod.number().positive(),
    date: zod.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/),

});

export default OrderSchema;