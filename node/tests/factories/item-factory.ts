import { Item } from "@prisma/client";
import { prisma } from "@/config";

export async function createItem(): Promise<Item> {
  return prisma.item.create({
    data: {
      name: "Poção de HP",
      description: "Cura 50% da sua vida máxima",
    },
  });
}
