import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllScenes } from "@/controllers";

const sceneRouter = Router();

sceneRouter
  .all("/*", authenticateToken)
  .get("/", getAllScenes)

export { sceneRouter };