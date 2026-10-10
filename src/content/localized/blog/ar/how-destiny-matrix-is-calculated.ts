import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("how-destiny-matrix-is-calculated");
export default article;
