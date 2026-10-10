import { getIdArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getIdArticleBySlug("destiny-matrix-love-line-how-to-read");
export default article;
