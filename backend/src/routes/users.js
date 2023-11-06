import { Router } from 'express';
import { usersController } from '../controllers/users.js';

export const usersRouter = Router();

usersRouter.post("/", usersController.create);
