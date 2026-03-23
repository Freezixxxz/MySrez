import Image from "next/image";
import ProductCard from "./ProductCard";
import database from "../data/database.json";
import Link from "next/link";

const Blitz = () => {
  // Исправлено название категории на WoTBlitz
  const WoTBlitzProducts = database.products.filter((p) =>
    p.categories.includes("WoTBlitz"),
  );

  return (
    <section>
      <div className="flex flex-col justify-center">
        <div className="mb-6 md:mb-10 flex flex-row justify-between items-end">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]">
            Акции
          </h2>
          <Link
            href="/catalog"
            className="flex items-center gap-x-2 group text-[#475569] hover:text-[#4F46E5] transition-colors"
          >
            Все аккаунты
            <Image
              src="/images/products/icon-arrow-right.png" // Убедись, что иконка есть по этому пути
              alt="Все аккаунты"
              width={24}
              height={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {WoTBlitzProducts.slice(0, 4).map((item) => (
            <li key={item.id}>
              <Link href={`/product/${item.id}`} className="block">
                <ProductCard {...item} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blitz;
