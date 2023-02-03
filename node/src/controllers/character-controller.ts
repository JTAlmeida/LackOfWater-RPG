import { AuthenticatedRequest } from "@/middlewares";
import characterService from "@/services/character-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAliveCharacter(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const character = await characterService.getAliveCharacter(userId);

    return res.status(httpStatus.OK).send(character);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function createCharacter(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const character = await characterService.createCharacter(Number(userId), name);

    return res.status(httpStatus.CREATED).send(character);
  } catch (error) {
    if (error.name === "CannotCreateCharacter") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateCharacter(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { characterId } = req.params;
  const charInfo = req.body;

  try {
    const character = await characterService.updateCharacter(Number(userId), Number(characterId), charInfo);

    return res.status(httpStatus.OK).send(character);
  } catch (error) {
    if (error.name === "CannotUpdateCharacter") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function upsertCharacterItem(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const characterId = req.params.characterId;
  const itemId = req.params.itemId;
  const { quantity } = req.body;

  try {
    const charItems = await characterService.upsertCharacterItem(
      Number(userId),
      Number(characterId),
      Number(itemId),
      Number(quantity),
    );

    return res.status(httpStatus.OK).send(charItems);
  } catch (error) {
    if (error.name === "CannotUpdateCharacter" || error.name === "CannotFindItem") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
