import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Сохраняем Prisma в глобальный объект для Next.js
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Функция, которая собирает клиент с адаптером
const createPrismaClient = () => {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool as any);

  return new PrismaClient({
    adapter,
    log: ["query"], // Оставляем логирование для удобства
  });
};

// Берем уже существующий клиент или создаем новый
export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
