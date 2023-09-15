import { body } from "express-validator";
class AuthSchemaValidator {
 static registerUser() {
  return [
   body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .isString()
    .withMessage("name should be string"),
   body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
   body("email").optional().isEmail().withMessage("Provide valid email"),
  ];
 }

 static loginUser() {
  return [
   body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
   body("email").optional().isEmail().withMessage("Provide valid email"),
  ];
 }
}

export default AuthSchemaValidator;
