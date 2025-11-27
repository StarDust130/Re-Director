// Use a single PrismaClient instance during development to avoid
// exhausting database connections when modules are reloaded.
// if (isPostgres) {
//   prisma = new PrismaClient({
//     adapter: new PrismaVercel({
//       connectionString: process.env.DATABASE_URL,
//     }),
// } else {
//   prisma = new PrismaClient();
// }

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Single shared Prisma client to prevent connection exhaustion during
// hot reloads in development.
export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Notes:
// - We intentionally do NOT import or attempt to use non-standard adapters
//   from `@vercel/postgres` here. For Neon (or Vercel Postgres) deployments
//   supply a proper `DATABASE_URL` in Vercel's environment variables
//   (it should start with `postgres://` or `postgresql://`). Prisma will
//   then connect using that URL.
