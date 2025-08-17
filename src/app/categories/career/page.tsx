// src/app/categories/career/page.tsx
import AccordionCareer from "@/app/_components/accordion-career";
import { IconCareer } from "@/app/_components/icons";

export default function CareerPage() {
  return (
    <main className="container py-10 md:py-14">
      {/* 見出しなど */}
      <div className="mb-6 flex items-center gap-3 text-primary">
        <IconCareer className="h-7 w-7" />
        <h1 className="text-3xl font-extrabold text-text md:text-4xl">キャリア</h1>
      </div>
      <p className="mb-6 text-text/80">
        実体験ベースのダイアリーや、仕事・キャリア形成に関するコラムなど。
      </p>

      {/* ここは props なしで呼ぶ */}
      <AccordionCareer />
    </main>
  );
}
