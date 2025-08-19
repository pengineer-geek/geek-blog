// src/app/_components/back-links.tsx
import Link from "next/link";

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
    <div className={`mt-10 flex flex-col space-y-3 ${className}`}>
      {cat && (
        <Link
          href={cat.href}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
        >
          ← {cat.label}に戻る
        </Link>
      )}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
      >
        ←← トップに戻る
      </Link>
    </div>
  );
}

export default BackLinks;
