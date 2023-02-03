import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createScene, createSceneOption, createUser } from "../factories";
import { createOption } from "../factories/option-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /scene", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/scene");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/scene").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/scene").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and an empty array if there are no scenes", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/scene").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it("should respond with status 200 and all scenes", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const scene1 = await createScene();
      const scene2 = await createScene();
      const opt1 = await createOption();
      const opt2 = await createOption();
      const scene1opt1 = await createSceneOption(scene1.id, opt1.id);
      const scene1opt2 = await createSceneOption(scene1.id, opt2.id);
      const scene2opt1 = await createSceneOption(scene2.id, opt1.id);
      const scene2opt2 = await createSceneOption(scene2.id, opt2.id);

      const response = await server.get("/scene").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: expect.any(Number),
          description: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          SceneOptions: [
            {
              id: scene1opt1.id,
              sceneId: scene1.id,
              optionId: opt1.id,
              Option: { description: opt1.description },
            },
            {
              id: scene1opt2.id,
              sceneId: scene1.id,
              optionId: opt2.id,
              Option: { description: opt2.description },
            },
          ],
        },
        {
          id: expect.any(Number),
          description: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          SceneOptions: [
            {
              id: scene2opt1.id,
              sceneId: scene2.id,
              optionId: opt1.id,
              Option: { description: opt1.description },
            },
            {
              id: scene2opt2.id,
              sceneId: scene2.id,
              optionId: opt2.id,
              Option: { description: opt2.description },
            },
          ],
        },
      ]);
    });
  });
});
