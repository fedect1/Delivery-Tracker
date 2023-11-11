import { Router } from "express";
import { loginController } from "../controllers/login.js";

export const loginRouter = Router();

// POST /login
loginRouter.post("/", loginController.login);