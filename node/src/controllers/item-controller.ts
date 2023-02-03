import { AuthenticatedRequest } from "@/middlewares";
import itemService from "@/services/item-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllItems(req: AuthenticatedRequest, res: Response) {
  try {
    const items = await itemService.getAllItems();

    return res.status(httpStatus.OK).send(items);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function getItemById(req: AuthenticatedRequest, res: Response) {
  const { itemId } = req.params;

  try {
    const item = await itemService.getItemById(Number(itemId));

    return res.status(httpStatus.OK).send(item);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
