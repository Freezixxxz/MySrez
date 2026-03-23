"use client";
import { useState } from "react";

// Фейковые данные чатов
const mockChats = [
  {
    id: 1,
    name: "ProSeller_99",
    item: "Аккаунт WoT Blitz 15к боёв",
    lastMsg: "Да, данные отправлю сразу после оплаты.",
    time: "14:30",
    unread: 1,
    avatar: "PR",
  },
  {
    id: 2,
    name: "GamerBoy",
    item: "5000 Голды",
    lastMsg: "Спасибо! Всё пришло.",
    time: "Вчера",
    unread: 0,
    avatar: "GB",
  },
  {
    id: 3,
    name: "BoostMaster",
    item: "Буст до 10 уровня",
    lastMsg: "Начинаю выполнение заказа через 10 минут.",
    time: "Понедельник",
    unread: 0,
    avatar: "BM",
  },
];

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState(mockChats[0].id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-8">Мои сообщения</h1>

      <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
        {/* ЛЕВАЯ КОЛОНКА: Список чатов */}
        <div className="w-full lg:w-1/3 glass rounded-3xl border border-white/60 shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-[#E2E8F0] bg-white/40">
            <input
              type="text"
              placeholder="Поиск по сообщениям..."
              className="w-full bg-[#EEF2F9] border-none text-[#0F172A] px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all placeholder:text-[#94A3B8] text-sm"
            />
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-1 scrollbar-hide">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-3 rounded-2xl cursor-pointer transition-all flex gap-4 items-center ${
                  activeChat === chat.id
                    ? "bg-white shadow-sm border border-[#E2E8F0]"
                    : "hover:bg-white/50 border border-transparent"
                }`}
              >
                {/* Аватар */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                  {chat.avatar}
                </div>

                {/* Инфо */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-[#0F172A] truncate">
                      {chat.name}
                    </h4>
                    <span className="text-xs text-[#94A3B8] ml-2 shrink-0">
                      {chat.time}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#4F46E5] truncate mb-0.5">
                    {chat.item}
                  </p>
                  <p className="text-sm text-[#64748B] truncate">
                    {chat.lastMsg}
                  </p>
                </div>

                {/* Непрочитанные */}
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-[#4F46E5] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Окно переписки */}
        <div className="hidden lg:flex flex-1 glass rounded-3xl border border-white/60 shadow-[var(--shadow-card)] flex-col overflow-hidden">
          {/* Шапка чата */}
          <div className="p-4 border-b border-[#E2E8F0] bg-white/60 backdrop-blur-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold">
                PR
              </div>
              <div>
                <h3 className="font-semibold text-[#0F172A]">ProSeller_99</h3>
                <p className="text-xs text-emerald-600 font-medium">Онлайн</p>
              </div>
            </div>
            <button className="text-sm px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl font-medium transition">
              Перейти к товару
            </button>
          </div>

          {/* Область сообщений */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F6F8FC]/50">
            <div className="flex justify-center">
              <span className="text-xs font-medium text-[#94A3B8] bg-white/80 px-3 py-1 rounded-full shadow-sm">
                Сегодня
              </span>
            </div>

            {/* Сообщение собеседника */}
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0 mt-auto">
                PR
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-[#E2E8F0] text-[#0F172A] text-sm">
                Привет! Вижу заказ на аккаунт. Готов передать данные.
              </div>
            </div>

            {/* Наше сообщение */}
            <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
              <div className="bg-[#4F46E5] p-4 rounded-2xl rounded-br-none shadow-md text-white text-sm">
                Привет! Отлично, жду логин и пароль.
              </div>
            </div>

            {/* Сообщение собеседника */}
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0 mt-auto">
                PR
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-[#E2E8F0] text-[#0F172A] text-sm">
                Да, данные отправлю сразу после оплаты.
              </div>
            </div>
          </div>

          {/* Поле ввода */}
          <div className="p-4 bg-white/60 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <button className="w-10 h-10 flex items-center justify-center text-[#94A3B8] hover:text-[#4F46E5] transition bg-[#EEF2F9] rounded-xl">
                📎
              </button>
              <input
                type="text"
                placeholder="Напишите сообщение..."
                className="flex-1 bg-transparent border-none focus:outline-none text-[#0F172A] px-2"
              />
              <button className="w-10 h-10 flex items-center justify-center bg-[#4F46E5] hover:bg-[#4338ca] text-white rounded-xl shadow-md transition-transform active:scale-95">
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
