import UserBlock from "./UserBlock";
import LogoBlock from "./LogoBlock";
import SearchBlock from "./SearchBlock";

const Header = () => {
  return (
    // Уменьшили px и py, а также gap для мобилок (добавили px-2 md:px-8, gap-2 md:gap-4)
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 bg-white/80 backdrop-blur-md rounded-2xl border border-[#E2E8F0] shadow-[var(--shadow-default)] flex items-center justify-between gap-2 md:gap-4 py-2 md:py-3">
      {/* Левая часть */}
      <div className="shrink-0">
        <LogoBlock />
      </div>

      {/* Поиск — теперь ему хватит места развернуться! */}
      <div className="flex-1 max-w-2xl mx-auto">
        <SearchBlock />
      </div>

      {/* Правая часть */}
      <div className="shrink-0">
        <UserBlock />
      </div>
    </header>
  );
};

export default Header;
