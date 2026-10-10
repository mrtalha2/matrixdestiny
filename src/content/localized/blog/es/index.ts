import { BlogPost } from "@/content/blog/types";
import { esBatch1Articles } from "./batch-1";
import { esBatch2Articles } from "./batch-2";
import { esBatch3Articles } from "./batch-3";
import { esBatch4Articles } from "./batch-4";
import { esBatch5Articles } from "./batch-5";
import { esBatch6Articles } from "./batch-6";

export const esBlogArticles: BlogPost[] = [
  ...esBatch1Articles,
  ...esBatch2Articles,
  ...esBatch3Articles,
  ...esBatch4Articles,
  ...esBatch5Articles,
  ...esBatch6Articles,
];

export function getEsArticleBySlug(slug: string): BlogPost | undefined {
  return esBlogArticles.find((article) => article.slug === slug);
}

export function getAllEsArticles(): BlogPost[] {
  return esBlogArticles;
}

export {
  esBatch1Articles,
  esBatch2Articles,
  esBatch3Articles,
  esBatch4Articles,
  esBatch5Articles,
  esBatch6Articles,
};
