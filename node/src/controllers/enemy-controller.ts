import { AuthenticatedRequest } from "@/middlewares";
import enemyService from "@/services/enemy-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllEnemies(req: AuthenticatedRequest, res: Response) {
  try {
    const enemies = await enemyService.getAllEnemies();

    return res.status(httpStatus.OK).send(enemies);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
