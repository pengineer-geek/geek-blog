// src/app/categories/tech/page.tsx
import AccordionTech from "@/app/_components/accordions/tech";
import { IconTech } from "@/app/_components/icons/index";
import BackLink from "@/app/_components/navigation/back-link";

export default function Page() {
  return (
    <main className="container pt-6 pb-10 md:pt-8 md:pb-14">
      {/* トップへ戻る */}
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-primary">
          <IconTech className="h-7 w-7" />
        </span>
        <h1 className="text-4xl font-extrabold text-text md:text-5xl">テック</h1>
      </div>
      <p className="mb-8 text-text/70">
        個人ブログ運営や技術の紹介など、開発の実践知まとめ。
      </p>

      <AccordionTech />
    </main>
  );
}
