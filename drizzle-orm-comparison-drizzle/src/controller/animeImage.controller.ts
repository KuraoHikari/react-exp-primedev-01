import { AnimeWallpaper, AnimeSource } from "anime-wallpaper";
import { NextFunction, Request, Response } from "express";
import { SuccessCode, sendResponse } from "../libs/res";
import { ErrorException } from "../middlewares/error/exception.error";
import { ErrorCode } from "../middlewares/error/code.error";

class AnimeWall {
 static async getAnimeWallpaper(req: Request, res: Response, next: NextFunction) {
  try {
   const title = req.query.title;
   const aniwallpaper = new AnimeWallpaper();

   const excludePattern =
    /\b(II|01|02|03|04|05|III|IV|V|VI|[0-9]|Movie|movie|second|season|third|ova|ona|%|\$|#|@|!|\*|&|\^|\(|\)|_|-|\+|~|`)\b/gi;

   if (typeof title === "string") {
    const resultText = title.replace(excludePattern, "");
    console.log("🚀 ~ file: animeImage.controller.ts:18 ~ AnimeWall ~ getAnimeWallpaper ~ resultText:", resultText);
    // @ts-ignore
    const data = await aniwallpaper.search({ title: resultText }, AnimeSource.Wallpapers);
    return sendResponse(res, SuccessCode.OK, data);
   } else {
    throw new ErrorException(ErrorCode.UnknownError);
   }
  } catch (err) {
   console.error("Error in getAnimeWallpaper:", err);
   if (err instanceof ErrorException) {
    return sendResponse(res, ErrorCode.UnknownError, { error: err.message });
   } else {
    return sendResponse(res, ErrorCode.UnknownError, { error: "An unknown error occurred" });
   }
  }
 }
}

export default AnimeWall;
