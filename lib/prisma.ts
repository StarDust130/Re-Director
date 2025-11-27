import { PrismaClient } from "@prisma/client";
import { PrismaVercel } from "@vercel/postgres";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const isPostgres =
  process.env.DATABASE_URL &&
  (process.env.DATABASE_URL.startsWith("postgresql://") ||
    process.env.DATABASE_URL.startsWith("postgres://"));

let prisma: PrismaClient;

if (isPostgres) {
  prisma = new PrismaClient({
    adapter: new PrismaVercel({
      connectionString: process.env.DATABASE_URL,
    }),
  });
} else {
  prisma = new PrismaClient();
}

export { prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
