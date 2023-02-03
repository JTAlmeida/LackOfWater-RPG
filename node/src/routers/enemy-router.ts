import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllEnemies } from "@/controllers";

const enemyRouter = Router();

enemyRouter
  .all("/*", authenticateToken)
  .get("/", getAllEnemies);

export { enemyRouter };
