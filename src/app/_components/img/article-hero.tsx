// src/app/_components/img/article-hero.tsx
import ArticleImage from "@/app/_components/img/article-image";
import { imgUrl } from "@/lib/img";

type Props = {
  slug: string;
  hero: { file: string; alt: string };
};

export default function ArticleHero({ slug, hero }: Props) {
  return (
    <ArticleImage
      src={imgUrl(slug, hero.file)}
      alt={hero.alt}
      priority
    />
  );
}
