import { NextFunction, Request, Response } from "express";
import { ErrorException } from "../middlewares/error/exception.error";
import { ErrorCode } from "../middlewares/error/code.error";
import { db } from "../db";
import { users as userSchema } from "../db/schema";
import { SuccessCode, sendResponse } from "../libs/res";
import Bcrypt from "../libs/bcrypt";
import Jwt from "../libs/jwt";

class AuthController {
 static async registerUser(req: Request, res: Response, next: NextFunction) {
  try {
   const { name, email, password } = req.body;

   const hashPassword = await Bcrypt.generateHash(password);
   const user = await db
    .insert(userSchema)
    .values([{ name, email, password: hashPassword }])
    .returning();

   const access_token = Jwt.jwtSign({
    email: user[0].email,
    id: user[0].id,
   });

   return sendResponse(res, SuccessCode.OK, {
    access_token,
   });
  } catch (error: any) {
   if (error.code === "23505") {
    next(new ErrorException(ErrorCode.Unauthenticated, {}));
   }
   next(new ErrorException(ErrorCode.UnknownError, error));
  }
 }
 static async loginUser(req: Request, res: Response, next: NextFunction) {
  try {
   const { email, password } = req.body;

   const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
   });
   if (!user) {
    next(
     new ErrorException(ErrorCode.Unauthenticated, [
      {
       type: "field",
       msg: "invalid email/password",
       path: "email/password",
       location: "body",
      },
     ])
    );
   } else {
    const compareHash = await Bcrypt.compareHash(password, user.password);

    if (!compareHash) {
     next(
      new ErrorException(ErrorCode.Unauthenticated, [
       {
        type: "field",
        msg: "invalid email/password",
        path: "email/password",
        location: "body",
       },
      ])
     );
    } else {
     const access_token = Jwt.jwtSign({ email: user.email, id: user.id });

     return sendResponse(res, SuccessCode.OK, {
      access_token,
     });
    }
   }
  } catch (error) {
   next(new ErrorException(ErrorCode.UnknownError));
  }
 }
}

export default AuthController;
