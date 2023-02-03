import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function signInWithGithub(params: SignInWithIdSessionParams) {
  const { email, idSession } = params;

  let user = await userRepository.findByEmail(email, { id: true, email: true, password: true });

  if (!user) {
    user = await createUser({ email, idSession });
  }

  const token = await createSession(user.id);

  return {
    user: {
      id: user.id,
      email,
    },
    token,
  };
}

async function createUser({ email, idSession }: SignInWithIdSessionParams): Promise<User> {
  const hashedPassword = await bcrypt.hash(idSession, 12);

  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, "email" | "password">;

export type SignInWithIdSessionParams = { email: string; idSession: any };

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
  signInWithGithub,
};

export default authenticationService;
export * from "./errors";
