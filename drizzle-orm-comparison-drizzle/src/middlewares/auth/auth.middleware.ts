import { Request, Response, NextFunction } from "express";
import { ErrorException } from "../error/exception.error";
import { ErrorCode } from "../error/code.error";
import Jwt from "../../libs/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
 const auth = req.headers.authorization;
 if (auth && auth.startsWith("Bearer")) {
  const token = auth.slice(7);

  try {
   const tokenData = Jwt.verifyToken(token);
   req.body.tokenData = tokenData;
   next();
  } catch (error) {
   throw new ErrorException(ErrorCode.Unauthenticated);
  }
 } else {
  throw new ErrorException(ErrorCode.Unauthenticated);
 }
};
