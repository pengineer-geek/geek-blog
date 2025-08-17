// src/app/categories/tech/page.tsx
import AccordionTech from "@/app/_components/accordion-tech";
import { IconTech } from "@/app/_components/icons"; // 既存のテック用アイコンがあれば

export default function Page() {
  return (
    <main className="container py-10 md:py-14">
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
