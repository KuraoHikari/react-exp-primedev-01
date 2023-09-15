import { Router } from "express";
import AuthSchemaValidator from "../middlewares/validator/auth.validator";
import AuthController from "../controller/auth.controller";
import ExpressValidator from "../middlewares/validator/express.validator";

export const authRoutes = Router();

authRoutes.post(
 "/register",
 ExpressValidator.validate(AuthSchemaValidator.registerUser()),
 AuthController.registerUser
);

authRoutes.post("/login", ExpressValidator.validate(AuthSchemaValidator.loginUser()), AuthController.loginUser);

export default authRoutes;
