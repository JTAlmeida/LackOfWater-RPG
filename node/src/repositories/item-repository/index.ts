import { prisma } from "@/config";

async function findAllItems() {
  return prisma.item.findMany();
}

async function findItemById(itemId: number) {
  return prisma.item.findFirst({ where: { id: itemId } });
}

const itemRepository = {
  findAllItems,
  findItemById,
};

export default itemRepository;