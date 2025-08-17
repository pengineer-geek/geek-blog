// src/app/_components/accordion-career.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDiary, IconColumn } from "@/app/_components/icons";

type Item = { title: string; href?: string };
type Section = {
  key: string;
  title: string;
  desc: string;
  icon: "diary" | "column";
  children: { title: string; items: Item[] }[];
};

const ICONS = {
  diary: <IconDiary className="h-6 w-6" />,
  column: <IconColumn className="h-6 w-6" />,
};

export default function AccordionCareer({ sections }: { sections: Section[] }) {
  // 大項目と中項目の開閉状態
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {sections.map((s) => {
        const isOpen = openSection === s.key;
        return (
          <div
            key={s.key}
            className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
              isOpen ? "border-primary" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => {
                setOpenSection(isOpen ? null : s.key);
                setOpenSub(null); // 親を切り替えたら子は畳む
              }}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/5 p-2 text-primary">{ICONS[s.icon]}</div>
                <div>
                  <h3 className="text-2xl font-extrabold text-text">{s.title}</h3>
                  <p className="mt-1 text-text/70">{s.desc}</p>
                </div>
              </div>
              <span className="rounded-full bg-primary/5 px-3 py-1 text-primary">→</span>
            </button>

            {/* 中項目（サブセクション） */}
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-3">
                  {s.children.map((sub) => {
                    const subKey = `${s.key}:${sub.title}`;
                    const subOpen = openSub === subKey;
                    return (
                      <li key={sub.title} className="rounded-xl border border-gray-200">
                        <button
                          onClick={() => setOpenSub(subOpen ? null : subKey)}
                          className="flex w-full items-center justify-between rounded-xl bg-gray-50/60 px-4 py-3 text-left"
                          aria-expanded={subOpen}
                        >
                          <span className="font-semibold text-text">{sub.title}</span>
                          <span className="text-primary">▾</span>
                        </button>

                        {/* 記事リスト */}
                        <div
                          className={`grid transition-all duration-300 ${
                            subOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden px-4 pb-3 pt-2">
                            {sub.items.length === 0 ? (
                              <p className="text-sm text-text/60">記事がまだありません</p>
                            ) : (
                              <ul className="space-y-2">
                                {sub.items.map((it) => (
                                  <li key={it.title}>
                                    <Link
                                      href={it.href || "#"}
                                      className="group inline-flex items-center gap-2 text-link hover:text-primary"
                                    >
                                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary" />
                                      <span>{it.title}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
