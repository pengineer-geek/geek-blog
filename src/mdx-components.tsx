import type { MDXComponents } from "mdx/types";
import TweetCard from "@/app/_components/embeds/tweet-card";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ここで MDX から使えるタグ名をマッピング
    TweetCard,
    ...components,
  };
}
