import Image from "next/image";

import { ProductCardProps } from "../types/product";

const ProductCard = ({
  img,
  title, // ← теперь используем!
  description,
  basePrice,
  discountPercent,
  rating,
}: ProductCardProps) => {
  const finalPrice =
    discountPercent > 0
      ? Math.round(basePrice * (1 - discountPercent / 100))
      : basePrice;

  return (
    <div className="glass group rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-hover">
      <div className="relative h-[200px] md:h-[240px] lg:h-[260px] w-full">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Heart */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all">
          <Image
            src="/icons-header/icon-heart.svg"
            alt="В избранное"
            width={20}
            height={20}
          />
        </button>

        {/* Discount */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 bg-[#ff6633] text-white text-sm font-bold px-3 py-1 rounded-2xl">
            -{discountPercent}%
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-end justify-between">
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

        <button className="w-full h-12 bg-[var(--color-primary)] hover:bg-[#4338ca] active:bg-[#3730a3] text-white font-medium rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md">
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
