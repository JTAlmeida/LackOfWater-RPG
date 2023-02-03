import enemyRepository from "@/repositories/enemy-repository";

async function getAllEnemies() {
  const enemies = await enemyRepository.findAllEnemies();

  return enemies;
}

const enemyService = {
  getAllEnemies,
};

export default enemyService;
