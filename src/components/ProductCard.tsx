import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "../types/product";

const ProductCard = ({
  id, // <-- Обязательно достаем id для ссылки
  img,
  title,
  description,
  basePrice,
  discountPercent,
  rating,
  priority = false, // Для оптимизации загрузки картинок
}: ProductCardProps) => {
  // Логика расчета финальной цены
  const finalPrice =
    discountPercent > 0
      ? Math.round(basePrice * (1 - discountPercent / 100))
      : basePrice;

  return (
    <div className="glass group rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-hover relative flex flex-col h-full bg-white">
      {/* Кнопка "В избранное" (должна быть поверх ссылки, чтобы не перекидывало при клике) */}
      <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm">
        <Image
          src="/icons-header/icon-heart.svg"
          alt="В избранное"
          width={20}
          height={20}
        />
      </button>

      {/* Верхняя часть с картинкой (кликабельная) */}
      <Link
        href={`/product/${id}`}
        className="block relative h-[200px] md:h-[240px] lg:h-[260px] w-full shrink-0"
      >
        <Image
          src={img}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Плашка со скидкой */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 bg-[#ff6633] text-white text-sm font-bold px-3 py-1 rounded-2xl">
            -{discountPercent}%
          </div>
        )}
      </Link>

      {/* Нижняя часть с информацией */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        <Link href={`/product/${id}`} className="block">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-[var(--color-text)] group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Описание прижимаем наверх, чтобы цена и кнопка всегда были снизу ровно */}
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Блок с ценой и рейтингом */}
        <div className="flex items-end justify-between pt-2">
          <div>
            <div className="flex items-baseline gap-1 text-2xl font-bold text-[var(--color-text)]">
              {finalPrice}
              <span className="text-base font-normal text-[#94a3b8]">₽</span>
            </div>
            {discountPercent > 0 && (
              <div className="text-sm line-through text-[#94a3b8]">
                {basePrice} ₽
              </div>
            )}
          </div>

          {rating > 0 && (
            <div className="text-sm font-medium text-amber-500 flex items-center gap-1">
              ★ {rating}
            </div>
          )}
        </div>

        <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md mt-auto">
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
