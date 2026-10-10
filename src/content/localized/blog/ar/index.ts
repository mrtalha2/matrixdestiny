import { BlogPost } from "@/content/blog/types";
import { arBatch1Articles } from "./batch-1";
import { arBatch2Articles } from "./batch-2";
import { arBatch3Articles } from "./batch-3";
import { arBatch4Articles } from "./batch-4";
import { arBatch5Articles } from "./batch-5";
import { arBatch6Articles } from "./batch-6";

export const arBlogArticles: BlogPost[] = [
  ...arBatch1Articles,
  ...arBatch2Articles,
  ...arBatch3Articles,
  ...arBatch4Articles,
  ...arBatch5Articles,
  ...arBatch6Articles,
];

export function getArArticleBySlug(slug: string): BlogPost | undefined {
  return arBlogArticles.find((article) => article.slug === slug);
}

export function getAllArArticles(): BlogPost[] {
  return arBlogArticles;
}

export {
  arBatch1Articles,
  arBatch2Articles,
  arBatch3Articles,
  arBatch4Articles,
  arBatch5Articles,
  arBatch6Articles,
};
