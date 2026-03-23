import "dotenv/config"; // Обязательно импортируем именно так (отработает до инициализации конфига)
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Используем встроенный хелпер env() вместо process.env
    url: env("DATABASE_URL"),
  },
  migrations: {
    seed: "npx tsx ./prisma/seed.ts",
  },
});
