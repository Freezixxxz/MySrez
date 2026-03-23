import "dotenv/config"; // <-- Добавь это ПЕРВЫМ делом
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool as any);

  console.log("🛠 Prisma Client: Создание нового подключения к БД...");

  return new PrismaClient({
    adapter,
    log: ["query", "error", "info", "warn"],
  });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
