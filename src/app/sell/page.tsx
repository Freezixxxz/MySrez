"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Состояния полей формы
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("wotblitz");
  const [description, setDescription] = useState("");

  // Обработчик загрузки картинки
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Создаем локальную ссылку на картинку для превью
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // Имитация отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитируем запрос к серверу (2 секунды)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-sm border border-emerald-200">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-4">
          Товар успешно выставлен!
        </h1>
        <p className="text-[#64748B] mb-8">
          Ваше объявление «{title}» теперь доступно в каталоге. Покупатели уже
          могут его увидеть.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setIsSuccess(false);
              setTitle("");
              setPrice("");
              setDescription("");
              setImagePreview(null);
            }}
            className="px-8 py-3 bg-white/80 hover:bg-white text-[#0F172A] font-medium rounded-2xl border border-[#E2E8F0] shadow-sm transition-all"
          >
            Добавить еще один
          </button>
          <Link
            href="/profile"
            className="px-8 py-3 bg-[#4F46E5] hover:bg-[#4338ca] text-white font-medium rounded-2xl shadow-md transition-all"
          >
            Перейти в профиль
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
          Разместить товар
        </h1>
        <p className="text-[#64748B]">
          Заполните информацию о товаре, чтобы начать продавать.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass p-6 md:p-8 rounded-3xl shadow-[var(--shadow-card)] space-y-8 border border-white/60"
      >
        {/* Загрузка фото */}
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-3">
            Фотография товара
          </label>
          <div className="relative w-full h-48 md:h-64 bg-[#EEF2F9] rounded-2xl border-2 border-dashed border-[#CBD5E1] hover:border-[#4F46E5] transition-colors flex flex-col items-center justify-center overflow-hidden group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              required={!imagePreview}
            />

            {imagePreview ? (
              // Используем обычный img для превью локальных файлов (как обсуждали ранее)
              <img
                src={imagePreview}
                alt="Превью"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="text-center px-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl mx-auto mb-3 shadow-sm text-[#4F46E5]">
                  📷
                </div>
                <p className="font-medium text-[#475569]">
                  Нажмите или перетащите фото сюда
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">PNG, JPG до 5 MB</p>
              </div>
            )}

            {/* Оверлей при наведении, если картинка уже загружена */}
            {imagePreview && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                  Изменить фото
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Название */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Название
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Аккаунт WoT Blitz 15к боёв"
              className="w-full bg-[#EEF2F9] border border-[#E2E8F0] text-[#0F172A] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all placeholder:text-[#94A3B8]"
              required
            />
          </div>

          {/* Категория */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Категория
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#EEF2F9] border border-[#E2E8F0] text-[#0F172A] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="wotblitz">World of Tanks Blitz</option>
              <option value="genshin">Genshin Impact</option>
              <option value="pubg">PUBG Mobile</option>
              <option value="cs2">CS 2</option>
            </select>
          </div>

          {/* Цена */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Цена (₽)
            </label>
            <div className="relative">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                min="10"
                className="w-full bg-[#EEF2F9] border border-[#E2E8F0] text-[#0F172A] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all placeholder:text-[#94A3B8]"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] font-medium pointer-events-none">
                ₽
              </span>
            </div>
          </div>
        </div>

        {/* Описание */}
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Описание товара
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Опишите все преимущества вашего товара. Чем подробнее, тем быстрее купят!"
            className="w-full bg-[#EEF2F9] border border-[#E2E8F0] text-[#0F172A] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all resize-none placeholder:text-[#94A3B8]"
            required
          ></textarea>
        </div>

        {/* Кнопка отправки */}
        <div className="pt-4 border-t border-[#E2E8F0]/50">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 ${
              isSubmitting
                ? "bg-indigo-400 text-white cursor-not-allowed"
                : "bg-[#4F46E5] hover:bg-[#4338ca] hover:shadow-lg active:scale-[0.98] text-white"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                Публикуем...
              </>
            ) : (
              "Опубликовать товар"
            )}
          </button>
          <p className="text-center text-xs text-[#94A3B8] mt-4">
            Нажимая кнопку, вы соглашаетесь с правилами размещения товаров.
          </p>
        </div>
      </form>
    </div>
  );
}
