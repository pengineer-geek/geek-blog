// src/app/_components/mdx/config.tsx
import type { ComponentProps } from "react";
import { MDXRemote as MDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import TweetCard from "@/app/_components/embeds/tweet-card";
import ChainDiagram from "@/app/_components/diagrams/chain-diagram";

type MdxRemoteOptions = ComponentProps<typeof MDX>["options"];

// 記事と同じ MDX コンポーネント
export const mdxComponents = {
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: any) => <img {...props} className="my-4 rounded-lg" />,
  h2:  (props: any) => <h2 {...props} className="mt-10 mb-3 text-2xl font-bold" />,
  h3:  (props: any) => <h3 {...props} className="mt-8  mb-2 text-xl  font-bold" />,
  p:   (props: any) => <p  {...props} className="my-4 leading-relaxed" />,
  ul:  (props: any) => <ul {...props} className="my-4 list-disc    pl-6 space-y-1" />,
  ol:  (props: any) => <ol {...props} className="my-4 list-decimal  pl-6 space-y-1" />,
  code:(props: any) => (
    <code {...props} className={`rounded bg-gray-100 px-1 py-0.5 text-sm ${props.className ?? ""}`} />
  ),
  pre: (props: any) => (
    <pre  {...props} className={`my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100 ${props.className ?? ""}`} />
  ),
  TweetCard,
  ChainDiagram,
};

export const mdxOptions: MdxRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
};
