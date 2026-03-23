// src/components/header/Profile.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "./AuthModal";
import RoleToggle from "./RoleToggle"; // Импортируем твой переключатель, мы перенесем его внутрь меню
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Profile = () => {
  // ДЛЯ ПРОТОТИПА: Управляем состоянием авторизации
  // Изначально пользователь НЕ авторизован
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Временные данные авторизованного пользователя
  const user = {
    name: "Ярослав",
    id: "48291",
    avatar: "/icons-header/icon-profile.png", // Убедись, что иконка есть по этому пути
    balance: "2 340 ₽",
  };

  const handleLogout = () => {
    // В прототипе просто меняем состояние
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="flex items-center">
        {isLoggedIn ? (
          // === БЛОК ДЛЯ АВТОРИЗОВАННОГО ПОЛЬЗОВАТЕЛЯ (СОВРЕМЕННЫЙ DROPDOWN) ===
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              {/* Триггер: Кликабельная аватарка */}
              <button
                className="flex items-center gap-2.5 group focus:outline-none"
                aria-label="Открыть меню профиля"
              >
                <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-[#E2E8F0]">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block font-medium text-sm text-[#0F172A] group-hover:text-[#4F46E5] transition-colors line-clamp-1">
                    {user.name}
                  </span>
                  <span className="block text-xs text-emerald-600 font-medium">
                    Онлайн
                  </span>
                </div>
                {/* Иконка стрелочки вниз */}
                <span className="text-xs text-[#94A3B8] group-hover:text-[#0F172A] transition-colors ml-1">
                  ▼
                </span>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              {/* Контент выпадающего меню (Стеклянный стиль) */}
              <DropdownMenu.Content
                className="z-[100] min-w-[260px] glass p-4 rounded-3xl shadow-2xl border border-white/60 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 focus:outline-none"
                sideOffset={10}
                align="end"
              >
                {/* Заголовок с именем и ID */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#E2E8F0]">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[#E2E8F0]">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href="/profile"
                      className="block font-semibold text-[#0F172A] hover:text-[#4F46E5] transition-colors text-lg"
                    >
                      {user.name}
                    </Link>
                    <p className="text-sm text-[#64748B]">ID {user.id}</p>
                  </div>
                </div>

                {/* Блок Баланса */}
                <div className="bg-[#EEF2F9] p-3 rounded-xl">
                  <p className="text-xs text-[#64748B] mb-0.5">
                    Баланс кошелька
                  </p>
                  <p className="font-bold text-[#0F172A] text-lg">
                    {user.balance}
                  </p>
                  <Link
                    href="/profile"
                    className="text-xs text-[#4F46E5] hover:underline font-medium"
                  >
                    Пополнить или вывести →
                  </Link>
                </div>

                {/* Переключатель роли (Убран из хедера, теперь он здесь!) */}
                <div className="py-2">
                  <RoleToggle />
                </div>

                {/* Ссылки на разделы профиля */}
                {/* Ссылки на разделы профиля */}
                <DropdownMenu.Group className="space-y-1">
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/profile"
                      className="flex items-center px-3 py-2.5 rounded-xl text-sm text-[#475569] hover:bg-white/70 hover:text-[#0F172A] transition focus:outline-none"
                    >
                      👤 Личный кабинет
                    </Link>
                  </DropdownMenu.Item>{" "}
                  {/* <--- ИСПРАВЛЕНО ЗДЕСЬ */}
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/favorites"
                      className="flex items-center px-3 py-2.5 rounded-xl text-sm text-[#475569] hover:bg-white/70 hover:text-[#0F172A] transition focus:outline-none"
                    >
                      ❤️ Избранные товары
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/guarantees"
                      className="flex items-center px-3 py-2.5 rounded-xl text-sm text-[#475569] hover:bg-white/70 hover:text-[#0F172A] transition focus:outline-none"
                    >
                      🛡️ Гарантии безопасности
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>

                {/* Кнопка Выхода */}
                <div className="border-t border-[#E2E8F0] pt-2">
                  <DropdownMenu.Item
                    onClick={handleLogout}
                    className="flex w-full items-center px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-700 transition focus:outline-none cursor-pointer"
                  >
                    ↪ Выйти из аккаунта
                  </DropdownMenu.Item>
                </div>

                <DropdownMenu.Arrow className="fill-white/80" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          // === БЛОК ДЛЯ ГОСТЯ (ЧИСТЫЙ "ЛИЧНЫЙ КАБИНЕТ") ===
          <button
            onClick={() => setIsAuthModalOpen(true)}
            // На мобилках: w-10 h-10, круглая/квадратная. На ПК: обычная кнопка с отступами
            className="w-10 h-10 md:w-auto md:h-auto md:px-6 md:py-2.5 bg-[#4F46E5] hover:bg-[#4338ca] text-white font-semibold rounded-xl md:rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🔒</span>
            {/* Текст прячем на маленьких экранах (добавили hidden md:block) */}
            <span className="hidden md:block">Личный кабинет</span>
          </button>
        )}
      </div>

      {/* Модальное окно авторизации (используем ранее созданный компонент) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsLoggedIn(true)} // Авторизуем пользователя при успехе
      />
    </>
  );
};

export default Profile;
