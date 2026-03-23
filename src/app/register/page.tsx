"use client";

import { registerUser } from "../../actions/auth";
import Link from "next/link";

export default function RegisterPage() {
  // Обычная функция обработки, которую легче отловить
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Останавливаем перезагрузку

    console.log("1. [БРАУЗЕР]: Кнопка нажата, функция handleSubmit запущена");

    const formData = new FormData(event.currentTarget);

    try {
      console.log("2. [БРАУЗЕР]: Отправляем данные на сервер...");
      const result = await registerUser(formData);

      if (result?.error) {
        alert("Ошибка от сервера: " + result.error);
      } else {
        console.log("3. [БРАУЗЕР]: Сервер ответил успешно!");
      }
    } catch (err: any) {
      console.error("КРИТИЧЕСКАЯ ОШИБКА В БРАУЗЕРЕ:", err);
      alert("JS сломался: " + err.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border">
        <h1 className="text-2xl font-bold text-center mb-6">
          Тест Регистрации
        </h1>

        {/* Используем onSubmit вместо action для чистого теста */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="Никнейм"
            required
            className="p-3 border rounded-xl"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="p-3 border rounded-xl"
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            required
            className="p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700"
          >
            Нажми меня (Проверка)
          </button>
        </form>
      </div>
    </main>
  );
}
