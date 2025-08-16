import Link from "next/link";
import type { ReactNode } from "react";

// グリッド風の淡い背景（任意）
const gridBg =
  "bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:20px_20px]";

export default function CategoryCard({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-5 rounded-2xl border border-border bg-background p-6 shadow-soft-sm transition
                  hover:border-primary/70 hover:shadow-md md:p-7`}
    >
      {/* アイコン */}
      <div
        className={`flex size-24 items-center justify-center rounded-xl ring-1 ring-border
                    text-primary ${gridBg} md:size-28`}
        aria-hidden
      >
        {/* アイコンは currentColor で着色 */}
        <div className="text-primary/90 [&_svg]:h-14 [&_svg]:w-14 md:[&_svg]:h-16 md:[&_svg]:w-16">
          {icon}
        </div>
      </div>

      {/* タイトル & 説明 */}
      <div className="min-w-0">
        <h3 className="text-2xl font-extrabold text-text md:text-3xl">{title}</h3>
        <p className="mt-1 text-text/60 md:text-lg">{desc}</p>
      </div>

      {/* 右端の矢印（PCのみ） */}
      <div className="ml-auto hidden shrink-0 items-center justify-center rounded-full border border-border p-2 text-primary/70 transition group-hover:text-primary md:flex">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14" /><path d="m13 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
