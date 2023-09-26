import jwt from "jsonwebtoken";
import { type InferSelectModel } from "drizzle-orm";
import { users } from "../db/schema";
import { ErrorException } from "../middlewares/error/exception.error";
import { ErrorCode } from "../middlewares/error/code.error";

if (process.env.NODE_ENV !== "production") {
 require("dotenv").config();
}

const jwtKey = process.env.JWT_SECRET || "keyyy";

class Jwt {
 static async jwtSign(payload: { id: number; email: string }) {
  return jwt.sign(payload, jwtKey, {
   expiresIn: "24h",
  });
 }
 static verifyToken(token: string) {
  try {
   const tokenData = jwt.verify(token, jwtKey);
   return tokenData as { _id: string; email: string };
  } catch (error) {
   throw new ErrorException(ErrorCode.Unauthenticated);
  }
 }
}

export default Jwt;
