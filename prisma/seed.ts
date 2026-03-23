// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import fs from "fs";
import path from "path";

// Создаем подключение через стандартный драйвер 'pg'
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(
    "🌱 Начинаю перенос данных из JSON в PostgreSQL (через Adapter)...",
  );

  const filePath = path.join(process.cwd(), "src/data/database.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const { products } = JSON.parse(fileData);

  // Очистка
  await prisma.product.deleteMany();
  console.log("🗑️ Старые данные удалены.");

  // Запись
  for (const item of products) {
    await prisma.product.create({
      data: {
        img: item.img,
        title: item.title,
        description: item.description,
        basePrice: item.basePrice,
        discountPercent: item.discountPercent,
        rating: item.rating,
        categories: item.categories,
      },
    });
  }

  console.log("✅ Ура! База успешно наполнена.");
}

main()
  .catch((e) => {
    console.error("❌ Ошибка сидинга:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
