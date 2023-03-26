import { Router } from "express";

import jobsController from "../controllers/jobs.controller";
import authMiddleware from "../middlewares/auth.middleware";

const jobsRoutes = Router();

jobsRoutes.get("/jobs", authMiddleware, jobsController.get);
jobsRoutes.get("/jobs/detail/:id", authMiddleware, jobsController.detail);

export { jobsRoutes };
