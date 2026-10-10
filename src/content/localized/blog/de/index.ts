import { BlogPost } from "@/content/blog/types";
import { deBatch1Articles } from "./batch-1";
import { deBatch2Articles } from "./batch-2";
import { deBatch3Articles } from "./batch-3";
import { deBatch4Articles } from "./batch-4";
import { deBatch5Articles } from "./batch-5";
import { deBatch6Articles } from "./batch-6";

export const deBlogArticles: BlogPost[] = [
  ...deBatch1Articles,
  ...deBatch2Articles,
  ...deBatch3Articles,
  ...deBatch4Articles,
  ...deBatch5Articles,
  ...deBatch6Articles,
];

export function getDeArticleBySlug(slug: string): BlogPost | undefined {
  return deBlogArticles.find((article) => article.slug === slug);
}

export function getAllDeArticles(): BlogPost[] {
  return deBlogArticles;
}

export {
  deBatch1Articles,
  deBatch2Articles,
  deBatch3Articles,
  deBatch4Articles,
  deBatch5Articles,
  deBatch6Articles,
};
