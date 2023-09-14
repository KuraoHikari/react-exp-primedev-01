import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "./code.error";
import { ErrorException } from "./exception.error";
import { ErrorModel } from "./model.error";

export const errorHandler = (
 err: Error,
 req: Request,
 res: Response,
 next: NextFunction
) => {
 //  console.log("Error handling middleware called.");
 //  console.log("Path:", req.path);
 //  console.error("Error occured:", err);
 if (err instanceof ErrorException) {
  return res.status(err.status).send(err);
 } else {
  // For unhandled errors.
  return res.status(500).send({
   code: ErrorCode.UnknownError,
   status: 500,
  } as ErrorModel);
 }
};
