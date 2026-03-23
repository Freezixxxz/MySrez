// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#E2E8F0] bg-white/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Логотип и описание */}
          <div className="space-y-4">
            <Link href="/" className="inline-block relative w-28 h-10">
              {/* Убедись, что иконка логотипа есть по этому пути */}
              <Image
                src="/icons-header/icon-logo.svg"
                alt="LeShop"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Безопасная площадка для покупки и продажи игровых ценностей. Твой
              надежный спутник в мире гейминга.
            </p>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="font-semibold text-[#0F172A] mb-4">Покупателям</h3>
            <ul className="space-y-3 text-sm text-[#475569]">
              <li>
                <Link
                  href="/guarantees"
                  className="hover:text-[#4F46E5] transition"
                >
                  Гарантии безопасности
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-[#4F46E5] transition"
                >
                  Отзывы о продавцах
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-[#4F46E5] transition"
                >
                  Служба поддержки
                </Link>
              </li>
            </ul>
          </div>

          {/* Продавцам */}
          <div>
            <h3 className="font-semibold text-[#0F172A] mb-4">Продавцам</h3>
            <ul className="space-y-3 text-sm text-[#475569]">
              <li>
                <Link href="/sell" className="hover:text-[#4F46E5] transition">
                  Начать продавать
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-[#4F46E5] transition">
                  Правила площадки
                </Link>
              </li>
              <li>
                <Link href="/fees" className="hover:text-[#4F46E5] transition">
                  Комиссии и вывод
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-semibold text-[#0F172A] mb-4">
              Оставайтесь на связи
            </h3>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition">
                <span className="text-[#4F46E5] font-bold">VK</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition">
                <span className="text-[#4F46E5] font-bold">TG</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} LeShop. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#4F46E5] transition">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-[#4F46E5] transition">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
