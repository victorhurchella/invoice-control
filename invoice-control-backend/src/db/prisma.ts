import { PrismaClient } from "@prisma/client";

const promise: Promise<PrismaClient> = new Promise((resolve) => {
  const prisma: PrismaClient = new PrismaClient();

  resolve(prisma);
});

export const startPrisma = async () => promise;

export const getPrisma = () => promise;
