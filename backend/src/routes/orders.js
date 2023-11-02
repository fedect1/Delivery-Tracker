import {Router} from 'express';
import { orderController } from '../controllers/orders.js';


export const ordersRouter = Router();



// GET /orders
// GET /orders/:id
// POST /orders
ordersRouter.post("/", orderController.create);
// PUT /orders/:id
ordersRouter.put("/:trackerNumber", orderController.update);
// PATCH /orders/:id/status
ordersRouter.patch("/:trackerNumber/status", orderController.updateStatus);
// PATCH /orders/:id/details
// DELETE /orders/:id