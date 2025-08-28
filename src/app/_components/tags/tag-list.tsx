import TagChip from "./tag-chip";

export default function TagList({
  tags,
  className = "",
  size = "sm",
}: {
  tags?: string[];
  className?: string;
  size?: "sm" | "md";
}) {
  if (!tags?.length) return null;
  return (
    <ul className={`mt-2 flex flex-wrap gap-2 ${className}`}>
      {tags.map((t) => (
        <li key={t}>
          <TagChip tag={t} size={size} />
        </li>
      ))}
    </ul>
  );
}
