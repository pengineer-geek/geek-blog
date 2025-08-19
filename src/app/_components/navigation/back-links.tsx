// src/app/_components/navigation/back-links.tsx
import Link from "next/link";

type CategoryKey = "career" | "tech" | "wellness" | "wellbeing";

const CATEGORY: Record<CategoryKey, { href: string; label: string }> = {
  career:    { href: "/categories/career",    label: "キャリア" },
  tech:      { href: "/categories/tech",      label: "テック" },
  wellness:  { href: "/categories/wellness",  label: "ウェルネス" },
  wellbeing: { href: "/categories/wellbeing", label: "ウェルビーイング" },
};

// カテゴリページで使っている「arrow-big-left」と同じ描画
function BackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"/>
    </svg>
  );
}

export default function BackLinks({
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

  // ボタンの共通スタイル（同じ幅に揃える）
  const btn =
    "inline-flex items-center gap-2 rounded-xl border border-gray-200 " +
    "px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 " +
    "w-64 justify-center"; // ← ここで2つとも同じ幅に

  return (
    <div className={`mt-8 flex flex-col space-y-3 ${className}`}>
      {cat && (
        <Link href={cat.href} className={btn}>
          <BackIcon />
          {cat.label} に戻る
        </Link>
      )}
      <Link href="/" className={btn}>
        <BackIcon />
        トップに戻る
      </Link>
    </div>
  );
}
