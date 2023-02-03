import { Option } from "@prisma/client";
import { prisma } from "@/config";

export async function createOption(): Promise<Option> {
  return prisma.option.create({
    data: {
      description: "opção",
    },
  });
}
