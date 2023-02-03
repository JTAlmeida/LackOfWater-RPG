import { EnemyItem } from "@prisma/client";
import { prisma } from "@/config";

export async function createEnemyItem(itemId: number, enemyId: number): Promise<EnemyItem> {
  return prisma.enemyItem.create({
    data: {
      enemyId,
      itemId,
      dropChance: 50,
    },
  });
}