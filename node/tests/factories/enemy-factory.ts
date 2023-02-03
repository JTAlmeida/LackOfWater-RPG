import { Enemy } from "@prisma/client";
import { prisma } from "@/config";

export async function createEnemy(): Promise<Enemy> {
  return prisma.enemy.create({
    data: {
      name: "Guarda de Elite",
      atk: 20,
      def: 5,
      hp: 60,
      exp: 100,
      imgUrl:
        "https://trello.com/1/cards/63c831995a5f1201c630a8e7/attachments/63cefaf480529af3754c766a/previews/63cefaf580529af3754c76d1/download/elite_guard.png",
    },
  });
}
