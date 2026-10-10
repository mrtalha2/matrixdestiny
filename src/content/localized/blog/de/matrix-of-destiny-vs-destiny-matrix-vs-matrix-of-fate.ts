import { getDeArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getDeArticleBySlug("matrix-of-destiny-vs-destiny-matrix-vs-matrix-of-fate");
export default article;
