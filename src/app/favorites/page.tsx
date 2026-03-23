"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import database from "@/data/database.json";

export default function FavoritesPage() {
  // Для прототипа: берем несколько товаров из базы и делаем вид, что мы их лайкнули
  const initialFavorites = database.products.slice(1, 4);
  const [favorites, setFavorites] = useState(initialFavorites);

  // Функция для имитации удаления из избранного (в реальном приложении она бы отправляла запрос на сервер)
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
            Избранное
          </h1>
          <p className="text-[#64748B]">
            {favorites.length > 0
              ? `Сохранено товаров: ${favorites.length}`
              : "Здесь пока ничего нет"}
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
          >
            Очистить список
          </button>
        )}
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {favorites.map((item) => (
            <div key={item.id} className="relative group">
              <Link href={`/product/${item.id}`} className="block">
                <ProductCard {...item} />
              </Link>
              {/* Поверх карточки можно добавить подсказку или кастомную кнопку удаления, 
                  но пока оставим стандартную карточку, так как сердечко уже есть внутри */}
            </div>
          ))}
        </div>
      ) : (
        /* ПУСТОЕ СОСТОЯНИЕ */
        <div className="glass max-w-2xl mx-auto p-12 rounded-3xl text-center border border-white/60 mt-10 shadow-sm animate-in zoom-in duration-500">
          <div className="text-6xl mb-6 opacity-80">❤️</div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">
            В избранном пока пусто
          </h2>
          <p className="text-[#64748B] mb-8 leading-relaxed">
            Добавляйте товары в избранное, чтобы не потерять их и следить за
            изменением цены.
          </p>
          <Link
            href="/catalog"
            className="inline-block px-8 py-3.5 bg-[#4F46E5] text-white font-medium rounded-2xl hover:bg-[#4338ca] transition-colors shadow-md"
          >
            Перейти к покупкам
          </Link>
        </div>
      )}
    </div>
  );
}
