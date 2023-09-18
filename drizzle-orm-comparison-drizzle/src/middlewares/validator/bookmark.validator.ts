import { body } from "express-validator";
class BookmarkSchemaValidator {
 static addBookmark() {
  return [
   body("imageUrl").exists().withMessage("imageUrl is required").isString().withMessage("imageUrl should be string"),
   body("malUrl").exists().withMessage("malUrl is required").isString().withMessage("malUrl should be string"),
   body("title").exists().withMessage("title is required").isString().withMessage("title should be string"),
   body("desc").exists().withMessage("desc is required").isString().withMessage("desc should be string"),
   body("aired").exists().withMessage("aired is required").isString().withMessage("aired should be string"),
   body("season").exists().withMessage("season is required").isString().withMessage("season should be string"),
  ];
 }
}

export default BookmarkSchemaValidator;
