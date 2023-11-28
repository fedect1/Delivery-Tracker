import { Router } from "express";
import { loginController } from "../controllers/login.js";
import { jwtValidation } from "../middleware/jwt-validation.js";

export const loginRouter = Router();

// POST /login
loginRouter.post("/", loginController.login);

// GET /login/renew
loginRouter.get("/renew", jwtValidation,loginController.renew);