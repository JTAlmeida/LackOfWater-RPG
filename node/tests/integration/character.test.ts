import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser, createCharacter, createItem, createCharacterItem } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /character", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/character");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/character").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/character").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 if user has no alive character", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/character").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and character data if there is an alive char", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const character = await createCharacter(user.id);
      const item = await createItem();
      const characterItems = await createCharacterItem(item.id, character.id);

      const response = await server.get("/character").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: character.id,
        userId: user.id,
        currentSceneId: character.currentSceneId,
        name: character.name,
        atk: character.atk,
        def: character.def,
        hp: character.hp,
        xp: character.xp,
        lvl: character.lvl,
        isAlive: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        CharacterItems: [
          {
            id: characterItems.id,
            characterId: character.id,
            itemId: item.id,
            quantity: characterItems.quantity,
            Item: { name: item.name, description: item.description },
          },
        ],
      });
    });
  });
});

describe("POST /character", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/character");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/character").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/character").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 403 when user already has an alive character", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      await server.post("/character").set("Authorization", `Bearer ${token}`).send({ name: "test" });
      const response = await server.post("/character").set("Authorization", `Bearer ${token}`).send({ name: "test2" });

      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 201 and character data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post("/character").set("Authorization", `Bearer ${token}`).send({ name: "test" });

      expect(response.status).toEqual(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: user.id,
        currentSceneId: expect.any(Number),
        name: expect.any(String),
        atk: expect.any(Number),
        def: expect.any(Number),
        hp: expect.any(Number),
        xp: expect.any(Number),
        lvl: expect.any(Number),
        isAlive: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        CharacterItems: [],
      });
    });

    it("should insert a new character in the database", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const beforeCount = await prisma.character.count();

      await server.post("/character").set("Authorization", `Bearer ${token}`).send({ name: "test" });

      const afterCount = await prisma.character.count();

      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
    });
  });
});

describe("PUT /character", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.put("/character");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.put("/character").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.put("/character").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 if there is no character for given characterId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.put("/character/1").set("Authorization", `Bearer ${token}`).send({
        atk: 1,
        def: 1,
        hp: 1,
        xp: 1,
        lvl: 1,
        isAlive: true,
      });

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and character data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const charInfo = await createCharacter(user.id);

      const response = await server.put(`/character/${charInfo.id}`).set("Authorization", `Bearer ${token}`).send({
        atk: 1,
        def: 2,
        hp: 3,
        xp: 4,
        lvl: 5,
        isAlive: false,
      });

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: user.id,
        name: expect.any(String),
        currentSceneId: 1,
        atk: 1,
        def: 2,
        hp: 3,
        xp: 4,
        lvl: 5,
        isAlive: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});

describe("PUT /character/:characterId/:itemId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.put("/character/1/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.put("/character/1/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.put("/character/1/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 if there is no character for given characterId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.put("/character/1/1").set("Authorization", `Bearer ${token}`).send({
        quantity: 1,
      });

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 if there is no item for given itemId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const charInfo = await createCharacter(user.id);

      const response = await server.put(`/character/${charInfo.id}/1`).set("Authorization", `Bearer ${token}`).send({
        quantity: 1,
      });

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and characterItem data if there is no characterItem for given characterId and itemId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const char = await createCharacter(user.id);
      const item = await createItem();

      const response = await server
        .put(`/character/${char.id}/${item.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          quantity: 1,
        });

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        characterId: char.id,
        itemId: item.id,
        quantity: 1,
      });
    });

    it("should insert a new characterItem in the database if there is not one yet", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const char = await createCharacter(user.id);
      const item = await createItem();

      const beforeCount = await prisma.characterItem.count();

      await server.put(`/character/${char.id}/${item.id}`).set("Authorization", `Bearer ${token}`).send({
        quantity: 1,
      });

      const afterCount = await prisma.characterItem.count();

      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
    });

    it("should respond with status 200 and updated characterrItem data if there is already a characterItem for given characterId and itemId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const char = await createCharacter(user.id);
      const item = await createItem();
      await createCharacterItem(item.id, char.id);

      const response = await server
        .put(`/character/${char.id}/${item.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          quantity: 2,
        });

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        characterId: char.id,
        itemId: item.id,
        quantity: 2,
      });
    });

    it("shouldn't insert a new characterItem in the database if there is one already", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const char = await createCharacter(user.id);
      const item = await createItem();
      await createCharacterItem(item.id, char.id);

      const beforeCount = await prisma.characterItem.count();

      await server.put(`/character/${char.id}/${item.id}`).set("Authorization", `Bearer ${token}`).send({
        quantity: 2,
      });

      const afterCount = await prisma.characterItem.count();

      expect(beforeCount).toEqual(1);
      expect(afterCount).toEqual(1);
    });
  });
});
