import { Router } from "express";
import authRoutes from "./auth.route";
import bookmarkRoutes from "./bookmark.route";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/bookmark", bookmarkRoutes);

export default router;
