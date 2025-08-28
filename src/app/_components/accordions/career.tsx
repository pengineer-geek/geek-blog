// src/app/_components/accordion-career.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDiary, IconColumn } from "@/app/_components/icons/index";
import { imgUrl } from "@/lib/img";
import TagList from "@/app/_components/tags/tag-list";

type Post = {
  title: string;
  href: string;
  excerpt?: string;
  thumbnail: string;
  tags?: string[];
};
type Sub = { key: string; title: React.ReactNode; posts: Post[] };
type Section = {
  key: string;
  title: React.ReactNode;
  desc: string;
  icon: React.ReactNode;
  subs: Sub[];
};

// TODO: ここにダイアリーの記事を追加する
const href = (...slug: string[]) => `/posts/${slug.join("/")}`;

function postItem(slugParts: string[], title: string, excerpt?: string, tags?: string[]): Post {
  const slug = slugParts.join("/");
  return {
    title,
    href: href(...slugParts),
    excerpt,
    thumbnail: imgUrl(slug, "cover.jpg"), // ← ここでR2 URLを生成
    tags,
  };
}

const sections: Section[] = [
  {
    key: "diary",
    title: (
      <>
        <span className="text-primary">
          <span>ペンジニア's</span>
          <br />
          Real Diary
        </span>
      </>
    ),
    desc: "時系列に沿ったペンジニアのリアルな記録",
    icon: <IconDiary className="h-6 w-6" />,
    subs: [
      {
        key: "high-school",
        title: (
          <>
            ハイスクール編<br />
            @ 自称進学校
          </>
        ),
        posts: [
          postItem(
            ["career", "diary", "high-school", "high-school-1"],
            "高校生だったころの話",
            "親に流された進路選択",
            ["高校", "受験", "文理選択"]
          ),
          postItem(
            ["career", "diary", "high-school", "high-school-2"],
            "紙切れ一枚で大学受験を終わらせた話",
            "ガソリンは満タン! 行き先は不明!",
            ["高校", "受験", "指定校推薦"]
          ),
        ],
      },
      {
        key: "university",
        title: (
          <>
            キャンパスライフ編<br />
            @ 都内Aランク私立大学(理工学部)
          </>
        ),
        posts: [
          postItem(
            ["career", "diary", "university", "university-1"],
            "華のキャンパスライフを謳歌していた話",
            "サークルに全てを捧げた男",
            ["大学", "サークル", "受験"]
          ),
          postItem(
            ["career", "diary", "university", "university-2"],
            "サークルを辞めてさらに堕落した話",
            "短期的快楽を追求した男",
            ["大学", "サークル", "受験"]
          ),
          postItem(
            ["career", "diary", "university", "university-3"],
            "ようやく再起してきた話",
            "筋肉と電気工学",
            ["大学", "研究室", "筋トレ"]
          ),
          postItem(
            ["career", "diary", "university", "university-4"],
            "研究室選びで失敗した話",
            "地獄への門を開けていた男",
            ["大学", "研究室", "ブラック研究室"]
          ),
        ],
      },
      {
        key: "graduate-school",
        title: (
          <>
            ブラック研究室編<br />
            @ 都内私立大学院(工学)
          </>
        ),
        posts: [
          postItem(
            ["career", "diary", "graduate-school", "graduate-school-1"],
            "教授に全てを搾取された話",
            "驚きの黒さ! 救いのなさ!",
            ["大学院", "研究室", "ブラック研究室"]
          ),
          postItem(
            ["career", "diary", "graduate-school", "graduate-school-2"],
            "教授に反撃したお話",
            "逆襲の糸口！教授への下剋上！",
            ["大学院", "研究室", "ブラック研究室"]
          ),
        ],
      },
      {
        key: "job-hunting",
        title: (
          <>
            新卒就活編<br />
            @ 都内私立大学院(工学)
          </>
        ),
        posts: [
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-1"],
            "富!名声!力!を軸に就活を開始したお話",
            "人生の勝者マンを目指した男",
            ["新卒", "就活", "総合商社"]
          ),
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-2"],
            "商社インターンに参加したお話",
            "スマホに出れなかっただけなのに",
            ["就活", "インターン", "総合商社"]
          ),
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-3"],
            "本選考は地獄モードだった話",
            "最終面接官には中身がないことがバレていた",
            ["新卒", "就活", "総合商社"]
          ),
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-4"],
            "追加募集は世紀末だったお話",
            "狭き門がさらに狭まった",
            ["新卒", "就活", "追加募集"]
          ),
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-5"],
            "最後の求人票で奇跡が起きた話",
            "筋肉と精神安定剤で掴み取った内定",
            ["就活", "ベンチャー", "ゲーム業界"]
          )
        ],
      },
      {
        key: "game-planner",
        title: (
          <>
            新卒ゲームプランナー編<br />
            @ ゲーム会社(メガベンチャー)
          </>
        ),
        posts: [
          postItem(
            ["career", "diary", "game-planner", "game-planner-1"],
            "記念すべき人生初出社のお話",
            "飛び込んだゲーム業界で、待っていたのは…",
            ["新卒", "就活", "ゲーム業界"]
          ),
          postItem(
            ["career", "diary", "game-planner", "game-planner-2"],
            "やばすぎる新卒研修3選 -理不尽All Over The World-",
            "今こそ語ろう。あの地獄のような新卒研修を",
            ["新卒", "ゲーム業界", "ブラック企業"]
          ),
          postItem(
            ["career", "diary", "game-planner", "game-planner-3"],
            "育成担当者ガチャが大外れだった話",
            "パワハラ被害で人生2度目のメンタルクリニック通い",
            ["新卒", "ゲーム業界", "ブラック企業"]
          ),
          postItem(
            ["career", "diary", "game-planner", "game-planner-4"],
            "強制幹事地獄のお話",
            "新卒タスクという名の悪しき伝統と風習",
            ["新卒", "ゲーム業界", "ブラック企業"]
          ),
          postItem(
            ["career", "diary", "game-planner", "game-planner-5"],
            "初の大型施策担当のお話 -前編-",
            "エイプリルフール前に嘘をつくな!",
            ["新卒", "ゲーム業界", "ブラック企業"]
          ),
          postItem(
            ["career", "diary", "game-planner", "game-planner-6"],
            "初の大型施策担当のお話 -後編-",
            "意識高い系企業で意識他界",
            ["新卒", "ゲーム業界", "ブラック企業"]
          ),
          postItem(
            ["career", "diary", "game-planner", "game-planner-7"],
            "戦意喪失して退職を決意した話",
            "新人ゲームプランナー。人生はノープラン",
            ["新卒", "ゲーム業界", "ブラック企業"]
          ),
        ],
      },
    ],
  },
  {
    key: "column",
    title: (
      <>
        <span className="text-primary">
          コラム
        </span>
      </>
    ),
    desc: "キャリア形成や働き方などに関するあれこれ",
    icon: <IconColumn className="h-6 w-6" />,
    subs: [
    ],
  },
];

export default function AccordionCareer() {
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
                                      {p.tags && (
                                        <TagList tags={p.tags} size="sm" />
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
