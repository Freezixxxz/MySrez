// components/Categories.tsx
import Link from "next/link";

const categoriesData = [
  {
    id: "games",
    title: "Игры",
    icon: "🎮",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    id: "accounts",
    title: "Аккаунты",
    icon: "👤",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    id: "currency",
    title: "Игровая валюта",
    icon: "💎",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    id: "items",
    title: "Предметы",
    icon: "⚔️",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    id: "services",
    title: "Услуги и Буст",
    icon: "🚀",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
];

const Categories = () => {
  return (
    <section>
      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categoriesData.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalog?category=${cat.id}`}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border ${cat.color} whitespace-nowrap hover:scale-105 hover:shadow-md transition-all duration-300`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className="font-medium">{cat.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
