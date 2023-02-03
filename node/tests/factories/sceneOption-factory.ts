import { SceneOption } from "@prisma/client";
import { prisma } from "@/config";

export async function createSceneOption(sceneId: number, optionId: number): Promise<SceneOption> {
  return prisma.sceneOption.create({
    data: {
      sceneId,
      optionId,
    },
  });
}
