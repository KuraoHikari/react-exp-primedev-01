import { Router } from "express";
import BookmarkController from "../controller/bookmark.controller";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import ExpressValidator from "../middlewares/validator/express.validator";
import BookmarkSchemaValidator from "../middlewares/validator/bookmark.validator";

export const bookmarkRoutes = Router();

bookmarkRoutes.get("/", authMiddleware, BookmarkController.bookmarks);

bookmarkRoutes.post(
 "/:id",
 authMiddleware,
 ExpressValidator.validate(BookmarkSchemaValidator.addBookmark()),
 BookmarkController.addBookmark
);

export default bookmarkRoutes;
