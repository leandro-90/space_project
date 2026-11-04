import { Router } from "express";
import * as stars from "../controllers/stars.js";

const router = Router();

router.get("/", stars.getStars);
router.get("/:slug", stars.findBySlug);

export default router;
