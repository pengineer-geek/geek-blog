import Link from "next/link";

const sectionDefs = [
  { key: "diary",     title: "ダイアリー",    desc: "現場日記・実務の学び" },
  { key: "column",    title: "コラム",        desc: "考察・知見・ノウハウ" },
  { key: "job-change",title: "転職・副業",    desc: "キャリア形成の記録" },
  { key: "workstyle", title: "働き方・スキル",desc: "働き方・スキル開発" },
];

export default function CareerCategoryPage() {
  return (
    <main className="container py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-primary md:text-4xl">キャリア</h1>
      <p className="mt-2 text-text/70">
        実体験ベースのダイアリーや、仕事・キャリア形成に関するコラムなど。
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {sectionDefs.map(s => (
          <Link
            key={s.key}
            href={`/categories/career/${s.key}`}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-text">{s.title}</h2>
                <p className="mt-1 text-text/70">{s.desc}</p>
              </div>
              <div className="rounded-full bg-primary/5 p-2 text-primary">→</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
