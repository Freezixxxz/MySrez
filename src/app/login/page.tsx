"use client";

import { useState } from "react";
import { loginUser } from "../../actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const res = await loginUser(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-3xl shadow-sm border border-[#E2E8F0]">
      <h1 className="text-2xl font-bold mb-6 text-center">Вход в LeShop</h1>
      <form action={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          required
          className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Входим..." : "Войти"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-blue-600">
          Регистрация
        </Link>
      </p>
    </div>
  );
}
