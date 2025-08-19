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
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu-icon lucide-menu"
            >
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          }
        />
      </div>
    </header>
  );
}
