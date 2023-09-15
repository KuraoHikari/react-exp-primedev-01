import { hash, compare } from "bcrypt";

if (process.env.NODE_ENV !== "production") {
 require("dotenv").config();
}

const salt = process.env.SALT || 10;

class Bcrypt {
 static async generateHash(password: string) {
  return await hash(password, Number(salt));
 }
 static async compareHash(password: string, hash: string) {
  return await compare(password, hash);
 }
}

export default Bcrypt;
