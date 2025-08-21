"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBlog, IconWrench, IconGadget } from "@/app/_components/icons/index";
import { imgUrl } from "@/lib/img";

type Post = {
  title: string;
  href: string;
  excerpt?: string;
  thumbnail: string;
};
type Sub = { key: string; title: string; posts: Post[] };
type Section = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  subs: Sub[];
};

const href = (...slug: string[]) => `/posts/${slug.join("/")}`;

function postItem(slugParts: string[], title: string, excerpt?: string): Post {
  const slug = slugParts.join("/");
  return {
    title,
    href: href(...slugParts),
    excerpt,
    thumbnail: imgUrl(slug, "cover.jpg"), // ← ここでR2 URLを生成
  };
}

const sections: Section[] = [
  {
    key: "blog",
    title: "個人ブログ開設・運営",
    desc: "本サイトを例に開設から運用まで",
    icon: <IconBlog className="h-6 w-6" />,
    subs: [
      {
        key: "how-to-setup",
        title: "Vercelを使って簡単サイト開設",
        posts: [
          postItem(
            ["tech", "how-to-setup", "how-to-start"],
            "Vercelを使って簡単サイト開設",
            "このサイトを立ち上げるまで"
          ),
        ],
      },
    ],
  },
  {
    key: "tech-intro",
    title: "技術紹介",
    desc: "日々の開発で使う技術のメモや紹介",
    icon: <IconWrench className="h-6 w-6" />,
    subs: [
    ],
  },
  {
    key: "tech-intro",
    title: "技術紹介",
    desc: "日々の開発で使う技術のメモや紹介",
    icon: <IconWrench className="h-6 w-6" />,
    subs: [
    ],
  },
  {
    key: "gadget",
    title: "ガジェット",
    desc: "気になるデバイスやツールの紹介",
    icon: <IconGadget className="h-6 w-6" />,
    subs: [
    ],
  },
];

export default function AccordionTech() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
    setOpenSub(null);
  };

  const toggleSub = (sectionKey: string, subKey: string) => {
    const k = `${sectionKey}:${subKey}`;
    setOpenSub((prev) => (prev === k ? null : k));
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

            {/* 中項目リスト */}
            {isOpen && (
              <div className="px-6 pb-6">
                <ul className="space-y-2">
                  {sec.subs.map((sub) => {
                    const subKey = `${sec.key}:${sub.key}`;
                    const subOpen = openSub === subKey;
                    return (
                      <li
                        key={sub.key}
                        className="rounded-xl border border-border/70 bg-white"
                      >
                        {/* 中項目ヘッダ */}
                        <button
                          onClick={() => toggleSub(sec.key, sub.key)}
                          className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-primary/5"
                          aria-expanded={subOpen}
                        >
                          <span className="font-medium text-text">
                            {sub.title}
                          </span>
                          <span className="text-primary">
                            {subOpen ? "▲" : "▼"}
                          </span>
                        </button>

                        {/* 記事一覧 */}
                        {subOpen && (
                          <div className="px-4 pb-3">
                            <ul className="space-y-2">
                              {sub.posts.map((p, i) => (
                                <li key={i}>
                                  <Link
                                    href={p.href}
                                    prefetch={false}
                                    className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-primary/5"
                                  >
                                    {/* サムネイル */}
                                    <img
                                      src={p.thumbnail}
                                      alt={p.title}
                                      className="h-12 w-16 flex-shrink-0 rounded object-cover"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                    {/* 右：タイトル＋（必要なら説明） */}
                                    <div className="min-w-0">
                                      <h4 className="font-medium text-text underline underline-offset-2 decoration-link/30 hover:decoration-link">
                                        {p.title}
                                      </h4>
                                      <p className="text-sm text-text/70">{p.excerpt}</p>
                                    </div>

                                    <svg
                                      className="ml-auto h-4 w-4 translate-x-0 text-link/70 transition group-hover:translate-x-0.5"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      aria-hidden="true"
                                    >
                                      <path d="M5 12h14" />
                                      <path d="m13 5 7 7-7 7" />
                                    </svg>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
