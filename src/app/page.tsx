import Image from "next/image";

export default function Page() {
  return (
    <main>
      {/* トップバナー */}
      <div className="relative w-full h-64 md:h-96">
        {/* 背景画像 */}
        <Image
          src="/banner-yokohama.png" // 横浜＋ペンジニアの合成イラスト
          alt="横浜とペンジニア"
          fill
          style={{ objectFit: "cover" }}
        />

        {/* 左側：タイトルとキャッチコピー */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white drop-shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold">
            ペンジニアの技育（ギーク）ブログ
          </h1>
          <p className="mt-2 text-lg md:text-xl">
            開発・転職・副業など、エンジニアとして得た知見と<br />
            育児・格闘技・趣味など、人間として得た実感を記録しています。<br />
            いつかどこかの誰かが、寒い海を渡るヒントになりますように。
          </p>
        </div>
      </div>

      {/* 記事一覧 */}
      <section className="p-8">
        {/* 記事リストのコンポーネントはそのまま */}
      </section>
    </main>
  );
}
