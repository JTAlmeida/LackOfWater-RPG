import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getItemById, getAllItems } from "@/controllers";

const itemRouter = Router();

itemRouter
  .all("/*", authenticateToken)
  .get("/", getAllItems)
  .get("/:itemId", getItemById);

export { itemRouter };