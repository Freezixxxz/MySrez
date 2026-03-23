import Link from "next/link";
import Image from "next/image";

const LogoBlock = () => {
  return (
    <Link href="/" aria-label="На главную">
      <div className="relative w-12 h-10 md:w-28 md:h-10">
        <Image
          src="/icons-header/icon-logo.svg"
          alt="GameMarket"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
};

export default LogoBlock;
