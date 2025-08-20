// src/app/_components/img/article-image.tsx
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
};

export default function ArticleImage({
  src, alt, sizes = "100vw", priority = false, className, width, height
}: Props) {
  const layoutIsFixed = !!(width && height);
  return (
    <div className={!layoutIsFixed ? "relative w-full aspect-[16/9]" : ""}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        {...(layoutIsFixed ? { width, height } : { fill: true })}
        placeholder="empty"
        className={className}
      />
    </div>
  );
}
