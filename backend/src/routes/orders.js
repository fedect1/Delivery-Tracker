import {Router} from 'express';
import { orderController } from '../controllers/orders.js';


export const ordersRouter = Router();

ordersRouter.get("/", orderController.getAll);

ordersRouter.get("/:id", orderController.getById);

ordersRouter.post("/", orderController.create);

ordersRouter.patch("/:id", orderController.update);


// GET /orders
// GET /orders/:id
// POST /orders
// PUT /orders/:id
// PATCH /orders/:id/status
// PATCH /orders/:id/details
// DELETE /orders/:id