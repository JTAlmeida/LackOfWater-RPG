import { Character } from "@prisma/client";
import { prisma } from "@/config";

export async function createCharacter(userId: number): Promise<Character> {

  return prisma.character.create({
    data: {
      userId,
      name: "teste",
    },
  });
}
