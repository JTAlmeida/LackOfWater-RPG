import { prisma } from "@/config";
import { Character } from "@prisma/client";

async function findAliveCharacterByUserId(userId: number) {
  return prisma.character.findFirst({
    where: { userId, isAlive: true },
    include: {
      CharacterItems: {
        include: { Item: { select: { name: true, description: true } } },
      },
    },
  });
}

async function createCharacter(character: CreateCharacterParams) {
  return prisma.character.create({
    data: { ...character },
  });
}

async function updateCharacter(characterId: number, charInfo: UpdateCharacterParams) {
  return prisma.character.update({
    where: { id: characterId },
    data: {
      currentSceneId: charInfo.currentSceneId,
      atk: charInfo.atk,
      def: charInfo.def,
      hp: charInfo.hp,
      xp: charInfo.xp,
      lvl: charInfo.lvl,
      isAlive: charInfo.isAlive,
    },
  });
}

async function findCharacterItemByItemId(characterId: number, itemId: number) {
  return prisma.characterItem.findFirst({
    where: { characterId, itemId },
  });
}

async function upsertCharacterItem(characterId: number, itemId: number, quantity: number, characterItemId: number) {

  return prisma.characterItem.upsert({
    where: { id: characterItemId },
    create: {
      characterId,
      itemId,
      quantity: 1,
    },
    update: {
      quantity,
    },
  });
}

export type CreateCharacterParams = Omit<
  Character,
  "id" | "currentSceneId" | "atk" | "def" | "hp" | "xp" | "lvl" | "isAlive" | "createdAt" | "updatedAt"
>;

export type UpdateCharacterParams = Omit<Character, "id" | "userId" | "name" | "createdAt" | "updatedAt">;

const characterRepository = {
  findAliveCharacterByUserId,
  createCharacter,
  updateCharacter,
  findCharacterItemByItemId,
  upsertCharacterItem,
};

export default characterRepository;
