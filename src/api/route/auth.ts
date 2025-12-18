import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { authMiddleware } from "../middleware/auth/auth.middleware";

const authRoutes = Router();
const authService = new AuthService()
const authController = new AuthController(authService);

authRoutes.post("/login", (req, res, next) =>
  authController.login(req, res, next)
);

authRoutes.get("/protected", authMiddleware, (req, res, next) =>
  authController.protected(req, res, next)
);

export default authRoutes;
