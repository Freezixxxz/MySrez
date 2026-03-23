// prisma.config.ts
import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

// Принудительно загружаем переменные из .env
dotenv.config();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // Теперь это точно не будет undefined
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: "npx tsx ./prisma/seed.ts",
  },
});
