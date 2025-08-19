// src/app/_components/back-links.tsx
import Link from "next/link";
import { IconBack } from "@/app/_components/icons";

type CategoryKey = "career" | "tech" | "wellness" | "wellbeing";

const CATEGORY: Record<CategoryKey, { href: string; label: string }> = {
  career:    { href: "/categories/career",    label: "キャリア" },
  tech:      { href: "/categories/tech",      label: "テック" },
  wellness:  { href: "/categories/wellness",  label: "ウェルネス" },
  wellbeing: { href: "/categories/wellbeing", label: "ウェルビーイング" },
};

export function BackLinks({
  category,
  className = "",
}: {
  /** 記事が属するカテゴリ。未指定や不明ならトップのみ表示 */
  category?: CategoryKey | string;
  className?: string;
}) {
  const cat =
    category && CATEGORY[category as CategoryKey]
      ? CATEGORY[category as CategoryKey]
      : null;

  return (
    // 余白はやや詰め気味に（必要なら className で上書き可）
    <div className={`mt-8 flex flex-col items-start gap-2 ${className}`}>
      {cat && (
        <Link
          href={cat.href}
          className="inline-flex items-center gap-2 rounded-xl border border-border/80
                     bg-white px-3.5 py-2 text-sm text-text hover:bg-primary/5"
        >
          <IconBack className="h-4 w-4 text-primary" />
          <span>{cat.label} に戻る</span>
        </Link>
      )}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl border border-border/80
                   bg-white px-3.5 py-2 text-sm text-text hover:bg-primary/5"
      >
        <IconBack className="h-4 w-4 text-primary" />
        <span>トップに戻る</span>
      </Link>
    </div>
  );
}

export default BackLinks;
