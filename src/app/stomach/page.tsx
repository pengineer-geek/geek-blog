// src/app/stomach/page.tsx
import { IconPenguin } from "@/app/_components/icons/index";
import BackLink from "@/app/_components/navigation/back-link";

export default function StomachPage() {
  return (
    <div className="container py-10 md:py-14">
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>

      <div className="mb-6 flex items-center gap-3 text-primary">
        <IconPenguin className="h-7 w-7" />
        <h1 className="text-3xl font-extrabold text-text md:text-4xl">ペンジニアの腹の中</h1>
      </div>
      <p className="text-base text-muted-foreground">
        時事ネタや雑感をまとめていきます。
      </p>

      {/* 後で記事一覧とかカードをここに並べる */}
    </div>
  )
}
