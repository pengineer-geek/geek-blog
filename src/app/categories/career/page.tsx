// src/app/categories/career/page.tsx
import AccordionCareer from "@/app/_components/accordion-career";
import { IconCareer } from "@/app/_components/icons";

const sections = [
  {
    key: "real-diary",
    title: "ペンジニア Real Diary",
    desc: "時系列に沿ったペンジニアのリアルな記録",
    icon: "diary" as const,
    children: [
      {
        title: "ガソリン満タン! 行き先は不明! ハイスクール編 @ 自称進学校",
        items: [
          { title: "（ダミー）高1：最初の壁", href: "#" },
          { title: "（ダミー）高2：進路の迷子", href: "#" },
        ],
      },
      {
        title:
          "モラトリアムど真ん中! 華のキャンパスライフ編 @ 都内Aランク私立大学 (理工学士)",
        items: [{ title: "（ダミー）研究室の選び方", href: "#" }],
      },
      {
        title:
          "驚きの黒さ! 救いのなさ!! ブラックラボ編 @ 都内Aランク私立大学院 (工学修士)",
        items: [],
      },
      {
        title:
          "富!名声!チカラ!を求めて!! 新卒就活生編 @ 都内Aランク私立大学院 (工学修士)",
        items: [],
      },
      { title: "フレッシュマン! 新卒社会人編 @ メガベンチャー (ゲーム会社)", items: [] },
      { title: "富!名声!チカラを失った!! ノージョブ編 @ 都内某所", items: [] },
      {
        title: "Hello World!! ジュニアエンジニア編 @ 小規模受託・SES企業",
        items: [],
      },
      {
        title: "Thinking And Building! ミドルエンジニア編 @ 小規模自社開発企業",
        items: [],
      },
      {
        title: "I'm Back!! シニアエンジニア編 @ メガベンチャー (SaaS企業)",
        items: [],
      },
    ],
  },
  {
    key: "column",
    title: "コラム",
    desc: "キャリア形成や働き方などに関するあれこれ",
    icon: "column" as const,
    children: [
      { title: "学生向け", items: [] },
      { title: "働いている人向け", items: [] },
      { title: "新卒就活生向け", items: [] },
      { title: "未経験エンジニア求職者向け", items: [] },
      { title: "中途キャリア求職者向け", items: [] },
    ],
  },
];

export default function CareerCategoryPage() {
  return (
    <main className="container py-10 md:py-14">
      {/* タイトル（アイコン付き） */}
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-primary/5 p-3 text-primary">
          <IconCareer className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-primary md:text-4xl">キャリア</h1>
          <p className="mt-1 text-text/70">
            実体験ベースのダイアリーや、仕事・キャリア形成に関するコラムなど。
          </p>
        </div>
      </div>

      {/* ネストアコーディオン */}
      <AccordionCareer sections={sections} />
    </main>
  );
}
