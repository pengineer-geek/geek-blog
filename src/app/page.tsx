// src/app/page.tsx
import Link from "next/link";
import CategoryCard from "./_components/category-cards";
import { IconCareer, IconTech, IconWellness, IconWellbeing } from "./_components/icons";

export default function Page() {
  return (
    <main>
      {/* About this site */}
      <section className="container py-10 md:py-14">
        <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
          About this site
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-text/80">
          開発・転職・副業など、エンジニアとして得た知見と<br />
          育児・格闘技・趣味など、 人間として得た実感を記録しています。<br />
          ──いつかどこかの誰かが、荒い海を渡るヒントになりますように。
        </p>
      </section>

      {/* About me */}
      <section className="container py-6">
        <div className="grid grid-cols-[84px_1fr] items-center gap-4 md:grid-cols-[96px_1fr] md:gap-6">
          <img
            src="/avatar-pengineer.jpeg"
            alt="ペンジニアのアイコン"
            width={96}
            height={96}
            className="rounded-2xl ring-1 ring-border shadow-soft-sm object-cover bg-white"
          />
          <div>
            <h3 className="text-xl font-extrabold text-primary">About me</h3>
            <p className="mt-2 max-w-3xl text-text/80 leading-relaxed">
              IT業界の荒波に揉まれるうちに、いつのまにかペンギンになってしまったエンジニア。
              <br />── ペンジニア
            </p>
          </div>
        </div>
      </section>

      {/* Contents */}
      <section className="container py-10 md:py-14">
        <h3 className="text-xl font-extrabold text-primary">Contents</h3>
        {/* PC 2x2 / SP 縦 */}
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <CategoryCard
            href="/categories/career"
            title="キャリア"
            desc="気の利いた説明。実体験とか仕事・キャリア形成などのあれこれ"
            icon={<IconCareer />}
          />
          <CategoryCard
            href="/categories/tech"
            title="テック"
            desc="開発メモ、Next.js、ツールや検証結果、作ったものの話など"
            icon={<IconTech />}
          />
          <CategoryCard
            href="/categories/wellness"
            title="ウェルネス"
            desc="運動・食事・睡眠。コンディションを上げる日々の実験記録"
            icon={<IconWellness />}
          />
          <CategoryCard
            href="/categories/wellbeing"
            title="ウェルビーイング"
            desc="医療や身の回り、ファッションや嗜好品など心地よさの話"
            icon={<IconWellbeing />}
          />
        </div>
      </section>
    </main>
  );
}

function CategoryCard({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex h-28 items-center justify-center rounded-xl border border-border bg-background shadow-soft-sm transition hover:border-primary hover:shadow-md"
    >
      <span className="text-lg font-bold text-text">{title}</span>
    </Link>
  );
}
