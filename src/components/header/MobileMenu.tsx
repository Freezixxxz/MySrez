// src/components/header/MobileMenu.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // Кнопка бургера (показывается только на мобилках)
  const trigger = (
    <button
      onClick={() => setIsOpen(true)}
      className="md:hidden p-2 -mr-2 text-[#0F172A] hover:bg-[#EEF2F9] rounded-xl transition-colors"
      aria-label="Открыть меню"
    >
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );

  if (!mounted) return <>{trigger}</>;

  // Само выезжающее меню
  const menuContent = isOpen && (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Темный фон */}
      <div
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeMenu}
      ></div>

      {/* Боковая панель */}
      <div className="relative w-[80%] max-w-[300px] bg-white/95 backdrop-blur-xl h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 border-r border-white/60">
        {/* Шапка меню */}
        <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center bg-white/50">
          <span className="text-xl font-bold text-[#0F172A]">Меню</span>
          <button
            onClick={closeMenu}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EEF2F9] text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Ссылки навигации */}
        <nav className="flex flex-col p-4 gap-2 flex-1 overflow-y-auto">
          <Link
            href="/catalog"
            onClick={closeMenu}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EEF2F9] text-[#0F172A] font-medium transition-colors"
          >
            <span className="text-2xl">🎮</span> Каталог
          </Link>
          <Link
            href="/sell"
            onClick={closeMenu}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EEF2F9] text-[#0F172A] font-medium transition-colors"
          >
            <span className="text-2xl">🏷️</span> Продать
          </Link>
          <Link
            href="/chats"
            onClick={closeMenu}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EEF2F9] text-[#0F172A] font-medium transition-colors"
          >
            <span className="text-2xl">💬</span> Чаты
          </Link>
          <Link
            href="/cart"
            onClick={closeMenu}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EEF2F9] text-[#0F172A] font-medium transition-colors"
          >
            <span className="text-2xl">🛒</span> Корзина
          </Link>
          <Link
            href="/favorites"
            onClick={closeMenu}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EEF2F9] text-[#0F172A] font-medium transition-colors"
          >
            <span className="text-2xl">❤️</span> Избранное
          </Link>
        </nav>

        {/* Подвал меню */}
        <div className="p-6 border-t border-[#E2E8F0] bg-[#F6F8FC]/50">
          <p className="text-xs text-[#94A3B8] text-center">
            LeShop © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {trigger}
      {createPortal(menuContent, document.body)}
    </>
  );
};

export default MobileMenu;
