import Link from "next/link";

type BackLinkProps = {
  href: string;                 // 遷移先
  label?: string;               // ボタン表示テキスト（未指定なら「戻る」）
  direction?: "left" | "up";    // 矢印の向き（デフォルト: left）
  className?: string;           // 追加スタイル
};

export default function BackLink({
  href,
  label = "戻る",
  direction = "left",
  className = "",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-2 rounded-lg border border-primary/20",
        "bg-primary/5 px-3 py-2 text-sm font-medium text-primary",
        "transition hover:bg-primary/10 focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-primary/30",
        className,
      ].join(" ")}
      aria-label={label}
    >
      <IconArrow dir={direction} className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}

function IconArrow({
  dir = "left",
  className,
}: {
  dir?: "left" | "up";
  className?: string;
}) {
  // どちらも currentColor で描画（色は親の text-* に追随）
  if (dir === "up") {
    // Arrow Big Up
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 11a1 1 0 0 1 1-1h2.939a1 1 0 0 0 .75-1.811L6.853 1.354a1.207 1.207 0 0 0-1.707 0L-1.69 7.69A1 1 0 0 0 -.94 9H4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z" />
      </svg>
    );
  }

  // Arrow Big Left（ご指定のパス）
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" />
    </svg>
  );
}
