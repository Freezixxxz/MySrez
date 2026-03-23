import { prisma } from "../lib/prisma";
import Link from "next/link";

export default async function Home() {
  // 🪄 Магия Prisma: достаем ВСЕ товары из базы данных
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc", // Сортируем так, чтобы новые были сверху
    },
  });

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Витрина товаров</h1>

      {/* Сетка для карточек товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Перебираем товары из базы и рисуем для каждого карточку */}
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Картинка (пока просто вставляем ссылку) */}
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            {/* Название */}
            <h2 className="text-xl font-semibold">{product.title}</h2>

            {/* Категории (выводим через запятую) */}
            <p className="text-sm text-gray-500 mb-2">
              {product.categories.join(", ")}
            </p>

            {/* Цена с учетом скидки */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                {product.discountPercent > 0 ? (
                  <>
                    <span className="text-red-500 font-bold text-lg">
                      {/* Считаем цену со скидкой */}$
                      {(
                        product.basePrice *
                        (1 - product.discountPercent / 100)
                      ).toFixed(2)}
                    </span>
                    <span className="text-gray-400 line-through text-sm ml-2">
                      ${product.basePrice}
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-lg">
                    ${product.basePrice}
                  </span>
                )}
              </div>

              {/* Рейтинг */}
              <div className="text-yellow-500 text-sm">★ {product.rating}</div>
            </div>

            <Link
              href={`/product/${product.id}`}
              className="block text-center w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Подробнее
            </Link>
          </div>
        ))}

        {/* Если товаров нет, покажем сообщение */}
        {products.length === 0 && (
          <p className="text-gray-500">Товаров пока нет. Запусти seed.ts!</p>
        )}
      </div>
    </main>
  );
}
