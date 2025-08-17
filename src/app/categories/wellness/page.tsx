import AccordionWellness from "@/app/_components/accordion-wellness";
import { IconWellness } from "@/app/_components/icons"; // 既存のトップ見出し用（なければ省略）

export default function Page() {
  return (
    <main className="container py-10 md:py-14">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-primary">
          <IconWellness className="h-7 w-7" />
        </span>
        <h1 className="text-4xl font-extrabold text-text md:text-5xl">ウェルネス</h1>
      </div>
      <p className="mb-8 text-text/70">
        強く逞しく生きるためのウェルネス情報まとめ。
      </p>

      <AccordionWellness />
    </main>
  );
}
