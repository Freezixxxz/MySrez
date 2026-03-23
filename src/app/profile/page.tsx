// src/app/profile/page.tsx
"use client";
import { useState } from "react";

type TabType = "purchases" | "sales" | "chats" | "balance";

const mockPurchases = [
  {
    id: 101,
    title: "Аккаунт WoT Blitz 15к боёв",
    price: 1250,
    date: "12 марта",
  },
  { id: 102, title: "5000 голды", price: 420, date: "10 марта" },
];

const mockSales = [
  {
    id: 201,
    title: "Аккаунт с 3 танками Т10",
    price: 890,
    date: "11 марта",
    status: "Продано",
  },
  {
    id: 202,
    title: "Буст до 10 уровня",
    price: 1450,
    date: "8 марта",
    status: "В процессе",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("purchases");

  const tabs: { id: TabType; label: string }[] = [
    { id: "purchases", label: "Мои покупки" },
    { id: "sales", label: "Мои продажи" },
    { id: "chats", label: "Чаты" },
    { id: "balance", label: "Баланс и вывод" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2 text-[#0F172A]">
          Личный кабинет
        </h1>
        <p className="text-[#64748B]">
          Ярослав • Баланс:{" "}
          <span className="font-semibold text-[#0F172A]">2 340 ₽</span>
        </p>
      </div>

      {/* Табы */}
      <div className="flex gap-2 mb-8 border-b border-[#E2E8F0] pb-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 rounded-3xl font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#4F46E5] text-white shadow-md"
                : "text-[#475569] hover:bg-white/70 hover:text-[#0F172A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Содержимое табов */}
      {activeTab === "purchases" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-semibold text-[#0F172A]">
            История покупок
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockPurchases.map((item) => (
              <div
                key={item.id}
                className="glass p-6 rounded-3xl hover:shadow-md transition-shadow"
              >
                <p className="font-medium text-[#0F172A]">{item.title}</p>
                <p className="text-2xl font-bold mt-2 text-[#4F46E5]">
                  {item.price} ₽
                </p>
                <p className="text-sm text-[#64748B] mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Куплено {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "sales" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-semibold text-[#0F172A]">
              Мои товары на продаже
            </h2>
            <a
              href="/sell"
              className="bg-white/80 hover:bg-white text-[#4F46E5] font-medium px-5 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-sm transition-all"
            >
              + Выставить новый товар
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockSales.map((item) => (
              <div
                key={item.id}
                className="glass p-6 rounded-3xl hover:shadow-md transition-shadow"
              >
                <p className="font-medium text-[#0F172A]">{item.title}</p>
                <p className="text-2xl font-bold mt-2">{item.price} ₽</p>
                <div className="mt-4 flex justify-between items-center text-sm pt-4 border-t border-[#E2E8F0]/50">
                  <span className="text-[#64748B]">{item.date}</span>
                  <span
                    className={`font-medium px-3 py-1 rounded-xl ${
                      item.status === "Продано"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "chats" && (
        <div className="glass rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-[#0F172A]">
            Чаты с покупателями
          </h2>
          <div className="flex flex-col items-center justify-center py-12 opacity-70">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              💬
            </div>
            <p className="text-center text-[#64748B] font-medium">
              Здесь будут появляться ваши диалоги
            </p>
          </div>
        </div>
      )}

      {activeTab === "balance" && (
        <div className="glass rounded-3xl p-10 text-center animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xl mx-auto border border-white/60 shadow-[var(--shadow-card)]">
          <p className="text-[#64748B] font-medium mb-2">Доступно для вывода</p>
          <p className="text-5xl md:text-6xl font-bold mb-8 text-[#0F172A]">
            2 340 ₽
          </p>
          <button className="w-full bg-[#4F46E5] hover:bg-[#4338ca] text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            Вывести на карту
          </button>
          <p className="text-xs text-[#94A3B8] mt-4">
            Комиссия за вывод 3%. Зачисление от 5 минут до 24 часов.
          </p>
        </div>
      )}
    </div>
  );
}
