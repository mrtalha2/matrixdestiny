import { getPtBrArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getPtBrArticleBySlug("matrix-of-destiny-vs-destiny-matrix-vs-matrix-of-fate");
export default article;
