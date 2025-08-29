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

export default function TagPicker({
  groups,
  initial = [],
  align = "left",
  compact = false,
}: {
  groups: Groups;       // { "キャリア": [...], "テック": [...], ... }
  initial?: string[];   // 初期選択タグ
  align?: "left" | "center";
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<string[]>(initial);

  // 各グループの開閉状態（デフォルト: 閉じる）
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {};
    for (const key of Object.keys(groups)) o[key] = false;
    return o;
  });

  const toggleOpen = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const openAll = () =>
    setOpen((prev) => {
      const o: Record<string, boolean> = {};
      for (const k of Object.keys(prev)) o[k] = true;
      return o;
    });

  const closeAll = () =>
    setOpen((prev) => {
      const o: Record<string, boolean> = {};
      for (const k of Object.keys(prev)) o[k] = false;
      return o;
    });

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
      {/* 選択状態 & コントロール */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">
          選択中: {selected.length ? (
            <span className="font-medium">{selected.join(", ")}</span>
          ) : "なし"}
        </div>
        <div className={`ml-auto flex items-center gap-2 ${align === "center" ? "mx-auto" : ""}`}>
          {/* すべて展開・収納ボタン（任意） */}
          <button
            type="button"
            onClick={openAll}
            className={`hidden md:inline-flex items-center rounded-lg border px-3 ${compact ? "py-1" : "py-2"} text-sm hover:bg-gray-50`}
          >
            すべて展開
          </button>
          <button
            type="button"
            onClick={closeAll}
            className={`hidden md:inline-flex items-center rounded-lg border px-3 ${compact ? "py-1" : "py-2"} text-sm hover:bg-gray-50`}
          >
            すべて収納
          </button>

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

      {/* 各グループ（アコーディオン） */}
      <div className="space-y-4">
        {Object.entries(groups).map(([heading, tags]) => {
          const isOpen = open[heading];
          return (
            <section key={heading} className="rounded-xl border bg-white">
              {/* 見出し（開閉トグル） */}
              <button
                type="button"
                onClick={() => toggleOpen(heading)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                aria-expanded={isOpen}
              >
                <div className="text-base font-bold text-text">{heading}</div>
                {/* 統一アイコン（chevron） */}
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-primary"
                >
                  {isOpen ? (
                    <path d="M18 15l-6-6-6 6" /> // ▲
                  ) : (
                    <path d="M6 9l6 6 6-6" />   // ▼
                  )}
                </svg>
              </button>

              {/* 中身 */}
              {isOpen && (
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
          );
        })}
      </div>
    </div>
  );
}
