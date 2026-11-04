import { Router } from "express";
import * as planets from "../controllers/planets.js";

const router = Router();

router.get("/", planets.getPlanets);
router.get("/:slug", planets.findBySlug);

export default router;
