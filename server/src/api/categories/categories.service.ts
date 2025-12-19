import { prisma } from "@server/prisma"

const getAll = async () => {
  return await prisma.categories.findMany({
    select: {
      id: true,
      name: true
    }
  });
}

export const CategoryServices = {
  getAll
}