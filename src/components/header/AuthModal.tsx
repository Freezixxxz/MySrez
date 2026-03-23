// src/components/header/AuthModal.tsx
"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [view, setView] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Этот хук нужен, чтобы портал работал только на стороне клиента (особенность Next.js)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитируем загрузку и успешный вход
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
      onClose();
    }, 1500);
  };

  // Создаем верстку окна, которую будем телепортировать
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0">
      {/* Темный фон на весь экран */}
      <div
        className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Сама карточка модалки */}
      <div className="relative w-full max-w-[420px] bg-white rounded-[2rem] p-8 shadow-2xl border border-white/20 animate-in zoom-in-95 fade-in duration-300">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-[#EEF2F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A] transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-8 mt-2">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
            {view === "login" ? "С возвращением!" : "Создать аккаунт"}
          </h2>
          <p className="text-[#64748B] text-sm">
            {view === "login"
              ? "Войдите, чтобы совершать покупки"
              : "Присоединяйтесь к тысячам геймеров"}
          </p>
        </div>

        {/* Переключатель Вход / Регистрация */}
        <div className="flex bg-[#EEF2F9] p-1 rounded-2xl mb-8 relative">
          <button
            onClick={() => setView("login")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all z-10 ${
              view === "login"
                ? "text-[#0F172A] shadow-sm bg-white"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => setView("register")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all z-10 ${
              view === "register"
                ? "text-[#0F172A] shadow-sm bg-white"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            Регистрация
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {view === "register" && (
            <div className="animate-in slide-in-from-right-2 duration-300">
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                placeholder="Например: Ярослав"
                required
                className="w-full bg-[#F6F8FC] border border-[#E2E8F0] text-[#0F172A] px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all placeholder:text-[#94A3B8]"
              />
            </div>
          )}

          <div className="animate-in slide-in-from-right-2 duration-300 delay-75">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              required
              className="w-full bg-[#F6F8FC] border border-[#E2E8F0] text-[#0F172A] px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all placeholder:text-[#94A3B8]"
            />
          </div>

          <div className="animate-in slide-in-from-right-2 duration-300 delay-150">
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-semibold text-[#0F172A]">
                Пароль
              </label>
              {view === "login" && (
                <a
                  href="#"
                  className="text-xs font-medium text-[#4F46E5] hover:underline"
                >
                  Забыли пароль?
                </a>
              )}
            </div>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full bg-[#F6F8FC] border border-[#E2E8F0] text-[#0F172A] px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all placeholder:text-[#94A3B8]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-4 py-4 rounded-2xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 ${
              isLoading
                ? "bg-indigo-400 text-white cursor-not-allowed"
                : "bg-[#4F46E5] hover:bg-[#4338ca] text-white hover:shadow-lg active:scale-[0.98]"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Загрузка...
              </span>
            ) : view === "login" ? (
              "Войти в аккаунт"
            ) : (
              "Зарегистрироваться"
            )}
          </button>
        </form>
      </div>
    </div>
  );

  // Используем Портал, чтобы отрендерить модалку в самом низу тега <body>
  return createPortal(modalContent, document.body);
};

export default AuthModal;
