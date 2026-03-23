// src/components/header/UserBlock.tsx
import TopMenu from "./TopMenu";
import Profile from "./Profile";
import MobileMenu from "./MobileMenu";

const UserBlock = () => {
  return (
    // Уменьшили gap для мобилок, на ПК оставили gap-6
    <div className="flex items-center gap-2 md:gap-6">
      {/* Десктопное меню прячем на мобилках (добавили hidden md:block) */}
      <div className="hidden md:block">
        <TopMenu />
      </div>

      <Profile />

      {/* Мобильный бургер (внутри компонента прописано, что он прячется на ПК) */}
      <MobileMenu />
    </div>
  );
};

export default UserBlock;
