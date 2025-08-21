"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDumbbell, IconUtensils, IconBed } from "@/app/_components/icons/index";
import { imgUrl } from "@/lib/img";

type Post = { title: string; href: string; excerpt?: string; thumbnail: string };
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
    key: "training",
    title: "鍛錬",
    desc: "体をつくる・動かす・強くする",
    icon: <IconDumbbell className="h-6 w-6" />,
    subs: [
      {
        key: "weight",
        title: "ウェイトトレーニング",
        posts: [
        ],
      },
      {
        key: "bjj",
        title: "ブラジリアン柔術",
        posts: [
        ],
      },
    ],
  },
  {
    key: "nutrition",
    title: "栄養摂取",
    desc: "食事でコンディションを底上げ",
    icon: <IconUtensils className="h-6 w-6" />,
    subs: [
      {
        key: "recipe",
        title: "レシピ",
        posts: [
        ],
      },
      {
        key: "supplement",
        title: "サプリメント",
        posts: [
        ],
      },
    ],
  },
  {
    key: "recovery",
    title: "休養",
    desc: "回復をデザインしてパフォーマンスUP",
    icon: <IconBed className="h-6 w-6" />,
    subs: [
      {
        key: "sleep",
        title: "睡眠",
        posts: [
        ],
      },
      {
        key: "relax",
        title: "リラックス",
        posts: [
        ],
      },
    ],
  },
];

export default function AccordionWellness() {
  // どの大項目が開いているか
  const [openSection, setOpenSection] = useState<string | null>(null);
  // どの中項目が開いているか（フォーマット: `${sectionKey}:${subKey}`）
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
    // 大項目を切り替えたら中項目は一旦閉じる
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
                                    className="
                                      flex gap-3 items-start
                                      rounded-lg border border-gray-200 bg-white
                                      px-3 py-2
                                      hover:bg-primary/5 hover:border-primary/50
                                      transition
                                    "
                                  >
                                    <img
                                      src={p.thumbnail}
                                      alt={p.title}
                                      className="h-12 w-16 flex-shrink-0 rounded object-cover"
                                    />
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-link group-hover:text-primary line-clamp-1">
                                        {p.title}
                                      </h4>
                                      {p.excerpt && (
                                        <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">{p.excerpt}</p>
                                      )}
                                    </div>
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
