import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  createCharacter,
  getAliveCharacter,
  updateCharacter,
  upsertCharacterItem,
} from "@/controllers";

const characterRouter = Router();

characterRouter
  .all("/*", authenticateToken)
  .get("/", getAliveCharacter)
  .post("/", createCharacter)
  .put("/:characterId", updateCharacter)
  .put("/:characterId/:itemId", upsertCharacterItem);

export { characterRouter };
