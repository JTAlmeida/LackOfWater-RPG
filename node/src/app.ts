import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "@/config";

loadEnv();

import { handleApplicationErrors } from "@/middlewares";
import {
  usersRouter,
  authenticationRouter,
  characterRouter,
  enemyRouter,
  sceneRouter,
  itemRouter,
} from "@/routers";

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/users", usersRouter)
  .use("/auth", authenticationRouter)
  .use("/character", characterRouter)
  .use("/enemy", enemyRouter)
  .use("/scene", sceneRouter)
  .use("/item", itemRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
