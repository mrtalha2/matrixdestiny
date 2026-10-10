import { getDeArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getDeArticleBySlug("how-to-calculate-destiny-matrix-by-hand");
export default article;
