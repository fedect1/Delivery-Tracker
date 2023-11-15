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

// PATCH /orders/:id/status
ordersRouter.patch("/:trackerNumber/status", orderController.updateStatus);

// DELETE /orders/:id
ordersRouter.delete("/:id", orderController.deleteOrder);