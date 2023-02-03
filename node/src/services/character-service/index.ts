import { notFoundError } from "@/errors";
import characterRepository from "@/repositories/character-repository";
import itemRepository from "@/repositories/item-repository";
import { Character } from "@prisma/client";
import { cannotCreateCharacter, cannotFindItem, cannotUpdateCharacter } from "./errors";

async function getAliveCharacter(userId: number) {
  const aliveChar = await characterRepository.findAliveCharacterByUserId(userId);

  if (!aliveChar) {
    throw notFoundError();
  }

  return aliveChar;
}

async function createCharacter(userId: number, name: string) {
  const checkAliveCharacter = await characterRepository.findAliveCharacterByUserId(userId);

  if (checkAliveCharacter) {
    throw cannotCreateCharacter();
  }

  const characterData = {
    userId,
    name,
  };

  await characterRepository.createCharacter(characterData);

  const newChar = await characterRepository.findAliveCharacterByUserId(userId);

  return newChar;
}

async function updateCharacter(userId: number, characterId: number, charInfo: UpdateCharacterParams) {
  const checkAliveCharacter = await characterRepository.findAliveCharacterByUserId(userId);

  if (!checkAliveCharacter) {
    throw cannotUpdateCharacter();
  }

  const updatedChar = await characterRepository.updateCharacter(characterId, charInfo);

  return updatedChar;
}

async function upsertCharacterItem(userId: number, characterId: number, itemId: number, quantity: number) {
  const checkAliveCharacter = await characterRepository.findAliveCharacterByUserId(userId);

  if (!checkAliveCharacter) {
    throw cannotUpdateCharacter();
  }

  const checkItem = await itemRepository.findItemById(itemId);

  if(!checkItem){
    throw cannotFindItem();
  }

  const characterItem = await characterRepository.findCharacterItemByItemId(characterId, itemId);

  const updatedCharItem = await characterRepository.upsertCharacterItem(characterId, itemId, quantity, characterItem?.id || 0);

  return updatedCharItem;
}

export type UpdateCharacterParams = Omit<Character, "id" | "userId" | "name" | "createdAt" | "updatedAt">;

const characterService = {
  getAliveCharacter,
  createCharacter,
  updateCharacter,
  upsertCharacterItem,
};

export default characterService;
