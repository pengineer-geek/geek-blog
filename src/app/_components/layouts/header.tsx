// src/app/_components/header.tsx
import Link from "next/link";
import SlideOutMenu from "@/app/_components/navigation/slide-out-menu";

export default function Header() {
  return (
    <header className="bg-primary">
      <div className="container flex h-12 items-center justify-between">
        <Link href="/" className="text-sm font-extrabold text-white">
          ペンジニアの技育(ギーク)ブログ
        </Link>
        {/* 右側は空（今はリンク無し） */}
      </div>
      <SlideOutMenu />
    </header>
  );
}
