import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorException } from "../middlewares/error/exception.error";
import { ErrorCode } from "../middlewares/error/code.error";

class AuthController {
 static async register(
  req: Request,
  res: Response,
  next: NextFunction
 ) {
  try {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
    return next(
     new ErrorException(ErrorCode.ValidationError, {
      errors: errors.array(),
     })
    );
   }
  } catch (error) {}
 }
}

export default AuthController;
