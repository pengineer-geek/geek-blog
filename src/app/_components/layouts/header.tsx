// src/app/_components/header.tsx
import Link from "next/link";
import SlideOutMenu from "@/app/_components/navigation/slide-out-menu";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-primary shadow-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-sm font-extrabold text-white">
          ペンジニアの技育(ギーク)ブログ
        </Link>

        {/* ここに“埋め込み”トリガーが出ます */}
        <SlideOutMenu
          buttonClassName="inline-flex h-10 w-10 items-center justify-center 
          rounded-md border border-white text-white
          hover:bg-white/10 focus:outline-none 
          focus:ring-2 focus:ring-white/50"
        />
      </div>
    </header>
  );
}
