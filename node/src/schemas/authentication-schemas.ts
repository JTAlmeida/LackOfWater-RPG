import { SignInParams, SignInWithIdSessionParams } from "@/services/authentication-service";
import Joi from "joi";

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signInWithIdSessionSchema = Joi.object<SignInWithIdSessionParams>({
  email: Joi.string().email().required(),
  idSession: Joi.required(),
});
