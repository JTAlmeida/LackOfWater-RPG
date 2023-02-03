import { singInPost, singInWithGithubPost } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema, signInWithIdSessionSchema } from "@/schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter
  .post("/sign-in", validateBody(signInSchema), singInPost)
  .post("/firebase", validateBody(signInWithIdSessionSchema), singInWithGithubPost);

export { authenticationRouter };
