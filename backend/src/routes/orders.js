import { Router } from 'express';
import { orderController } from '../controllers/orders.js';
import { jwtValidation } from '../middleware/jwt-validation.js';


export const ordersRouter = Router();

// GET /track/:trackerNumber
ordersRouter.get("/track/:trackerNumber", orderController.findOrderByTrackerNumber);

ordersRouter.use(jwtValidation);

// GET /orders from user
ordersRouter.get("/", orderController.findAll);

// POST /orders
ordersRouter.post("/", orderController.create);

// PUT /orders/:id
ordersRouter.put("/:trackerNumber", orderController.update);

// PATCH /orders/:id/status
ordersRouter.patch("/:trackerNumber/status", orderController.updateStatus);
// PATCH /orders/:id/order-details/items (ADD ITEM)

ordersRouter.patch("/:trackerNumber/order-details/items", orderController.addOrderDetailItem);
// DELETE /orders/:id/order-details/items/:itemId

// DELETE /orders/:id