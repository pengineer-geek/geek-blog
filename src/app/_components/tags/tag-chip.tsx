import Link from "next/link";

export default function TagChip({
  tag,
  href = `/search?tag=${encodeURIComponent(tag)}`,
  size = "md",
}: {
  tag: string;
  href?: string;
  size?: "sm" | "md";
}) {
  const cls =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : "text-sm px-3 py-1";
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full border border-primary/30 bg-primary/5 text-primary ${cls}`}
    >
      #{tag}
    </Link>
  );
}
