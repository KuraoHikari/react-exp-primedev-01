import { AnimeWallpaper, AnimeSource } from "anime-wallpaper";
import { NextFunction, Request, Response } from "express";
import { SuccessCode, sendResponse } from "../libs/res";
import { ErrorException } from "../middlewares/error/exception.error";
import { ErrorCode } from "../middlewares/error/code.error";

class AnimeWall {
  static async getAnimeWallpaper(req: Request, res: Response, next: NextFunction) {
    try {
      const title = req.query.title;

      const excludePattern =
        /\b(II|01|02|03|04|05|III|IV|V|VI|[0-9]|Movie|movie|second|season|third|ova|ona|%|\$|#|@|!|\*|&|\^|\(|\)|_|-|\+|~|`)\b/gi;

      if (typeof title === "string") {
        const resultText = title.replace(excludePattern, "");

        // @ts-ignore
        const data = await AnimeWall.getAnimeFromWallpapers(resultText);
        return sendResponse(res, SuccessCode.OK, data);
      } else {
        throw new ErrorException(ErrorCode.UnknownError);
      }
    } catch (err) {
      console.log("🚀 ~ file: animeImage.controller.ts:25 ~ AnimeWall ~ getAnimeWallpaper ~ err:", err);
      if (err instanceof ErrorException) {
        return sendResponse(res, ErrorCode.UnknownError, {
          error: err.message,
        });
      } else {
        return sendResponse(res, ErrorCode.UnknownError, {
          error: "An unknown error occurred",
        });
      }
    }
  }
  static async getAnimeFromWallpapers(resultText: string): Promise<any> {
    const aniwallpaper = new AnimeWallpaper();

    try {
      // Try to fetch data from AnimeSource.Wallpapers
      // @ts-ignore
      return await aniwallpaper.search({ title: resultText }, AnimeSource.Wallpapers);
    } catch (err) {
      console.error("Error in getAnimeFromWallpapers:", err);
    }

    // If the first attempt fails, try AnimeSource.WallHaven
    try {
      // @ts-ignore
      return await aniwallpaper.search({ title: resultText }, AnimeSource.WallHaven);
    } catch (err) {
      console.error("Error in getAnimeFromWallpapers (second attempt):", err);
    }

    // If both attempts fail, return an empty array
    return [];
  }
}

export default AnimeWall;
