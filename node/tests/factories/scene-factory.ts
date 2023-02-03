import { Scene } from "@prisma/client";
import { prisma } from "@/config";

export async function createScene(): Promise<Scene> {
  return prisma.scene.create({
    data: {
      description: "Uma linda cena de teste!",
    },
  });
}
