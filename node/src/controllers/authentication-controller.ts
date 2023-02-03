import authenticationService, { SignInParams, SignInWithIdSessionParams } from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function singInWithGithubPost(req: Request, res: Response) {
  const { email, idSession } = req.body as SignInWithIdSessionParams;

  try {
    const result = await authenticationService.signInWithGithub({ email, idSession });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
