import { Router } from "express";
// import AuthSchemaValidator from "../middlewares/validator/auth.validator";
// import AuthController from "../controller/auth.controller";
//import ExpressValidator from "../middlewares/validator/express.validator";
import BookmarkController from "../controller/bookmark.controller";
import { authMiddleware } from "../middlewares/auth/auth.middleware";

export const bookmarkRoutes = Router();

bookmarkRoutes.get("/", authMiddleware, BookmarkController.bookmarks);

bookmarkRoutes.post("/:id", authMiddleware, BookmarkController.addBookmark);

export default bookmarkRoutes;
