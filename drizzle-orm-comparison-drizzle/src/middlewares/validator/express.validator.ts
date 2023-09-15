import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { ErrorException } from "../error/exception.error";
import { ErrorCode } from "../error/code.error";

class ExpressValidator {
 static validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
   for (let validation of validations) {
    const result = await validation.run(req);
    // @ts-ignore
    if (result.errors.length) break;
   }

   const errors = validationResult(req);
   if (errors.isEmpty()) {
    return next();
   }

   return next(
    new ErrorException(ErrorCode.ValidationError, {
     errors: errors.array(),
    })
   );
  };
 };
}

export default ExpressValidator;
