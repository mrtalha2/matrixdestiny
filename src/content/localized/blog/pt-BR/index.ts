import { BlogPost } from "@/content/blog/types";
import { ptBrBatch1Articles } from "./batch-1";
import { ptBrBatch2Articles } from "./batch-2";
import { ptBrBatch3Articles } from "./batch-3";
import { ptBrBatch4Articles } from "./batch-4";
import { ptBrBatch5Articles } from "./batch-5";
import { ptBrBatch6Articles } from "./batch-6";

export const ptBrBlogArticles: BlogPost[] = [
  ...ptBrBatch1Articles,
  ...ptBrBatch2Articles,
  ...ptBrBatch3Articles,
  ...ptBrBatch4Articles,
  ...ptBrBatch5Articles,
  ...ptBrBatch6Articles,
];

export function getPtBrArticleBySlug(slug: string): BlogPost | undefined {
  return ptBrBlogArticles.find((article) => article.slug === slug);
}

export function getAllPtBrArticles(): BlogPost[] {
  return ptBrBlogArticles;
}

export {
  ptBrBatch1Articles,
  ptBrBatch2Articles,
  ptBrBatch3Articles,
  ptBrBatch4Articles,
  ptBrBatch5Articles,
  ptBrBatch6Articles,
};
