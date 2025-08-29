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
 * - 追加: 各見出しにアコーディオン（デフォルト収納）
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

  // ▼ 追加: 各グループの開閉状態（デフォルト: 閉じる）
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {};
    for (const key of Object.keys(groups)) o[key] = false;
    return o;
  });
  const toggleOpen = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

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

      {/* グループごとのチップ（アコーディオン） */}
      <div className="space-y-4">
        {Object.entries(groups).map(([heading, tags]) => (
          <section key={heading} className="rounded-xl border bg-white">
            {/* 見出し行（開閉ボタン） */}
            <button
              type="button"
              onClick={() => toggleOpen(heading)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
              aria-expanded={open[heading]}
            >
              <div className="text-base font-bold text-text">{heading}</div>
              <span className="text-primary">{open[heading] ? "▲" : "▼"}</span>
            </button>

            {/* 中身 */}
            {open[heading] && (
              <div className="px-4 pb-4">
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
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
