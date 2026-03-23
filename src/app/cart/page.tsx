"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import database from "@/data/database.json";

export default function CartPage() {
  // Для демонстрации возьмем первые 2 товара из базы данных
  const initialItems = database.products.slice(0, 2);
  const [cartItems, setCartItems] = useState(initialItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Функция удаления из корзины
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Имитация успешной оплаты
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setCartItems([]); // Очищаем корзину после оплаты
      setIsCheckingOut(false);
      alert("Оплата прошла успешно! Товары добавлены в ваш профиль.");
    }, 1500);
  };

  // Подсчет итоговых сумм
  const subtotal = cartItems.reduce((acc, item) => {
    const finalPrice =
      item.discountPercent > 0
        ? Math.round(item.basePrice * (1 - item.discountPercent / 100))
        : item.basePrice;
    return acc + finalPrice;
  }, 0);

  const discountTotal = cartItems.reduce((acc, item) => {
    if (item.discountPercent > 0) {
      return (
        acc +
        (item.basePrice -
          Math.round(item.basePrice * (1 - item.discountPercent / 100)))
      );
    }
    return acc;
  }, 0);

  const serviceFee = cartItems.length > 0 ? 50 : 0; // Символическая комиссия площадки
  const total = subtotal + serviceFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
        Корзина{" "}
        <span className="text-[#94A3B8] text-2xl font-medium ml-2">
          {cartItems.length}
        </span>
      </h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ЛЕВАЯ КОЛОНКА: Список товаров */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => {
              const finalPrice =
                item.discountPercent > 0
                  ? Math.round(
                      item.basePrice * (1 - item.discountPercent / 100),
                    )
                  : item.basePrice;

              return (
                <div
                  key={item.id}
                  className="glass p-4 rounded-3xl flex flex-col sm:flex-row items-center gap-6 border border-white/60 shadow-sm relative group"
                >
                  {/* Кнопка удаления (крестик) */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 sm:top-1/2 sm:-translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Удалить товар"
                  >
                    ✕
                  </button>

                  <div className="relative w-full sm:w-40 h-32 rounded-2xl overflow-hidden shrink-0">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 160px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2 w-full pr-8">
                    <div>
                      <div className="flex gap-2 mb-2">
                        {item.categories.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold uppercase tracking-wider"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-lg font-semibold text-[#0F172A] hover:text-[#4F46E5] transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-[#64748B] mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-end gap-3">
                      <span className="text-2xl font-bold text-[#0F172A]">
                        {finalPrice} ₽
                      </span>
                      {item.discountPercent > 0 && (
                        <span className="text-sm text-[#94A3B8] line-through mb-1">
                          {item.basePrice} ₽
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ПРАВАЯ КОЛОНКА: Чек (Summary) */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="glass p-6 rounded-3xl sticky top-24 border border-white/60 shadow-[var(--shadow-card)] flex flex-col gap-6">
              <h3 className="text-xl font-bold text-[#0F172A]">Ваш заказ</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#475569]">
                  <span>Товары ({cartItems.length}):</span>
                  <span className="font-medium text-[#0F172A]">
                    {subtotal + discountTotal} ₽
                  </span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Скидка:</span>
                    <span>-{discountTotal} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-[#475569]">
                  <span>Сервисный сбор:</span>
                  <span className="font-medium text-[#0F172A]">
                    {serviceFee} ₽
                  </span>
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] pt-4">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-[#0F172A] font-semibold">Итого:</span>
                  <span className="text-3xl font-bold text-[#0F172A]">
                    {total} ₽
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                    isCheckingOut
                      ? "bg-indigo-400 text-white cursor-not-allowed"
                      : "bg-[#4F46E5] hover:bg-[#4338ca] text-white hover:shadow-lg active:scale-[0.98]"
                  }`}
                >
                  {isCheckingOut ? "Оплата..." : "Оплатить"}
                </button>
                <p className="text-[10px] text-center text-[#94A3B8] mt-3 uppercase tracking-wide">
                  Безопасная сделка • Гарантия возврата
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ПУСТАЯ КОРЗИНА */
        <div className="glass max-w-2xl mx-auto p-12 rounded-3xl text-center border border-white/60 mt-10 shadow-sm animate-in zoom-in duration-500">
          <div className="text-6xl mb-6 opacity-80">🛍️</div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">
            Ваша корзина пуста
          </h2>
          <p className="text-[#64748B] mb-8">
            Самое время добавить в неё что-нибудь полезное. Загляните в каталог,
            там много интересного!
          </p>
          <Link
            href="/catalog"
            className="inline-block px-8 py-3.5 bg-[#4F46E5] text-white font-medium rounded-2xl hover:bg-[#4338ca] transition-colors shadow-md"
          >
            Перейти в каталог
          </Link>
        </div>
      )}
    </div>
  );
}
