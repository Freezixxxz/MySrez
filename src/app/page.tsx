import { prisma } from "../lib/prisma";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider/Slider";

export default async function Home() {
  // Достаем все товары из базы данных
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="space-y-10 py-4">
      {/* 1. Выводим слайдер (раз уж он у нас есть в проекте) */}
      <section>
        <Slider />
      </section>

      {/* 2. Витрина товаров */}
      <section>
        <h1 className="text-3xl font-bold mb-8 text-[var(--color-text)]">
          Витрина товаров
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              img={product.img}
              title={product.title}
              description={product.description || "Описание отсутствует"}
              basePrice={product.basePrice}
              discountPercent={product.discountPercent}
              rating={product.rating}
              categories={product.categories}
            />
          ))}
        </div>

        {/* Сообщение, если база пустая */}
        {products.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100 mt-8">
            <p className="text-gray-500 text-lg">
              Товаров пока нет. Пожалуйста, запустите сидирование (seed.ts)!
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
