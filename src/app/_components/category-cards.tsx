// src/app/_components/category-cards.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export default function CategoryCard({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: ReactNode;
  icon: ReactNode; // currentColor で塗るSVGを想定
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm transition
                 hover:shadow-md md:p-7"
    >
      {/* アイコン（淡いプレートのみ・枠線/グリッドなし） */}
      <div
        className="flex size-20 items-center justify-center rounded-xl bg-primary/5 text-primary md:size-24"
        aria-hidden
      >
        <div className="[&_svg]:h-10 [&_svg]:w-10 md:[&_svg]:h-12 md:[&_svg]:w-12">
          {icon}
        </div>
      </div>

      {/* タイトル & 説明 */}
      <div className="min-w-0">
        <h3 className="text-2xl font-extrabold text-text md:text-3xl">{title}</h3>
        <p className="mt-1 text-text/70 md:text-lg">{desc}</p>
      </div>

      {/* 右端の矢印（装飾。なくてもOK） */}
      <div className="ml-auto hidden shrink-0 items-center justify-center rounded-full bg-primary/5 p-2 text-primary transition group-hover:bg-primary/10 md:flex">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 12h14" /><path d="m13 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
