// src/app/_components/tags/tag-picker.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Groups = Record<string, string[]>;

function Chip({
  label,
  selected,
  onToggle,
}: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition
        ${selected ? "border-primary/50 bg-primary/10 text-primary" : "border-gray-300 bg-white hover:bg-gray-50"}`}
    >
      <span className="opacity-80">#</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

/**
 * タグをチップで選んで /search?tag=... に飛ばすピッカー。
 * - groups: { 見出し: [タグ, ...] } の形
 * - initial: 初期選択済みのタグ（任意）
 * - align: left | center でボタンの整列方法を選択（既定 left）
 * - compact: true だとボタンを小さめに
 */
export default function TagPicker({
  groups,
  initial = [],
  align = "left",
  compact = false,
}: {
  groups: Groups;
  initial?: string[];
  align?: "left" | "center";
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<string[]>(initial);

  const toggle = (t: string) =>
    setSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const query = useMemo(() => {
    if (selected.length === 0) return "/search";
    const q = selected.map((t) => encodeURIComponent(t)).join(",");
    return `/search?tag=${q}`;
  }, [selected]);

  const clear = () => setSelected([]);

  return (
    <div className="space-y-5">
      {/* 選択状態 */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">
          選択中: {selected.length ? (
            <span className="font-medium">{selected.join(", ")}</span>
          ) : "なし"}
        </div>
        <div className={`ml-auto flex items-center gap-2 ${align === "center" ? "mx-auto" : ""}`}>
          <Link
            href={query}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 ${compact ? "py-1" : "py-2"} text-sm hover:bg-gray-50`}
          >
            検索する
          </Link>
          {selected.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 ${compact ? "py-1" : "py-2"} text-sm hover:bg-gray-50`}
            >
              クリア
            </button>
          )}
        </div>
      </div>

      {/* グループごとのチップ */}
      <div className="space-y-6">
        {Object.entries(groups).map(([heading, tags]) => (
          <div key={heading} className="rounded-xl border bg-white p-4">
            <div className="mb-3 text-base font-bold text-text">{heading}</div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  selected={selected.includes(t)}
                  onToggle={() => toggle(t)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
