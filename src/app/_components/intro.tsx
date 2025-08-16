// src/app/_components/intro.tsx
import Image from "next/image";

export default function Intro() {
  return (
    <section className="relative mb-16 overflow-hidden rounded-2xl">
      {/* 背景バナー */}
      <Image
        src="/banner-yokohama.png"
        alt="横浜とペンジニア"
        width={1920}
        height={640}
        priority
        className="h-56 w-full object-cover md:h-80"
      />
      {/* うっすら暗くして文字を読みやすく */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 左側テキスト */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 md:left-10">
        <h1 className="text-3xl font-extrabold text-white drop-shadow md:text-5xl">
          ペンジニアの技育（ギーク）ブログ
        </h1>
        <p className="mt-2 text-base text-white/90 drop-shadow md:text-xl">
          開発・転職・副業など、エンジニアとして得た知見と<br />
          育児・格闘技・趣味など、人間として得た実感を記録しています。<br />
          いつかどこかの誰かが、寒い海を渡るヒントになりますように。
        </p>
      </div>
    </section>
  );
}
