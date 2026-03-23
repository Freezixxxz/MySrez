import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  // ⚡️ Это Server Action: функция выполнится прямо на сервере (в Node.js)
  async function registerUser(formData: FormData) {
    "use server"; // Магическая строчка Next.js

    // Достаем данные из формы
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Небольшая проверка, чтобы не сохранять пустые поля
    if (!username || !email || !password) return;

    try {
      // Сохраняем пользователя в базу данных
      await prisma.user.create({
        data: {
          username,
          email,
          password, // Для MVP сохраняем как есть. В будущем тут нужен будет bcrypt!
        },
      });

      // Если всё ок, перенаправляем на главную
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      // Если такой email или username уже есть, Prisma выдаст ошибку,
      // но для MVP пока просто выведем в консоль
      return;
    }

    redirect("/");
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border">
        <h1 className="text-3xl font-bold text-center mb-6">Регистрация</h1>

        {/* Форма вызывает нашу серверную функцию */}
        <form action={registerUser} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Никнейм
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="CoolGamer99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="gamer@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Создать аккаунт
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
