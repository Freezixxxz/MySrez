// src/components/TopMenu.tsx
import Link from "next/link";
import Image from "next/image";

const TopMenu = () => {
  const menuItems = [
    { href: "/sell", icon: "/icons-header/icon-sale.png", label: "Продать" },
    { href: "/chats", icon: "/icons-header/icon-chats.png", label: "Чаты" },
    // Добавили Корзину
    { href: "/cart", icon: "/icons-header/icon-cart.svg", label: "Корзина" },
  ];

  return (
    <ul className="flex flex-row gap-x-6 items-end">
      {menuItems.map(({ href, icon, label }) => (
        <li key={href} className="flex flex-col items-center gap-2.5 min-w-11">
          <Link
            href={href}
            className="flex flex-col items-center gap-2.5 group relative"
            aria-label={label}
          >
            <div className="relative">
              {/* Если иконки icon-cart.png пока нет, вместо <Image> будет пустой квадрат, но лучше её добавить в public/icons-header/ */}
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 object-contain transition group-hover:opacity-80"
              />
              {/* Бейдж количества товаров (пока захардкодим 2 для красоты) */}
              {label === "Корзина" && (
                <span className="absolute -top-1.5 -right-2 bg-[#ff6633] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  2
                </span>
              )}
            </div>
            <span className="text-sm text-[#475569] group-hover:text-[#4F46E5] transition">
              {label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TopMenu;
