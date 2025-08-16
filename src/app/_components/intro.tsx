// src/app/_components/intro.tsx
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  return (
    <section className="mb-16">
      {/* ===== ヘッダー（バナー） ===== */}
      <div className="relative">
        {/* コンテンツ */}
        <div className="absolute inset-0">
          <div className="container flex h-full items-center">
            <div className="grid w-full grid-cols-[84px_1fr] items-center gap-4 md:grid-cols-[96px_1fr] md:gap-6">
              <Image
                src="/avatar-pengineer.jpeg"
                alt="ペンジニアのアバター"
                width={84}
                height={84}
                priority
                className="rounded-2xl ring-1 ring-border shadow-soft-sm bg-white/70 object-cover"
              />
              {/* タイトル & リード */}
              <div>
                <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow md:text-5xl">
                  IT業界の荒波に揉まれるうちに
                  <br className="hidden md:block" />
                  ペンギンになってしまった
                  <br className="hidden md:block" />
                  エンジニア。
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow md:text-base">
                  開発・転職・副業など、エンジニアとして得た知見と育児・格闘技・趣味など、
                  人間として得た実感を記録しています。いつかどこかの誰かが、荒い海を渡るヒントになりますように。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== カテゴリカード ===== */}
      <div className="container mt-8 grid gap-6 md:grid-cols-2">
        <CategoryCard
          title="キャリア"
          items={[
            { label: "キャリア日記", href: "https://example.com" },
            { label: "コラム集", href: "https://example.com" },
          ]}
        />
        <CategoryCard
          title="テック"
          items={[
            { label: "開発した成果物についていろいろ", href: "https://example.com" },
          ]}
        />
        <CategoryCard
          title="ウェルネス"
          items={[
            { label: "運動", href: "https://example.com" },
            { label: "食事・嗜飮", href: "https://example.com" },
          ]}
        />
        <CategoryCard
          title="ウェルビーイング"
          items={[
            { label: "医療・ファッション", href: "https://example.com" },
            { label: "嗜好品", href: "https://example.com" },
          ]}
        />
      </div>
    </section>
  );
}

function CategoryCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-soft-sm transition hover:border-primary/60">
      <h2 className="mb-2 text-xl font-extrabold text-text">{title}</h2>
      <ul className="space-y-2 text-text">
        {items.map((i) => (
          <li key={i.label} className="list-disc pl-5 marker:text-border">
            <Link
              href={i.href}
              className="text-link underline-offset-2 hover:text-accent hover:underline"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
