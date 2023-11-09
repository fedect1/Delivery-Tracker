import { Router } from 'express';
import { usersController } from '../controllers/users.js';

export const usersRouter = Router();

usersRouter.get("/", usersController.read);

usersRouter.post("/", usersController.create);
