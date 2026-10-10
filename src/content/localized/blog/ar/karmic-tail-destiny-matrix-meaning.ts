import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("karmic-tail-destiny-matrix-meaning");
export default article;
