// components/header/RoleToggle.tsx
"use client";
import { useState } from "react";

type Role = "buyer" | "seller";

const RoleToggle = () => {
  const [role, setRole] = useState<Role>("buyer");

  return (
    <div className="flex items-center bg-white/70 backdrop-blur-md border border-[#E2E8F0] rounded-3xl p-1 shadow-sm">
      <button
        onClick={() => setRole("buyer")}
        className={`px-5 py-2 rounded-3xl text-sm font-medium transition-all duration-300 ${
          role === "buyer"
            ? "bg-[#4F46E5] text-white shadow-sm"
            : "text-[#475569] hover:text-[#0F172A]"
        }`}
      >
        Покупатель
      </button>
      <button
        onClick={() => setRole("seller")}
        className={`px-5 py-2 rounded-3xl text-sm font-medium transition-all duration-300 ${
          role === "seller"
            ? "bg-[#4F46E5] text-white shadow-sm"
            : "text-[#475569] hover:text-[#0F172A]"
        }`}
      >
        Продавец
      </button>
    </div>
  );
};

export default RoleToggle;
