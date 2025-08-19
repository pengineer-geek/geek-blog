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
      className="
        group grid grid-cols-[6rem_1fr_auto] gap-5
        rounded-2xl border border-gray-200 bg-white p-6 md:p-7
        shadow-sm transition hover:border-primary hover:shadow-md
      "
    >
      {/* アイコン（固定幅ボックスで位置を統一） */}
      <div
        className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-xl bg-primary/5 text-primary"
        aria-hidden
        role="presentation"
      >
        <div className="[&_svg]:h-10 [&_svg]:w-10 md:[&_svg]:h-12 md:[&_svg]:w-12">
          {icon}
        </div>
      </div>

      {/* タイトル & 説明（縦センター・タイトルはプライマリー） */}
      <div className="min-w-0 self-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-primary">
          {title}
        </h3>
        <p className="mt-1 md:text-lg text-text/70">{desc}</p>
      </div>

      {/* 右端の矢印（装飾） */}
      <div className="ml-auto hidden md:flex self-center shrink-0 items-center justify-center rounded-full bg-primary/5 p-2 text-primary transition group-hover:bg-primary/10">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
