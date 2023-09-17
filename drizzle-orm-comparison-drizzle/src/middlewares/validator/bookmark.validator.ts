import { body } from "express-validator";
class BookmarkSchemaValidator {
  static addBookmark() {
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
}

export default BookmarkSchemaValidator;
