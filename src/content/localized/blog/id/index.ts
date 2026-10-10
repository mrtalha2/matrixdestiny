import { BlogPost } from "@/content/blog/types";
import { idBatch1Articles } from "./batch-1";
import { idBatch2Articles } from "./batch-2";
import { idBatch3Articles } from "./batch-3";
import { idBatch4Articles } from "./batch-4";
import { idBatch5Articles } from "./batch-5";
import { idBatch6Articles } from "./batch-6";

export const idBlogArticles: BlogPost[] = [
  ...idBatch1Articles,
  ...idBatch2Articles,
  ...idBatch3Articles,
  ...idBatch4Articles,
  ...idBatch5Articles,
  ...idBatch6Articles,
];

export function getIdArticleBySlug(slug: string): BlogPost | undefined {
  return idBlogArticles.find((article) => article.slug === slug);
}

export function getAllIdArticles(): BlogPost[] {
  return idBlogArticles;
}

export {
  idBatch1Articles,
  idBatch2Articles,
  idBatch3Articles,
  idBatch4Articles,
  idBatch5Articles,
  idBatch6Articles,
};
