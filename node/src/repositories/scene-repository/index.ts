import { prisma } from "@/config";

async function findAllScenes() {
  return prisma.scene.findMany({
    include: { SceneOptions: { include: { Option: { select: { description: true } } } } },
  });
}

const sceneRepository = {
  findAllScenes,
};

export default sceneRepository;
