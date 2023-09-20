import { Router } from "express";
import authRoutes from "./auth.route";
import bookmarkRoutes from "./bookmark.route";
import AnimeWall from "../controller/animeImage.controller";
import animeWallRoutes from "./animeWallRoutes";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/bookmark", bookmarkRoutes);
router.use("/animewall", animeWallRoutes);

export default router;
