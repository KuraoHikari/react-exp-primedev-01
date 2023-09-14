import { Router } from "express";
import AuthValidator from "../middlewares/validator/auth.validator";
import AuthController from "../controller/auth.controller";

export const authRoutes = Router();

authRoutes.post(
 "/register",
 AuthValidator.register(),
 AuthController.register
);

export default authRoutes;
