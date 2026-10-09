import { BlogPost } from "../types";
import { batch1Articles } from "./batch-1";
import { batch2Articles } from "./batch-2";
import { batch3Articles } from "./batch-3";
import { batch4Articles } from "./batch-4";
import { batch5Articles } from "./batch-5";
import { batch6Articles } from "./batch-6";

export const allNewArticles: BlogPost[] = [
  ...batch1Articles,
  ...batch2Articles,
  ...batch3Articles,
  ...batch4Articles,
  ...batch5Articles,
  ...batch6Articles,
];

export {
  batch1Articles,
  batch2Articles,
  batch3Articles,
  batch4Articles,
  batch5Articles,
  batch6Articles,
};
