import { getIdArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getIdArticleBySlug("destiny-matrix-compatibility-centers-and-patterns");
export default article;
