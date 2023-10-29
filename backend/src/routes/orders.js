import {Router} from 'express';
import { orderController } from '../controllers/orders.js';


export const ordersRouter = Router();

ordersRouter.get("/", orderController.getAll);

ordersRouter.get("/:id", orderController.getById);

ordersRouter.post("/", orderController.create);

ordersRouter.patch("/:id", orderController.update);

