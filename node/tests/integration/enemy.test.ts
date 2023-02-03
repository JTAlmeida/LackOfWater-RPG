import app, { init } from "@/app";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createEnemy, createEnemyItem, createItem, createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /enemy", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/enemy");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/enemy").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/enemy").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and an empty array if there are no enemies", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/enemy").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it("should respond with status 200 and all enemies", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const item1 = await createItem();
      const item2 = await createItem();
      const enemy1 = await createEnemy();
      const enemy2 = await createEnemy();
      const enemy1item1 = await createEnemyItem(item1.id, enemy1.id);
      const enemy1item2 = await createEnemyItem(item2.id, enemy1.id);
      const enemy2item1 = await createEnemyItem(item1.id, enemy2.id);
      const enemy2item2 = await createEnemyItem(item2.id, enemy2.id);

      const response = await server.get("/enemy").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: enemy1.id,
          name: enemy1.name,
          atk: enemy1.atk,
          def: enemy1.def,
          hp: enemy1.hp,
          exp: enemy1.exp,
          imgUrl: enemy1.imgUrl,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          EnemyItems: [
            {
              id: enemy1item1.id,
              enemyId: enemy1.id,
              itemId: item1.id,
              dropChance: enemy1item1.dropChance,
              Item: { name: item1.name, description: item1.description },
            },
            {
              id: enemy1item2.id,
              enemyId: enemy1.id,
              itemId: item2.id,
              dropChance: enemy1item2.dropChance,
              Item: { name: item2.name, description: item2.description },
            },
          ],
        },
        {
          id: enemy2.id,
          name: enemy2.name,
          atk: enemy2.atk,
          def: enemy2.def,
          hp: enemy2.hp,
          exp: enemy2.exp,
          imgUrl: enemy2.imgUrl,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          EnemyItems: [
            {
              id: enemy2item1.id,
              enemyId: enemy2.id,
              itemId: item1.id,
              dropChance: enemy2item1.dropChance,
              Item: { name: item1.name, description: item1.description },
            },
            {
              id: enemy2item2.id,
              enemyId: enemy2.id,
              itemId: item2.id,
              dropChance: enemy2item2.dropChance,
              Item: { name: item2.name, description: item2.description },
            },
          ],
        },
      ]);
    });
  });
});
