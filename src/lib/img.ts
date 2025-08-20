// src/lib/img.ts
export function imgUrl(slug: string, file: string) {
  const base = process.env.NEXT_PUBLIC_IMG_BASE
    ?? "https://pub-c07fd8d39c7745bea0ba922479c92da8.r2.dev";
  return `${base}/${slug.replace(/^\/|\/$/g, "")}/${file.replace(/^\/+/,"")}`;
}
