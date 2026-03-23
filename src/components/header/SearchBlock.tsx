"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBlock = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Найти товар"
          className="w-full h-9 md:h-10 rounded-xl pl-3 md:pl-4 pr-10 border border-[#E2E8F0] bg-[#EEF2F9] text-sm md:text-base text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-[#E0E7FF] rounded-md transition"
          aria-label="Поиск"
        >
          <Image
            src="/icons-header/icon-search.png"
            alt=""
            width={38}
            height={38}
            className="opacity-80 hover:opacity-100 transition"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBlock;
