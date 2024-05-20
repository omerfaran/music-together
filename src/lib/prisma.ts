import { PrismaClient } from "@prisma/client";

// This snippet below is for making sure that hot reload will not recreate a new prisma client over
// and over. If we're in development it will use the created new PrismaClient,
// and if we're in production, we shouldn't worry about it because hot reload won't occur there

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
