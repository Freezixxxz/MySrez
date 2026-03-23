import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

// Компонент принимает параметры из URL (наш [id])
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 2. Обязательно "ждем" параметры через await
  const resolvedParams = await params;

  // 3. Теперь достаем id из уже распакованного объекта
  const productId = parseInt(resolvedParams.id, 10);

  // Дальше код остается таким же...
  if (isNaN(productId)) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  // Если товара с таким ID нет в базе, тоже выдаем 404
  if (!product) {
    notFound();
  }

  // Считаем цену со скидкой
  const finalPrice =
    product.discountPercent > 0
      ? (product.basePrice * (1 - product.discountPercent / 100)).toFixed(2)
      : product.basePrice;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Назад к витрине
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Левая часть: Картинка */}
        <div className="md:w-1/2">
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-full object-cover min-h-[300px]"
          />
        </div>

        {/* Правая часть: Информация */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
            {product.categories.join(" • ")}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-extrabold text-blue-600">
              ${finalPrice}
            </span>
            {product.discountPercent > 0 && (
              <span className="text-lg text-gray-400 line-through">
                ${product.basePrice}
              </span>
            )}
            <span className="ml-auto bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
              ★ {product.rating}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Эта кнопка пока ничего не делает, подготовим её для будущих продавцов */}
          <button className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition shadow-md">
            Продать такой же товар
          </button>
        </div>
      </div>

      {/* Заглушка для будущего списка предложений от игроков */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Предложения от пользователей
        </h2>
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          Здесь скоро появятся лоты от реальных игроков.
        </div>
      </div>
    </main>
  );
}
