import { NextFunction, Request, Response } from "express";
import { ErrorException } from "../middlewares/error/exception.error";
import { ErrorCode } from "../middlewares/error/code.error";
import { db } from "../db";
import { bookmarks } from "../db/schema";
import { SuccessCode, sendResponse } from "../libs/res";
import { eq } from "drizzle-orm";

type bookmarkPayload = {
  malId: number;
  malUrl: string;
  imageUrl: string;
  season: string;
  title: string;
  desc: string;
  aired: string;
  userId: number;
};

class BookmarkController {
  static async bookmarks(req: Request, res: Response, next: NextFunction) {
    const { tokenData } = req.body;
    try {
      const bookmarks = await db.query.bookmarks.findMany({
        where: (bookmarks, { eq }) => eq(bookmarks.userId, +tokenData.id),
      });

      return sendResponse(res, SuccessCode.OK, bookmarks);
    } catch (error) {
      next(new ErrorException(ErrorCode.UnknownError, error));
    }
  }
  static async createBookmark(payload: bookmarkPayload) {
    try {
      await db.insert(bookmarks).values([payload]);

      return true;
    } catch (error) {
      throw error;
    }
  }
  static async deleteBookmark(id: number) {
    try {
      await db.delete(bookmarks).where(eq(bookmarks.id, id));
      return true;
    } catch (error) {
      throw error;
    }
  }
  static async addBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const { imageUrl, malUrl, title, desc, aired, season, tokenData } =
        req.body;

      const bookmark = await db.query.bookmarks.findFirst({
        where: (bookmarks, { eq }) => eq(bookmarks.malId, id),
      });

      const payload: bookmarkPayload = {
        malId: id,
        imageUrl,
        malUrl,
        title,
        desc,
        aired,
        season,
        userId: +tokenData.id,
      };

      if (!bookmark) {
        await BookmarkController.createBookmark(payload);
        return sendResponse(res, SuccessCode.OK);
      } else {
        await BookmarkController.deleteBookmark(bookmark.id);
        return sendResponse(res, SuccessCode.OK);
      }
    } catch (error) {
      next(new ErrorException(ErrorCode.UnknownError, error));
    }
  }
}

export default BookmarkController;
