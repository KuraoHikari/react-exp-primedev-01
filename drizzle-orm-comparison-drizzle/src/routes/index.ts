import { Router } from "express";
import authRoutes from "./auth.route";
import bookmarkRoutes from "./bookmark.route";
import AnimeWall from "../controller/animeImage.controller";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/bookmark", bookmarkRoutes);
router.use("/animewall", AnimeWall.getAnimeWallpaper);

export default router;
