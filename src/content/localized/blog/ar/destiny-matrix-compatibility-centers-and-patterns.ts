import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("destiny-matrix-compatibility-centers-and-patterns");
export default article;
