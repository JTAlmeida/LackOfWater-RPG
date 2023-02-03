import { CharacterItem } from "@prisma/client";
import { prisma } from "@/config";

export async function createCharacterItem(itemId: number, characterId: number): Promise<CharacterItem> {
  return prisma.characterItem.create({
    data: {
      characterId,
      itemId,
      quantity: 1,
    },
  });
}
