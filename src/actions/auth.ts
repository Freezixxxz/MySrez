"use server";

import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  console.log("🚀 [SERVER]: Функция регистрации вызвана!");

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("📦 [SERVER]: Получены данные:", { username, email });

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password, // Пока без шифрования для теста
      },
    });
    console.log("✅ [SERVER]: Юзер успешно создан с ID:", newUser.id);
  } catch (error: any) {
    console.error("❌ [SERVER]: Ошибка Prisma:", error.message);
    return { error: "Ошибка при записи в базу: " + error.message };
  }

  console.log("🔄 [SERVER]: Перенаправляем на главную...");
  redirect("/");
}
