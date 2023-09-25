import { Router } from "express";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import AnimeWall from "../controller/animeImage.controller";

export const animeWallRoutes = Router();

animeWallRoutes.get("/", authMiddleware, AnimeWall.getAnimeWallpaper);

export default animeWallRoutes;
