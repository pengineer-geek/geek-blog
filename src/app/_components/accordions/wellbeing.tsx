"use client";

import { useState } from "react";
import Link from "next/link";

// 追加アイコン
import {
  IconBaby,
  IconShirt,
  IconHeartHandshake,
} from "@/app/_components/icons/index";

type Post = { title: string; href: string };
type Section = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  posts: Post[];
};

//const href = (...slug: string[]) => `/posts/${slug.join("/")}`;

const sections: Section[] = [
  {
    key: "hobby",
    title: "趣味",
    desc: "楽しみを深める活動",
    icon: <IconShirt className="h-6 w-6" />,
    posts: [
    ],
  },
  {
    key: "childcare",
    title: "育児",
    desc: "子育てと日々の学び",
    icon: <IconBaby className="h-6 w-6" />,
    posts: [
    ],
  },
  {
    key: "others",
    title: "その他",
    desc: "心地よさを整えるあれこれ",
    icon: <IconHeartHandshake className="h-6 w-6" />,
    posts: [
    ],
  },
];

export default function AccordionWellbeing() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <div className="space-y-4">
      {sections.map((sec) => {
        const isOpen = openSection === sec.key;
        return (
          <div
            key={sec.key}
            className="rounded-2xl border border-border bg-white shadow-sm"
          >
            {/* 大項目ヘッダ */}
            <button
              onClick={() => toggleSection(sec.key)}
              className="flex w-full items-center justify-between p-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div className="text-primary">{sec.icon}</div>
                <div>
                  <h3 className="text-xl font-extrabold text-text">
                    {sec.title}
                  </h3>
                  <p className="text-text/70">{sec.desc}</p>
                </div>
              </div>
              <span className="ml-4 text-primary">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* 記事一覧 */}
            {isOpen && (
              <div className="px-6 pb-6">
                <ul className="space-y-2">
                  {sec.posts.map((p, i) => (
                    <li key={i}>
                      <Link
                        href={p.href}
                        className="
                          group flex items-center justify-between rounded-lg
                          border border-transparent bg-primary/5/50
                          px-3 py-2 text-link
                          transition
                          hover:bg-primary/10 hover:border-primary/30
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                        "
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/70 group-hover:bg-primary" />
                          <span className="underline underline-offset-4 decoration-border/60 group-hover:decoration-primary group-hover:text-primary">
                            {p.title}
                          </span>
                        </span>
                        <svg
                          width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="1.8"
                          className="opacity-60 group-hover:opacity-100"
                        >
                          <path d="M5 12h14" /><path d="m13 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
