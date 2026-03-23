"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import database from "@/data/database.json";

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("popular");

  // Список категорий для фильтра
  const categories = [
    { id: "all", label: "Все товары" },
    { id: "WoTBlitz", label: "WoT Blitz" },
    { id: "Accounts", label: "Аккаунты" },
    { id: "currency", label: "Валюта" },
    { id: "Services", label: "Услуги" },
  ];

  // Логика фильтрации и сортировки
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...database.products];

    // 1. Фильтруем по категории
    if (activeCategory !== "all") {
      result = result.filter((p) => p.categories.includes(activeCategory));
    }

    // 2. Сортируем
    result.sort((a, b) => {
      // Вычисляем итоговую цену (со скидкой, если она есть)
      const priceA =
        a.discountPercent > 0
          ? a.basePrice * (1 - a.discountPercent / 100)
          : a.basePrice;
      const priceB =
        b.discountPercent > 0
          ? b.basePrice * (1 - b.discountPercent / 100)
          : b.basePrice;

      if (sortOrder === "cheap") return priceA - priceB;
      if (sortOrder === "expensive") return priceB - priceA;
      // Для "popular" (по умолчанию) сортируем по рейтингу
      return b.rating - a.rating;
    });

    return result;
  }, [activeCategory, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
            Каталог товаров
          </h1>
          <p className="text-[#64748B]">
            Найдено товаров: {filteredAndSortedProducts.length}
          </p>
        </div>

        {/* Сортировка */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#475569]">
            Сортировать:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white border border-[#E2E8F0] text-[#0F172A] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] shadow-sm appearance-none cursor-pointer"
          >
            <option value="popular">По популярности</option>
            <option value="cheap">Сначала дешевые</option>
            <option value="expensive">Сначала дорогие</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Боковая панель фильтров (Desktop) */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="glass p-6 rounded-3xl sticky top-24 border border-white/60 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-[#0F172A]">Категории</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-left px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "bg-[#4F46E5] text-white shadow-md"
                      : "bg-[#EEF2F9] text-[#475569] hover:bg-[#E0E7FF] hover:text-[#4F46E5]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Сетка товаров */}
        <div className="flex-1">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="block"
                >
                  <ProductCard {...item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass p-12 rounded-3xl text-center border border-white/60">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                Ничего не найдено
              </h3>
              <p className="text-[#64748B]">
                Попробуйте выбрать другую категорию или изменить фильтры.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-6 px-6 py-2 bg-[#4F46E5] text-white rounded-xl font-medium hover:bg-[#4338ca] transition"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
