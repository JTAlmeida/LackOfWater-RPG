import { prisma } from "@/config";

async function findAllEnemies() {
  return prisma.enemy.findMany({
    include: {
      EnemyItems: {
        include: { Item: { select: { name: true, description: true } } },
      },
    },
  });
}

const enemyRepository = {
  findAllEnemies,
};

export default enemyRepository;
