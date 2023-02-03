import { PrismaClient } from "@prisma/client";
import { Scenes, Options, Enemies, Items, EnemyItems, SceneOptions } from "./seedHelper";
const prisma = new PrismaClient();

async function main() {
  await seedScenes();
  await seedOptions();
  await seedEnemies();
  await seedItems();
  await seedEnemyItems();
  await seedSceneOptions();
}

async function seedScenes() {
  const scenes = await prisma.scene.findFirst();

  if (!scenes) {
    await prisma.scene.createMany({
      data: Scenes,
    });
  }
}

async function seedOptions() {
  const options = await prisma.option.findFirst();

  if (!options) {
    await prisma.option.createMany({
      data: Options,
    });
  }
}

async function seedEnemies(){
  const enemies = await prisma.enemy.findFirst();

  if(!enemies){
    await prisma.enemy.createMany({
      data: Enemies,
    })
  }
}

async function seedItems(){
  const items = await prisma.item.findFirst();

  if(!items){
    await prisma.item.createMany({
      data: Items,
    })
  }
}

async function seedEnemyItems(){
  const enemyItems = await prisma.enemyItem.findFirst();

  if(!enemyItems){
    await prisma.enemyItem.createMany({
      data: EnemyItems,
    })
  }
}

async function seedSceneOptions(){
  const sceneOptions = await prisma.sceneOption.findFirst();

  if (!sceneOptions){
    await prisma.sceneOption.createMany({
      data: SceneOptions,
    })
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
